#!/bin/bash
cd /home/pi/s21-team-blue/web-app
sudo npm ci
sudo npm run pro-build

cd /home/pi/s21-team-blue/backend
sudo npm ci
sudo npm start
