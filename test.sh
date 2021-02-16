#!/bin/bash

# === testing for python controller ===
python3 -m unittest controller/tests.py


# testing for Express Server app.js
cd backend
npm init
node app.js
