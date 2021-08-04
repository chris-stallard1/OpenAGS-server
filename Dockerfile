FROM amazonlinux:latest
COPY . /OpenAGS-server
RUN yum update &&\
    yum install -y python3 python3-pip &&\
    cd /OpenAGS-server &&\
    python3 -m pip install --upgrade pip &&\
    python3 -m pip install -r requirements.txt &&\
    chmod +x /OpenAGS-server/docker-scripts/entrypoint.sh
ENTRYPOINT ["/OpenAGS-server/docker-scripts/entrypoint.sh", "http",""]