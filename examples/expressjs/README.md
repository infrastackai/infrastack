# infrastack.ai Express.js Example App

This is an example Express.js app integrated with [InfraStack](https://infrastack.ai) for observability.

Follow along [our documentation](https://docs.infrastack.ai/quickstarts/expressjs) for more information.

## Getting Started

First, set up your environment:

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Export your InfraStack API key as an environment variable:
   ```
   export INFRASTACK_API_KEY=your_api_key_here
   ```

Then, build and run the server with the following command:
```bash
npm run start
```
Populate some traffic by creating and listing users:
```bash
curl -X POST http://localhost:8081/users -H "Content-Type: application/json" -d '{"name":"George","age":77}'
curl http://localhost:8081/users
```
Go to the [InfraStack dashboard](https://app.infrastack.ai) and see the traces.