FROM alpine:latest
COPY . /OpenAGS-server
RUN /bin/bash /OpenAGS-server/setup.sh
ENTRYPOINT ["bash /OpenAGS-server/entrypoint.sh", "http"]