#!/bin/sh

# 사용자 입력 받기
echo "Enter SECURITY_USER:"
read SECURITY_USER
echo "Enter SECURITY_PASSWORD:"
read SECURITY_PASSWORD

# 업데이트할 환경변수 파일
BASHRC_FILE="$HOME/.zshrc"

# 기존 값을 제거하고 새 값 추가
sed -i '/^export SECURITY_USER=/d' "$BASHRC_FILE"
sed -i '/^export SECURITY_PASSWORD=/d' "$BASHRC_FILE"

echo "export SECURITY_USER=\"$SECURITY_USER\"" >> "$BASHRC_FILE"
echo "export SECURITY_PASSWORD=\"$SECURITY_PASSWORD\"" >> "$BASHRC_FILE"

# 적용
echo "Environment variables updated. Run 'source ~/.bashrc' to apply changes."

