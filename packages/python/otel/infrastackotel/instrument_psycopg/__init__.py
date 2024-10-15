from ..configuration import Configuration


def instrument_psycopg(config: Configuration):
    try:
        from opentelemetry.instrumentation.psycopg2 import Psycopg2Instrumentor

        Psycopg2Instrumentor().instrument()
        if config.logs_enabled:
            print("Psycopg2 instrumented")
    except ImportError:
        print(
            "Psycopg2 instrumentation not available. Install with "
            "'pip install infrastackotel[psycopg]'"
        )
