.PHONY: run

run:
	npx esbuild src/app-main.js --bundle --format=esm --outfile=dist/app-main.js --watch