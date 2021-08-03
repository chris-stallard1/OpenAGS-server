FROM alpine:latest
COPY . /OpenAGS-server
RUN apk update &&\
    apk add --no-cache git python3 py3-pip &&\
    cd /OpenAGS-server &&\
    python3 -m pip install --upgrade pip &&\
    sudo python3 -m pip install -r requirements.txt
ENTRYPOINT ["bash /OpenAGS-server/entrypoint.sh", "http"]