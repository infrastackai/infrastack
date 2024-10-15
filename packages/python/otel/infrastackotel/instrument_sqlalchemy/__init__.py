from ..configuration import Configuration


def instrument_sqlalchemy(config: Configuration):
    try:
        from opentelemetry.instrumentation.sqlalchemy import \
            SQLAlchemyInstrumentor

        SQLAlchemyInstrumentor().instrument()
        if config.logs_enabled:
            print("SQLAlchemy instrumented")
    except ImportError:
        print(
            "SQLAlchemy instrumentation not available. "
            "Install with 'pip install infrastackotel[sqlalchemy]'"
        )
