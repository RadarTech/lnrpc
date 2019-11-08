#!/bin/bash -x
# Generate typescript definitions and service definitions from proto file

set -e

LND_RELEASE_TAG=$1
PROTOC_VERSION=$2

# Sanitize all proto files prior to type generation
rm -f *.proto
ts-node scripts/proto-sanitizer.ts "lnd/${LND_RELEASE_TAG}/**/*.proto"

# Copy google definitions
cp -r google/. lnd/${npm_package_config_lnd_release_tag}/google

GENERATED_TYPES_DIR=src/types/generated
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
protoc/bin/protoc \
  --proto_path=lnd/${LND_RELEASE_TAG} \
  --plugin=protoc-gen-ts=node_modules/.bin/protoc-gen-ts \
  --ts_out=$GENERATED_TYPES_DIR \
  google/api/annotations.proto \
  google/api/http.proto \
  rpc.proto \
  autopilotrpc/autopilot.proto \
  chainrpc/chainnotifier.proto \
  invoicesrpc/invoices.proto \
  routerrpc/router.proto \
  signrpc/signer.proto \
  walletrpc/walletkit.proto \
  watchtowerrpc/watchtower.proto \
  wtclientrpc/wtclient.proto

# Cleanup proto directory/files
rm -rf *.proto protoc lnd/${npm_package_config_lnd_release_tag}/google

# Remove 'List' from all generated Array type names
ts-node scripts/clean-repeated.ts
