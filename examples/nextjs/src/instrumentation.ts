import { Infrastack } from "@infrastack/otel";

export async function register() {
  Infrastack.init({
    serviceName: "Infrastack NextJS Example",
    // protocol: Protocol.HTTP, for Vercel deployed applications
  });
}
