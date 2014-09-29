#!/bin/bash
cd ../web/
npm install
sed  "s/localhost:1337/api.flashband.dropit.in/g" app/scripts/flashband/flashband.rest.factory.js -i
./node_modules/.bin/gulp dist
git checkout ./
