"""
WSGI config for django project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from infrastackotel import Configuration, Infrastack

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "djangoexample.settings")

config = Configuration(
    service_name="infrastack-django-example",
)

infrastack = Infrastack.configure(config)
infrastack.instrument_django()
infrastack.instrument_psycopg()

application = get_wsgi_application()
