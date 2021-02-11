#!/bin/bash

# controller 'building'
sudo apt-get install pylint3 # note the CI container uses passwordless sudo
pylint3 controller/main.py

