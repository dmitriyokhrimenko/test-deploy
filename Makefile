#!/usr/bin/make
# Makefile readme (ru): <http://linux.yaroslavl.ru/docs/prog/gnu_make_3-79_russian_manual.html>
# Makefile readme (en): <https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents>

SHELL = /bin/sh

docker_bin := $(shell command -v docker 2> /dev/null)
docker_compose_bin := $(shell command -v docker-compose 2> /dev/null)

# This will output the help for each task. thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo "\n  First start project:\n\
	    		make init \n\
			\n  Start project:\n\
	    		make start \n\
			\n  Stop project:\n\
	    		make down \n\
			\n  Clean project:\n\
	    		make clean-project \n\
			"

# --- [ Application ] -------------------------------------------------------------------------------------------------

up: ## Start all containers (in background) for development and clear cache
	$(docker_compose_bin) up --no-recreate -d
	$(docker_bin) network connect --alias sql1 ride_db sql1

# up: ## Start all containers (in background) for development in watch mode
# 	$(docker_compose_bin) up --no-recreate -d
# 	$(docker_bin) network connect --alias sql1 ride_db sql1

down: ## Stop all started for development containers
	$(docker_bin) network disconnect ride_db sql1
	$(docker_compose_bin) down

restart: up ## Restart all started for development containers
	$(docker_compose_bin) restart