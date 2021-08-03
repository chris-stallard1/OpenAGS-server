#!/bin/bash
apt update
apt upgrade -y
python3 -m pip install -U openags

if [ "$1" == "http" ]; then
    sudo python3 -m hypercorn --bind 0.0.0.0:80 server:app
else
    sudo python3 -m hypercorn --certfile /https/certfile.pem --keyfile /https/privkey.pem --bind 0.0.0.0:443 --insecure-bind 0.0.0.0:80 server:redirectedApp
