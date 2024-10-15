from opentelemetry.instrumentation.pymongo import PymongoInstrumentor

from ..configuration import Configuration


def instrument_pymongo(config: Configuration):
    try:
        PymongoInstrumentor().instrument()
        if config.logs_enabled:
            print("PyMongo instrumented")
    except ImportError:
        print(
            "PyMongo instrumentation not available. Install with "
            "'pip install infrastackotel[pymongo]'"
        )
