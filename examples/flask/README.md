# infrastack.ai Flask Example App

This is an example Flask app integrated with [InfraStack](https://infrastack.ai) for observability.

Follow along [our documentation](https://docs.infrastack.ai/documentation/integrate-opentelemetry-for-flask-with-infrastack) for more information.

## Getting Started

First, set up your environment:

1. Clone this repository
2. Install dependencies:
   ```bash
   pip install infrastackotel
   ```
3. Export your InfraStack API key as an environment variable:
   ```
   export INFRASTACK_API_KEY=your_api_key_here
   ```

Then, build and run the server with the following command:
```bash
flask run --port=8000
```
Populate some traffic by creating and listing users:
```bash
curl -X POST http://localhost:8000/users/ -H "Content-Type: application/json" -d '{"name":"George","age":77}'
curl http://localhost:8000/users/
```
Go to the [InfraStack dashboard](https://app.infrastack.ai) and see the traces.