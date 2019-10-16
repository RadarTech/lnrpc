mkdir -p lnd/${npm_package_config_lnd_release_tag}
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/rpc.proto -o lnd/${npm_package_config_lnd_release_tag}/rpc.proto
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/routerrpc/router.proto -o lnd/${npm_package_config_lnd_release_tag}/router.proto
