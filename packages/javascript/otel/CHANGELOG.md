# @infrastack/otel

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
