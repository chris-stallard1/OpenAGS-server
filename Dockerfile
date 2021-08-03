FROM alpine:latest
COPY . /OpenAGS-server
RUN chmod +x /OpenAGS-server/setup.sh
RUN /OpenAGS-server/setup.sh
ENTRYPOINT ["bash /OpenAGS-server/entrypoint.sh", "http"]