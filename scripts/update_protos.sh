mkdir -p lnd/${npm_package_config_lnd_release_tag}
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/rpc.proto -o lnd/${npm_package_config_lnd_release_tag}/rpc.proto
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/autopilotrpc/autopilot.proto -o lnd/${npm_package_config_lnd_release_tag}/autopilot.proto
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/chainrpc/chainnotifier.proto -o lnd/${npm_package_config_lnd_release_tag}/chainnotifier.proto
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/invoicesrpc/invoices.proto -o lnd/${npm_package_config_lnd_release_tag}/invoices.proto
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/routerrpc/router.proto -o lnd/${npm_package_config_lnd_release_tag}/router.proto
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/signrpc/signer.proto -o lnd/${npm_package_config_lnd_release_tag}/signer.proto
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/walletrpc/walletkit.proto -o lnd/${npm_package_config_lnd_release_tag}/walletkit.proto
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/watchtowerrpc/watchtower.proto -o lnd/${npm_package_config_lnd_release_tag}/watchtower.proto
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/wtclientrpc/wtclient.proto -o lnd/${npm_package_config_lnd_release_tag}/wtclient.proto
