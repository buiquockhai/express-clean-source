APP_NAME = literate
VERSION = $(shell printf "%s-%s" $(shell git rev-parse --short HEAD) $(shell date '+%Y%m%d'))
DOCKER = docker

.PHONY: tags
tags:
	echo $(APP_NAME):$(VERSION),$(APP_NAME):latest

.PHONY: tag
tag:
	echo $(APP_NAME):$(VERSION)
