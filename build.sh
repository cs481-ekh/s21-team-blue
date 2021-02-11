#!/bin/bash

# controller 'building'
pip3 install -r controller/requirements.txt
pylint3 controller/main.py

