#!/bin/bash

# === linting for python controller ===
sudo apt-get install pylint3 # note the CI container uses passwordless sudo
# run pylint3 on every .py file under ./controller
for pyfile in `find ./controller/ -name '*.py'`
do
    pylint3 $pyfile
done

# Angular app build
cd web-app
npm ci
npm run build --if-present
cd # Return to root directory

# Node Express Server build
cd backend
npm ci
npm run build --if-present
cd
