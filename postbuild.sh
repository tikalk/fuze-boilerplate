#!/bin/bash

set -x

mkdir -p build
mkdir -p build/apps/angular
mkdir -p build/apps/react

cp -r packages/shell/dist/* ./build/
cp -r packages/angular-demo/dist/angular-demo/* ./build/apps/angular/
cp -r packages/react-demo/build/* ./build/apps/react/