#!/bin/sh

# read security user and password
echo "Enter SECURITY_USER:"
read SECURITY_USER
echo "Enter SECURITY_PASSWORD:"
read SECURITY_PASSWORD

# update environment variables file
BASHRC_FILE="$HOME/.bashrc"

# add new values
sed -i '/^export SECURITY_USER=/d' "$BASHRC_FILE"
sed -i '/^export SECURITY_PASSWORD=/d' "$BASHRC_FILE"

echo "export SECURITY_USER=\"$SECURITY_USER\"" >> "$BASHRC_FILE"
echo "export SECURITY_PASSWORD=\"$SECURITY_PASSWORD\"" >> "$BASHRC_FILE"

# apply changes
echo "Environment variables updated. Run 'source ~/.bashrc' to apply changes."

