from opentelemetry.instrumentation.httpx import HttpClientInstrumentor

from ..configuration import Configuration


def instrument_httpx(config: Configuration):
    try:
        HttpClientInstrumentor().instrument()
        if config.logs_enabled:
            print("HTTPX instrumented")
    except ImportError:
        print(
            "HTTPX instrumentation not available. Install with "
            "'pip install infrastackotel[httpx]'"
        )
