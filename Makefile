SERVICE="infrastack-website"
ifeq ($(strip $(TAG)),)
TAG="latest"
endif
pwd=$(shell pwd)

date = $(shell date)

ECR_REPO = "324346964728.dkr.ecr.us-west-1.amazonaws.com"

build:
	docker build -t $(SERVICE):$(TAG) .
push: build
	AWS_DEFAULT_PROFILE=infrastack aws ecr get-login-password --region us-west-1 | docker login --username AWS --password-stdin $(ECR_REPO)
	docker tag $(SERVICE):$(TAG) $(ECR_REPO)/$(SERVICE):$(TAG)
	docker tag $(SERVICE):$(TAG) $(ECR_REPO)/$(SERVICE):latest
	docker push $(ECR_REPO)/$(SERVICE):$(TAG)
	docker push $(ECR_REPO)/$(SERVICE):latest
deploy:
	kns website
	kubectl set image deployment/infrastack-website infrastack-website=$(ECR_REPO)/$(SERVICE):$(TAG) --namespace website
helm-deploy:
	helm upgrade --namespace website chart-1708384433 ./charts/application --set image.tag=$(TAG)