build:
	npm install -g yarn; \
	cd _themes/corcra; \
	yarn install; \
	node_modules/.bin/bower-installer; \
	node_modules/.bin/gulp dist
	wget https://github.com/stakx-io/stakx/releases/download/v0.1.0/stakx-0.1.0.phar
	php stakx-0.1.0.phar build