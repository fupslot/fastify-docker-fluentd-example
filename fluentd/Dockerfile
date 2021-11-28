FROM fluentd:v1.9.1-debian-1.0

USER root
RUN apt -y update && apt install -y build-essential \
  && fluent-gem install fluent-plugin-s3 \
  && fluent-gem install fluent-plugin-mongo

USER fluent