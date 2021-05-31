SHELL := /bin/bash

# Start Project

.PHONY: start
start:
	@$(MAKE) -j 2 start_api start_front

# Start API

.PHONY: start_api
start_api:
	@Echo "Exporting necessary env variables..."
	@cd api && source dev.env
	@Echo "Starting server..."
	@cd api && flask run -p 5001

.PHONY: start_front
start_front: check-front-env
	@Echo "Starting Front..."
	@cd front && yarn start

.PHONY: check-front-env
check-front-env:
	@echo "Checking B2B environment..."
	@cd front && if [ ! -d "node_modules" ]; then \
	echo "No node_modules folder for front, please make install_front"; \
	exit 42; \
	fi
	@echo "Checking front environment...OK"
