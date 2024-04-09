lint-frontend:
	make -C frontend lint

install:
	npm ci

postinstall:
	npm run postinstall

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/build

local-start:
	make start-backend & make start-frontend

start:
	make start-backend

build:
	make install
	make postinstall
	rm frontend/build -rf
	npm run build