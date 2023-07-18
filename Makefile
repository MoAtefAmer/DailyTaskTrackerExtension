.PHONY: run

run:
	npx esbuild src/my-element.js --bundle --format=esm --outfile=dist/my-element.js --watch