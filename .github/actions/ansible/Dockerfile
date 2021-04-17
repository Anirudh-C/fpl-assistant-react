FROM gcr.io/google.com/cloudsdktool/cloud-sdk:latest

ENV ANSIBLE_HOST_KEY_CHECKING=False

RUN pip3 install ansible openshift && ansible-galaxy collection install kubernetes.core

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
