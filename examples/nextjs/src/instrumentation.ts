import { Infrastack } from "@infrastack-otel";

export async function register() {
  Infrastack.init({
    serviceName: "Infrastack NextJS Example",
  });
}
