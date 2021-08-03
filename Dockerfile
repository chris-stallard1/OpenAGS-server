FROM debian:latest
COPY . /OpenAGS-server
RUN apt update &&\
    apt install -y git python3 python3-pip &&\
    cd /OpenAGS-server &&\
    python3 -m pip install --upgrade pip &&\
    python3 -m pip install -r requirements.txt
ENTRYPOINT ["bash /OpenAGS-server/entrypoint.sh", "http"]