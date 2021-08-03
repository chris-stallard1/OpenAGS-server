#!/bin/bash
apt update
apt upgrade -y
python3 -m pip install -U openags

cd /OpenAGS-server
if [ "$1" == "http" ]; then
    python3 -m hypercorn --bind 0.0.0.0:8080 server:app
else
    python3 -m hypercorn --certfile /https/certfile.pem --keyfile /https/privkey.pem --bind 0.0.0.0:4443 --insecure-bind 0.0.0.0:8080 server:redirectedApp
fi