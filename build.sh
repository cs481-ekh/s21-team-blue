#!/bin/bash

# controller 'building'
sudo apt-get install python3-setuptools # so the next pip command can setup its packages. Note the CI container uses passwordless sudo
sudo apt-get install pylint3
#pip3 install -r controller/requirements.txt
pylint3 controller/main.py

