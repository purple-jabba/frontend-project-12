install:
	npm ci

postinstall:
	npm run postinstall

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

build:
	make install
	make postinstall
	rm frontend/build -rf
	npm run build