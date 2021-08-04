#!/bin/bash
yum update --security -y
python3 -m pip install -U openags

cd /OpenAGS-server
if [ "$1" == "http" ]; then
    python3 -m hypercorn --bind 0.0.0.0:80 server:app
else
    echo "$2" > hostname
    if [ ! -f ./certfile.pem ]; then
        cp /https-certs/certfile.pem ./certfile.pem
        cp /https-certs/privkey.pem ./privkey.pem
    fi
    python3 -m hypercorn --certfile certfile.pem --keyfile privkey.pem --bind 0.0.0.0:443 --insecure-bind 0.0.0.0:80 server:redirectedApp
fi