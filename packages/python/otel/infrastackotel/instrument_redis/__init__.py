from opentelemetry.instrumentation.redis import RedisInstrumentor

from ..configuration import Configuration


def instrument_redis(config: Configuration):
    try:
        RedisInstrumentor().instrument()
        if config.logs_enabled:
            print("Redis instrumented")
    except ImportError:
        print(
            "Redis instrumentation not available. Install with "
            "'pip install infrastackotel[redis]'"
        )
