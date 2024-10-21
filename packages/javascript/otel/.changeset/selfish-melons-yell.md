---
"@infrastack/otel": minor
---

# startOtel Deprecation
The `startOtel` function has been replaced with `Infrastack.init`. We believe that we will be bringing more functionality to the package, and this will make it easier for us to do so.

# Protocol Support
We have added support for gRPC as a protocol. This is available as an option in the `init` function under the enum `Protocol`. The default protocol is GRPC.

# NextJS Performance Improvements
We were aware of Vercel deployed Next.js applications had problems. We have made some performance improvements to the SDK to help with this.

Now, we are not directly depending on the `@opentelemetry/sdk-node` package since we had bunch of import errors in the Next.js framework.

From now on, `next.config.mjs` is more straightforward.

Also, we adapted some `vercel` related optimizations by using the `@vercel/otel` packages some functionalities, specifically the `VercelRequestContext` and flushing the tracer when the request ends.

