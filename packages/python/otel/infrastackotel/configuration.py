import json
import os
import random
import re
from typing import List, Optional

from fastapi import FastAPI
from flask import Flask
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import \
    OTLPSpanExporter
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import (BatchSpanProcessor,
                                            ConsoleSpanExporter,
                                            SimpleSpanProcessor)


class Tag:
    def __init__(self, key: str, value: str):
        self.key = key
        self.value = value


class Configuration:
    def __init__(
        self,
        is_development_mode: bool = False,
        tags: List[Tag] = None,
        service_name: Optional[str] = None,
        service_version: str = None,
        pod_namespace: Optional[str] = None,
        pod_name: Optional[str] = None,
        logs_enabled: bool = True,
        endpoint: Optional[str] = None,
        api_key: Optional[str] = None,
    ):
        self.is_development_mode = is_development_mode
        self.tags = tags or []
        self.service_name = service_name
        self.service_version = service_version
        self.pod_namespace = pod_namespace
        self.pod_name = pod_name
        self.logs_enabled = logs_enabled
        self.endpoint = endpoint
        self.api_key = api_key


class Infrastack:
    def __init__(self):
        self.config = None
        self.fastapi_app = None
        self.flask_app = None
        self.resource = None
        self.provider = None
        self.exporter = None

    @classmethod
    def configure(cls, config: Optional[Configuration] = None):
        instance = cls()
        instance.config = instance._merge_config_with_env(config or Configuration())
        instance._setup_telemetry()
        instance._perform_initial_logging()
        return instance

    def _merge_config_with_env(self, config: Configuration) -> Configuration:
        env_tags = self._parse_env_tags()
        is_development_mode = self._determine_development_mode(
            config.is_development_mode
        )

        config.is_development_mode = is_development_mode
        config.tags = config.tags or env_tags
        config.service_name = (
            config.service_name
            or os.getenv("OTEL_SERVICE_NAME")
            or self._generate_random_service_name()
        )
        config.service_version = config.service_version or os.getenv(
            "OTEL_SERVICE_VERSION", "0.0.1"
        )
        config.pod_namespace = config.pod_namespace or os.getenv(
            "OTEL_K8S_NAMESPACE", ""
        )
        config.pod_name = config.pod_name or os.getenv("OTEL_K8S_POD_NAME", "")
        config.logs_enabled = (
            config.logs_enabled
            if config.logs_enabled is not None
            else os.getenv("INFRASTACK_LOGS_ENABLED", "true").lower() != "false"
        )
        config.endpoint = config.endpoint or self._determine_endpoint()
        config.api_key = config.api_key or self._determine_api_key()

        if "infrastack.ai" in config.endpoint and not config.api_key:
            raise ValueError("API key is required when using infrastack.ai endpoint")

        return config

    def _parse_env_tags(self) -> List[Tag]:
        env_tags = os.getenv("INFRASTACK_TAGS")
        if not env_tags:
            return []
        try:
            return [Tag(tag["key"], tag["value"]) for tag in json.loads(env_tags)]
        except json.JSONDecodeError:
            raise ValueError("Failed to parse INFRASTACK_TAGS environment variable")

    def _determine_development_mode(self, provided_mode: Optional[bool]) -> bool:
        if provided_mode is not None:
            return provided_mode
        return os.getenv("INFRASTACK_DEVELOPMENT_MODE", "").lower() == "true"

    def _determine_endpoint(self) -> str:
        return os.getenv(
            "OTEL_EXPORTER_OTLP_ENDPOINT", "https://collector.infrastack.ai"
        )

    def _determine_api_key(self) -> Optional[str]:
        api_key = os.getenv("INFRASTACK_API_KEY")
        if not api_key:
            headers = os.getenv("OTEL_EXPORTER_OTLP_HEADERS", "")
            api_key_match = re.search(r"infrastack-api-key=([^,\s]+)", headers)
            if api_key_match:
                api_key = api_key_match.group(1)
        return api_key

    def _generate_random_service_name(self) -> str:
        verbs = [
            "run",
            "jump",
            "fly",
            "swim",
            "dance",
            "sing",
            "explore",
            "build",
            "think",
            "create",
        ]
        adjectives = [
            "happy",
            "quick",
            "fuzzy",
            "tiny",
            "hero",
            "brave",
            "cool",
            "bright",
            "lucky",
            "silly",
        ]
        nouns = [
            "octopus",
            "cloud",
            "dog",
            "cat",
            "bird",
            "unicorn",
            "tree",
            "rocket",
            "star",
            "budgie",
        ]
        return (
            f"{random.choice(verbs)}-{random.choice(adjectives)}-{random.choice(nouns)}"
        )

    def _setup_telemetry(self):
        self.resource = Resource.create(
            {
                "service.name": self.config.service_name,
                "service.version": self.config.service_version or "0.0.1",
                "service.instance.id": self.config.pod_name,
                "k8s.namespace.name": self.config.pod_namespace,
                "k8s.pod.name": self.config.pod_name,
                **{tag.key: tag.value for tag in self.config.tags},
            }
        )

        self.provider = TracerProvider(resource=self.resource)

        headers = (
            {"infrastack-api-key": self.config.api_key}
            if "infrastack.ai" in self.config.endpoint
            else None
        )

        self.exporter = OTLPSpanExporter(endpoint=self.config.endpoint, headers=headers)

        if self.config.is_development_mode:
            self.provider.add_span_processor(SimpleSpanProcessor(ConsoleSpanExporter()))
            self.provider.add_span_processor(SimpleSpanProcessor(self.exporter))
        else:
            self.provider.add_span_processor(BatchSpanProcessor(self.exporter))

        trace.set_tracer_provider(self.provider)

    def _perform_initial_logging(self):
        if self.config.is_development_mode:
            print(
                "⚠️ Development mode is enabled. Make sure not to deploy this to production."
            )
            if self.config.logs_enabled:
                print("🔍 Development mode enabled.")
                print(
                    "You will be able to see the traces in the console as well as in the dashboard."
                )

        if not self.config.logs_enabled:
            return

        print(f"Exporter endpoint is set as: {self.config.endpoint}")
        if self.config.api_key:
            obfuscated_key = f"{self.config.api_key[:4]}*****{self.config.api_key[-4:]}"
            print(f"Found an API Key: {obfuscated_key}")
        print(f"Service name is set as: {self.config.service_name}")
        print(f"Service version is set as: {self.config.service_version}")
        if self.config.pod_namespace:
            print(f"Pod namespace is set as: {self.config.pod_namespace}")
        if self.config.pod_name:
            print(f"Pod name is set as: {self.config.pod_name}")
        if self.config.tags:
            print(f"Tags are set as: {self.config.tags}")

    def instrument_fastapi(self, app: FastAPI = None):
        from .instrument_fastapi import instrument_fastapi

        if app:
            self.fastapi_app = app
        if self.fastapi_app:
            instrument_fastapi(self.fastapi_app, self.config)
        else:
            raise ValueError(
                "FastAPI app not provided. Please pass the app to "
                "instrument_fastapi or use set_fastapi_app method."
            )

    def instrument_flask(self, app: Flask = None):
        if app:
            self.flask_app = app
        if self.flask_app:
            from .instrument_flask import instrument_flask

            instrument_flask(self.config, self.flask_app)
        else:
            raise ValueError(
                "Flask app not provided. Please pass the app to "
                "instrument_flask or use set_flask_app method."
            )

    def set_fastapi_app(self, app: FastAPI):
        self.fastapi_app = app

    def set_flask_app(self, app: Flask):
        self.flask_app = app

    def instrument_django(self):
        from .instrument_django import instrument_django

        instrument_django(self.config)

    def instrument_mysql(self):
        from .instrument_mysql import instrument_mysql

        instrument_mysql(self.config)

    def instrument_httpx(self):
        from .instrument_httpx import instrument_httpx

        instrument_httpx(self.config)

    def instrument_psycopg(self):
        from .instrument_psycopg import instrument_psycopg

        instrument_psycopg(self.config)

    def instrument_kafka(self):
        from .instrument_kafka import instrument_kafka

        instrument_kafka(self.config)

    def instrument_redis(self):
        from .instrument_redis import instrument_redis

        instrument_redis(self.config)

    def instrument_sqlalchemy(self):
        from .instrument_sqlalchemy import instrument_sqlalchemy

        instrument_sqlalchemy(self.config)

    def instrument_pymongo(self):
        from .instrument_pymongo import instrument_pymongo

        instrument_pymongo(self.config)

    def instrument_requests(self):
        from .instrument_requests import instrument_requests

        instrument_requests(self.config)

    def __del__(self):
        if self.config and self.config.logs_enabled:
            print("Application is now instrumented with infrastack.ai")
