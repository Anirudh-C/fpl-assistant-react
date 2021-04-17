FROM gcr.io/google.com/cloudsdktool/cloud-sdk:alpine

RUN gcloud components install kubectl

ENV ANSIBLE_HOST_KEY_CHECKING=False

RUN apk add ansible gcc python3-dev libc-dev libffi-dev openssl-dev
RUN ansible-galaxy collection install kubernetes.core
COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
