#!/bin/bash
cd api/
npm test

cd ../web/
./node_modules/.bin/gulp test

cd ../

