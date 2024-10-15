import os
import unittest

from infrastackotel import Configuration, Infrastack


class TestInfrastack(unittest.TestCase):

    def setUp(self):
        # Clear environment variables before each test
        env_vars = [
            "OTEL_SERVICE_NAME",
            "INFRASTACK_API_KEY",
            "OTEL_EXPORTER_OTLP_ENDPOINT",
            "INFRASTACK_TAGS",
            "INFRASTACK_DEVELOPMENT_MODE",
            "OTEL_EXPORTER_OTLP_HEADERS",
            "OTEL_SERVICE_VERSION",
            "OTEL_K8S_NAMESPACE",
            "OTEL_K8S_POD_NAME",
        ]
        for env_var in env_vars:
            if env_var in os.environ:
                del os.environ[env_var]

        os.environ["INFRASTACK_API_KEY"] = "test-key"

    def test_use_provided_service_name(self):
        service_name = "test-service"
        infrastack = Infrastack.configure(
            Configuration(service_name=service_name))
        self.assertEqual(infrastack.config.service_name, service_name)

    def test_use_provided_service_version(self):
        service_version = "1.0.0"
        infrastack = Infrastack.configure(
            Configuration(service_version=service_version)
        )
        self.assertEqual(infrastack.config.service_version, service_version)

    def test_use_only_env_vars(self):
        os.environ["OTEL_SERVICE_NAME"] = "test-service"
        os.environ["OTEL_SERVICE_VERSION"] = "1.0.0"
        os.environ["OTEL_K8S_NAMESPACE"] = "test-namespace"
        os.environ["OTEL_K8S_POD_NAME"] = "test-pod"
        os.environ["INFRASTACK_TAGS"] = '[{"key": "env", "value": "test"}]'
        infrastack = Infrastack.configure(Configuration())
        self.assertEqual(infrastack.config.service_name, "test-service")
        self.assertEqual(infrastack.config.service_version, "1.0.0")
        self.assertEqual(infrastack.config.pod_namespace, "test-namespace")


if __name__ == "__main__":
    unittest.main()
