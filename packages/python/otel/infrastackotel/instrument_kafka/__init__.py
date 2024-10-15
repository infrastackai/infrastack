from ..configuration import Configuration


def instrument_kafka(config: Configuration):
    try:
        from opentelemetry.instrumentation.kafka import KafkaInstrumentor

        KafkaInstrumentor().instrument()
        if config.logs_enabled:
            print("Kafka instrumented")
    except ImportError:
        print(
            "Kafka instrumentation not available. Install with "
            "'pip install infrastackotel[kafka]'"
        )
