#!/bin/bash
yum update --security -y
python3 -m pip install -U openags

cd /OpenAGS-server
if [ "$1" == "http" ]; then
    python3 -m hypercorn --bind 0.0.0.0:80 server:app
else
    echo "$2" > hostname
    python3 -m hypercorn --certfile /https-certs/certfile.pem --keyfile /https-certs/privkey.pem --bind 0.0.0.0:443 --insecure-bind 0.0.0.0:80 server:redirectedApp
fi