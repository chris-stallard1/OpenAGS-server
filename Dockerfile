FROM alpine:latest
COPY . /OpenAGS-server
RUN bash /OpenAGS-server/setup.sh
ENTRYPOINT ["bash /OpenAGS-server/entrypoint.sh", "http"]