# @infrastack/otel

## 0.2.0

### Minor Changes

- 0914d94: # startOtel Deprecation
  The `startOtel` function has been replaced with `Infrastack.init`. We believe that we will be bringing more functionality to the package, and this will make it easier for us to do so.

  # Protocol Support

  We have added support for gRPC as a protocol. This is available as an option in the `init` function under the enum `Protocol`. The default protocol is GRPC.

  # NextJS Performance Improvements

  We were aware of Vercel deployed Next.js applications had problems. We have made some performance improvements to the SDK to help with this.

  Now, we are not directly depending on the `@opentelemetry/sdk-node` package since we had bunch of import errors in the Next.js framework.

  From now on, `next.config.mjs` is more straightforward.

  Also, we adapted some `vercel` related optimizations by using the `@vercel/otel` packages some functionalities, specifically the `VercelRequestContext` and flushing the tracer when the request ends.

## 0.1.1

### Patch Changes

- eae7622: Development mode has been converted to boolean flag instead of enumeration, examples are updated with latest version of @infrastack/otel

## 0.1.0

### Minor Changes

- 95462d6: - Removed Instrumentations, using auto-instrumentations now.
  - Client-side environment check added in order not to break client-side environments via node.js specific modules.
  - InfrastackSDK is now wrapped with 'startOtel' function.
  - Logging enhancements.
  - New unit tests.
  - Endpoint and API key capture logic enhancements.
  - Typescript compiler option to target ES2020.
  - sdkOptions has been renamed as Configuration.

## 0.0.1

### Patch Changes

- 670a819: - Added a README.
  - Added keywords.
  - Non-exported types are exported.
