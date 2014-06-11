.PHONY: help install runserver clean-pyc

help:
	@echo "Please use 'make <target>' where <target> is one of"
	@echo "  install            to install/update all packages required for production"
	@echo "  runserver          to start the runserver"
	@echo "  clean-pyc          to remove Python file artifacts"

install:
	pip install -U -r requirements/base.txt;
	cd project; \
	python manage.py syncdb; \
	python manage.py load_school_data;\
	python manage.py load_daycare_data;
	@echo "Install done. Use 'make runserver' to start the server."

runserver:
	cd project; \
	python manage.py runserver

clean-pyc:
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f {} +
