---
"@infrastack/otel": minor
---

- Removed Instrumentations, using auto-instrumentations now.
- Client-side environment check added in order not to break client-side environments via node.js specific modules.
- InfrastackSDK is now wrapped with 'startOtel' function.
- Logging enhancements.
- New unit tests.
- Endpoint and API key capture logic enhancements.
- Typescript compiler option to target ES2020.
- sdkOptions has been renamed as Configuration.
