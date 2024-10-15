from ..configuration import Configuration


def instrument_requests(config: Configuration):
    try:
        from opentelemetry.instrumentation.requests import RequestsInstrumentor

        RequestsInstrumentor().instrument()
        if config.logs_enabled:
            print("Requests instrumented")
    except ImportError:
        print(
            "Requests instrumentation not available. Install with "
            "'pip install infrastackotel[requests]'"
        )
