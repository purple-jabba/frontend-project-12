install:
	npm ci

start:
	npx start-server -s ./frontend/build

build:
	rm frontend/build -rf
	npm run build