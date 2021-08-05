#!/bin/bash
cd /home/openags/OpenAGS-server
/usr/bin/python3 -m hypercorn --bind 0.0.0.0:8080 server:app > ../server.log 2>&1