#!/bin/bash
npm install -g yo gulp bower generator-gulp-angular
cd api/
npm install
cd ../web/
npm install
ndenv rehash
bower install
cd ../
