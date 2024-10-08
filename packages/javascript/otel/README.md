# 🐙☁️ Infrastack Otel

[![npm](https://img.shields.io/npm/v/@infrastack/otel.svg)](https://www.npmjs.com/package/@infrastack/otel)
![npm](https://img.shields.io/npm/dm/@infrastack/otel)


## [GitHub](https://github.com/infrastackai/infrastack/tree/main/packages/javascript/otel)


`@infrastack/otel` is a simple and easy-to-use open-source package which helps setting up OpenTelemetry tracing

⚡ Utilize this package to instrument your applications and get started with OpenTelemetry blazingly fast!

## 📦 Installation

```bash
$ npm install @infrastack/otel
```
---

## 🧑‍🏫 Usage
To configure Infrastack SDK, call the `init` function in the `instrumentation.ts`:

```javascript
import { InfrastackSDK } from "@infrastack/otel";
const sdk = new InfrastackSDK();
sdk.init();
```

This will capture all the configurations from the `.env` file. This produces an output similar to below:
```
🧙 Doing some magic to get this application started with infrastack.ai...
🌐 Exporter endpoint is set as: https://collector.infrastack.ai
🔑 Gotcha! Found an API Key: sk-1*************************f5af
🎻 Handling the desired instrumentations... [ 'HTTP', 'MONGODB' ]
⌛ Almost there...
🚀 Application is now instrumented with OpenTelemetry 🤝 infrastack.ai and ready to go! 💪
```

### 🏔️ Environment variables (.env)
```properties
INFRASTACK_LOGS_ENABLED=true/false # Enables or disables SDK startup logs

INFRASTACK_TAGS='[{"key": "key1", "value": "value1"}, {"key": "key2", "value": "value2"}]' # These tags are directly injected into ResourceAttributes of each span.
INFRASTACK_ENVIRONMENT=DEBUG/DEV/PROD 

OTEL_EXPORTER_OTLP_ENDPOINT=YOUR_OTEL_EXPORTER_ENDPOINT
OTEL_EXPORTER_OTLP_HEADERS=YOUR_OTEL_EXPORTER_HEADERS # For infrastack.ai : "infrastack-api-key=sk-**********************"
OTEL_SERVICE_NAME=YOUR_SERVICE_NAME
OTEL_SERVICE_VERSION=YOUR_SERVICE_VERSION
OTEL_SERVICE_INSTANCE_ID=YOUR_SERVICE_INSTANCE_ID
OTEL_K8S_NAMESPACE=YOUR_K8S_POD_NAMESPACE
OTEL_K8S_POD_NAME=YOUR_K8S_POD_NAME
OTEL_INSTRUMENTATIONS='["http", "mongodb"]' # Array of instrumentations. If empty, auto instrumentations are used, which is the recommended usage.
```

See the [Supported Instrumentations](https://github.com/infrastackai/infrastack/blob/main/packages/javascript/otel/src/instrumentations/index.ts) from this link.

---

### ⚙️ Initializing the SDK with options
You can initialize the SDK with options, which overrides the environment variables.

1. First, gather the related imports from `@infrastack/otel` in your `instrumentation.ts`

```javascript
import { InfrastackSDK, Instrumentation, sdkOptions, Environment, tag } from "@infrastack/otel";
```
2. Then, set up your SDK options. 

```javascript
const myTags : tag[] = [
    {key: "aws-region", value: "us-west-2"},
    {key: "aws-account-id", value: "123456789012"}
]

const options : sdkOptions = {
    instrumentations: [Instrumentation.HTTP, Instrumentation.MONGODB, Instrumentation.EXPRESS],
    serviceName: "my-cool-service",
    serviceVersion: "1.0.0",
    environment: Environment.DEV,
    tags: myTags,
    logsEnabled:false,
    podNamespace: "my-cluster",
    podName: "my-pod"
}
```

3. 🪄 Initialize the Infrastack SDK
```javascript
const sdk = new InfrastackSDK(options);
sdk.init();
```

---
Partial SDK options are also possible. For example:

```javascript
const options : Partial<sdkOptions> = {
    logsEnabled: false
}
const sdk = new InfrastackSDK(options);
sdk.init();
```
This disables Infrastack SDK logs but collects the rest of the configuration from your `.env` file if available.

---

## 🔧 Custom spans 
To produce manual spans in your code, you can seamlessly use the OpenTelemetry API:

```javascript
import { trace } from "@opentelemetry/api";

const span = trace.getTracer("user-service").startSpan("fetch-user-data");
```

---

## 🧑‍🔧 Troubleshooting
If you are having issues, feel free to contact us!

[Email us](mailto:ferhat@infrastack.ai)

## 💪 Contributing
`@infrastack/otel` is an open-source project and contributions are always welcomed! Here are some guidelines to the so:

1. Clone the repository

```bash
$ git clone https://github.com/infrastackai/infrastack.git
```
2. cd into the this package's directory

```bash
$ cd packages/javascript/otel
```

3. Check out your feature branch

```
$ git checkout -b your-feature-branch
```
4. Install the dependencies

```bash
$ npm i
```
5. Implement your feature logic.
6. Since we are using the tool called `changeset` to publish releases. Create a changeset and fill the prompted.

```bash
$ npx changeset
```
7. Create a pull request in the repository from this [URL](https://github.com/infrastackai/infrastack/pulls) and invite someone active from the repository. 

We appreciate your help 😊

---

## Visit the [Changelog](https://github.com/infrastackai/infrastack/blob/main/packages/javascript/otel/CHANGELOG.md)

## References
[infrastack.ai Docs](https://docs.infrastack.ai)

[OpenTelemetry Javascript Docs](https://opentelemetry.io/docs/languages/js/)