import type { Context } from "@opentelemetry/api";
import { diag, TraceFlags } from "@opentelemetry/api";
import type {
  ReadableSpan,
  Span,
  SpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { getVercelRequestContext } from "../request-context";

export class CompositeSpanProcessor implements SpanProcessor {
  private readonly rootSpanIds = new Map<
    string,
    { rootSpanId: string; open: Span[] }
  >();
  private readonly waitSpanEnd = new Map<string, () => void>();

  constructor(private processors: SpanProcessor[]) {}

  forceFlush(): Promise<void> {
    return Promise.all(
      this.processors.map((p) =>
        p.forceFlush().catch((e) => {
          diag.error("Force flush failed:", e);
        })
      )
    ).then(() => undefined);
  }

  shutdown(): Promise<void> {
    return Promise.all(
      this.processors.map((p) => p.shutdown().catch(() => undefined))
    ).then(() => undefined);
  }

  onStart(span: Span, parentContext: Context): void {
    const { traceId, spanId, traceFlags } = span.spanContext();
    const isRoot = !span.parentSpanId || !this.rootSpanIds.has(traceId);

    if (isRoot) {
      this.rootSpanIds.set(traceId, { rootSpanId: spanId, open: [] });
    } else {
      this.rootSpanIds.get(traceId)?.open.push(span);
    }

    if (isRoot && (traceFlags & TraceFlags.SAMPLED) !== 0) {
      const flushPromise = this.forceFlush();
      flushPromise.catch((error) =>
        diag.error("Error flushing span on start:", error)
      );
    }

    // The following code block is adapted from @vercel/otel package to prevent trace data loss on Vercel deployed applications
    const vrc = getVercelRequestContext();
    if (vrc) {
      vrc.waitUntil(async () => {
        if (this.rootSpanIds.has(traceId)) {
          const promise = new Promise<void>((resolve) => {
            this.waitSpanEnd.set(traceId, resolve);
          });
          let timer: NodeJS.Timeout | undefined;
          await Promise.race([
            promise,
            new Promise((resolve) => {
              timer = setTimeout(() => {
                this.waitSpanEnd.delete(traceId);
                resolve(undefined);
              }, 50);
            }),
          ]);
          if (timer) {
            clearTimeout(timer);
          }
        }
        return this.forceFlush();
      });
    }
    // End of the adapted code block
    for (const processor of this.processors) {
      processor.onStart(span, parentContext);
    }
  }

  onEnd(span: ReadableSpan): void {
    const { traceId, spanId } = span.spanContext();
    const rootObj = this.rootSpanIds.get(traceId);
    const isRoot = rootObj?.rootSpanId === spanId;

    if (isRoot) {
      this.rootSpanIds.delete(traceId);
      if (rootObj?.open.length > 0) {
        for (const openSpan of rootObj.open) {
          if (!openSpan.ended && openSpan.spanContext().spanId !== spanId) {
            try {
              openSpan.end();
            } catch (e) {
              diag.error("onEnd failed:", e);
            }
          }
        }
      }
    } else if (rootObj) {
      for (let i = 0; i < rootObj.open.length; i++) {
        if (rootObj.open[i]?.spanContext().spanId === spanId) {
          rootObj.open.splice(i, 1);
        }
      }
    }

    for (const processor of this.processors) {
      processor.onEnd(span);
    }

    if (isRoot) {
      const pending = this.waitSpanEnd.get(traceId);
      if (pending) {
        this.waitSpanEnd.delete(traceId);
        pending();
      }
    }
  }

  setupShutdownHooks(): void {
    if (typeof process !== "undefined") {
      process.on("exit", () => {
        diag.debug("Process exit: forcing span flush");
        this.forceFlush().catch((err) =>
          diag.error("Error during flush on exit", err)
        );
      });

      process.on("SIGTERM", () => {
        diag.debug("SIGTERM received: forcing span flush");
        this.forceFlush().catch((err) =>
          diag.error("Error during flush on SIGTERM", err)
        );
        process.exit(0);
      });

      process.on("SIGINT", () => {
        diag.debug("SIGINT received: forcing span flush");
        this.forceFlush().catch((err) =>
          diag.error("Error during flush on SIGINT", err)
        );
        process.exit(0);
      });
    }
  }
}
