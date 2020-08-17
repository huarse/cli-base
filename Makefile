# ts lib makefile
# @author Pluto <huarse@gmail.com>
# @create 2020/03/30 17:50

.PHONY: run lint clear lib esm dist copy finish

run: clear lint lib esm copy finish

lint:
	@echo '> checking code ...'
	@./node_modules/.bin/eslint --fix --ext .js,.ts ./src

clear:
	rm -rf dist lib esm types

lib:
	@echo '> compile to commonjs module ...'
	@./node_modules/.bin/tsc --outDir lib --module CommonJS --target ES6

esm:
	@echo '> compile to es module ...'
	@./node_modules/.bin/tsc --outDir esm --module ES6 --target ES2018

dist:
	@echo '> compile to umd module ...'
	@./node_modules/.bin/rollup -c ./config/rollup.config.js

copy:
	@echo '> copy declare file ...'
	@cp ./src/*.d.ts ./types || :

finish:
	@echo '> building completed!'
