from ..configuration import Configuration


def instrument_fastapi(app, config: Configuration):
    try:
        from fastapi import FastAPI  # noqa
        from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

        FastAPIInstrumentor.instrument_app(app)
        if config.logs_enabled:
            print("FastAPI instrumented")
    except ImportError:
        print(
            "FastAPI instrumentation not available. Install with "
            "'pip install infrastackotel[fastapi]'"
        )
