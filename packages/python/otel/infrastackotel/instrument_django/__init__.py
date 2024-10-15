from ..configuration import Configuration


def instrument_django(config: Configuration):
    try:
        from opentelemetry.instrumentation.django import DjangoInstrumentor

        DjangoInstrumentor().instrument()
        if config.logs_enabled:
            print("Django instrumented")
    except ImportError:
        print(
            "Django instrumentation not available. Install with "
            "'pip install infrastackotel[django]'"
        )
