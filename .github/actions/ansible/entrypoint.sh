#!/bin/sh

echo "$GCLOUD_SERVICE_ACCOUNT_KEY" | base64 -d > ~/.service_account_key.json
gcloud auth activate-service-account "$GCLOUD_SERVICE_ACCOUNT" --key-file ~/.service_account_key.json

echo "$VAULT_PASS" > ~/.vault_pass.txt
ansible-playbook --vault-password-file ~/.vault_pass.txt -i "$INVENTORY" "$PLAYBOOK"
