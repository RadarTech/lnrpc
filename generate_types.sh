#!/bin/bash -x
# Generate typescript definitions and service definitions from proto file

set -e

LND_RELEASE_TAG=$1
PROTOC_VERSION=$2

# Clone LND release and extract rpc.proto
yarn
rm -f ./rpc.proto
node lib/proto-sanitizer.js "./lnd/${LND_RELEASE_TAG}/rpc.proto" "./rpc.proto"

GENERATED_TYPES_DIR=types/generated
if [ -d "$GENERATED_TYPES_DIR" ]
then
    rm -rf "$GENERATED_TYPES_DIR"
fi
mkdir -p "$GENERATED_TYPES_DIR"

# Download and install protoc
unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     platform=Linux;;
    Darwin*)    platform=Mac;;
    *)          platform="UNKNOWN:${unameOut}"
esac

mkdir -p protoc
if [[ $platform == 'Linux' ]]; then
    PROTOC_URL="https://github.com/google/protobuf/releases/download/v${PROTOC_VERSION}/protoc-${PROTOC_VERSION}-linux-x86_64.zip"
elif [[ $platform == 'Mac' ]]; then
    PROTOC_URL="https://github.com/google/protobuf/releases/download/v${PROTOC_VERSION}/protoc-${PROTOC_VERSION}-osx-x86_64.zip"
else
    echo "Cannot download protoc. ${platform} is not currently supported by ts-protoc-gen"
    exit 1
fi

curl -L ${PROTOC_URL} -o "protoc-${PROTOC_VERSION}.zip"
unzip "protoc-${PROTOC_VERSION}.zip" -d protoc
rm "protoc-${PROTOC_VERSION}.zip"

# Run protoc
echo "running protoc..."
./protoc/bin/protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out=$GENERATED_TYPES_DIR \
  ./google/api/*.proto \
  ./rpc.proto

# Cleanup downloaded proto directory/files
rm -rf ./rpc.proto protoc
