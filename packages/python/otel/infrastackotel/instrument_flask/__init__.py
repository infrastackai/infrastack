from flask import Flask
from opentelemetry.instrumentation.flask import FlaskInstrumentor

from ..configuration import Configuration


def instrument_flask(config: Configuration, app: Flask = None):
    try:
        FlaskInstrumentor().instrument_app(app=app)
        if config.logs_enabled:
            print("Flask instrumented")
    except ImportError:
        print(
            "Flask instrumentation not available. Install with "
            "'pip install infrastackotel[flask]'"
        )
