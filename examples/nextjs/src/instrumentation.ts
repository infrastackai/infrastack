export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startOtel } = await import("@infrastack/otel");

    startOtel({
      serviceName: "infrastack-nextjs-example",
    });
  }
}
