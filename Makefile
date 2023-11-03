.PHONY: run

run:
	npx esbuild src/app-main.js --bundle --format=esm --outfile=dist/app-main.js --watch

VERSION=$(shell cat manifest.json | jq -r '.version')

zip:;zip -r d_quest_$(VERSION).zip .

