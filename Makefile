build:
	npm install -g yarn; \
	cd _themes/corcra; \
	yarn install; \
	node_modules/.bin/bower-installer; \
	node_modules/.bin/gulp dist; \
	wget https://getcomposer.org/composer.phar; \
	chmod +x composer.phar; \
	git clone https://github.com/stakx-io/stakx.git; \
	cd stakx; \
	../composer.phar install --no-dev -o; \
	cd ..; \
	php stakx/bin/stakx build
