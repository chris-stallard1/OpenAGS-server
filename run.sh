#!/bin/bash
python3 -m pip install -U openags
cd /home/openags/OpenAGS-server
python3 -m hypercorn --bind 0.0.0.0:8080 server:app > ../server.log 2>&1 &