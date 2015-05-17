# encoding: utf-8
"""
Django settings for kidsle project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '9p4xe+jf8t1om!k8=lt2!2aqdcd*k^8pm(0!a!n$vsh75^v=8b'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # third party apps
    'compressor',
    'grappelli',
    'rest_framework',
    'django.contrib.admin',
    'leaflet',

    # own apps
    'core',
    'daycare',
    'schools',
    'playgrounds'
)

# list all of the own apps despite core, that should be used and shown in the frontend
ACTIVE_APPS = (
    'daycare',
    'schools',
    #'playgrounds',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'kidsle.urls'

WSGI_APPLICATION = 'kidsle.wsgi.application'

TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
)

TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, 'templates'),
)

TEMPLATE_CONTEXT_PROCESSORS = (
    "django.contrib.auth.context_processors.auth",
    "django.core.context_processors.debug",
    "django.core.context_processors.i18n",
    "django.core.context_processors.media",
    "django.core.context_processors.static",
    "django.core.context_processors.tz",
    "django.contrib.messages.context_processors.messages",
    "django.core.context_processors.request",
    "core.context_processors.active_apps"
)

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'django.contrib.staticfiles.finders.FileSystemFinder',
    #    'django.contrib.staticfiles.finders.DefaultStorageFinder',
    'compressor.finders.CompressorFinder'
)

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

COMPRESS_PRECOMPILERS = (
   ('text/less', 'lessc {infile} {outfile}'),
)

INTERNAL_IPS = ('127.0.0.1',)

# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'de'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_URL = '/static/'

LEAFLET_CONFIG = {
    'MAX_ZOOM': 18,
    'DEFAULT_CENTER': (51.34, 12.37),
    'DEFAULT_ZOOM': 15,
    'RESET_VIEW': False,
    'TILES': 'http://a.tiles.mapbox.com/v3/themakermafia.jkmkllh8/{z}/{x}/{y}.png',
    'ATTRIBUTION_PREFIX': u'<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox © OpenStreetMap</a>'
}

try:
    from local_settings import *
except ImportError:
    pass
