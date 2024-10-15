from ..configuration import Configuration


def instrument_mysql(config: Configuration):
    try:
        from opentelemetry.instrumentation.mysql import MySQLInstrumentor

        MySQLInstrumentor().instrument()
        if config.logs_enabled:
            print("MySQL instrumented")
    except ImportError:
        print(
            "MySQL instrumentation not available. Install with "
            "'pip install infrastackotel[mysql]'"
        )
