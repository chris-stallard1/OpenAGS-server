#!/bin/bash
python3 -m pip install -U openags

if [ "$1" == "http" ]; then
    python3 -m hypercorn --bind 0.0.0.0:8080 server:app
else
    echo "$2" > hostname
    python3 -m hypercorn --certfile $3/certfile.pem --keyfile $3/privkey.pem --bind 0.0.0.0:443 --insecure-bind 0.0.0.0:80 server:redirectedApp
fi