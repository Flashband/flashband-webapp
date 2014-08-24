#!/usr/bin/env bash

node_modules/.bin/jscover api api-cov
mv api api-orig
mv api-cov api
node_modules/.bin/mocha -R node_modules/mocha-lcov-reporter > coverage.lcov
rm -rf api
mv api-orig api
