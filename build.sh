#!/bin/bash

# controller 'building'
sudo apt-get install pylint3 # note the CI container uses passwordless sudo
pylint3 controller/main.py

# Angular app build
cd web-app
npm ci
npm run build --if-present
cd # Return to root directory