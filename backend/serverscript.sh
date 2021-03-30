#!/bin/bash
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt install dnsmasq -y
sudo systemctl restart dnsmasq -y
sudo apt install dnsutils -y
sudo apt-get install python3.6 -y

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
nvm install 15.10.0

cd /home/pi/s21-team-blue/web-app
sudo npm ci
sudo npm run pro-build

cd /home/pi/s21-team-blue/backend
sudo npm ci
sudo npm start
