# RPC Servers
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/rpc.proto --create-dirs -o lnd/${npm_package_config_lnd_release_tag}/rpc.proto
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/autopilotrpc/autopilot.proto --create-dirs -o lnd/${npm_package_config_lnd_release_tag}/autopilotrpc/autopilot.proto
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/chainrpc/chainnotifier.proto --create-dirs -o lnd/${npm_package_config_lnd_release_tag}/chainrpc/chainnotifier.proto
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/invoicesrpc/invoices.proto --create-dirs -o lnd/${npm_package_config_lnd_release_tag}/invoicesrpc/invoices.proto
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/routerrpc/router.proto --create-dirs -o lnd/${npm_package_config_lnd_release_tag}/routerrpc/router.proto
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/signrpc/signer.proto --create-dirs -o lnd/${npm_package_config_lnd_release_tag}/signrpc/signer.proto
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/walletrpc/walletkit.proto --create-dirs -o lnd/${npm_package_config_lnd_release_tag}/walletrpc/walletkit.proto
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/watchtowerrpc/watchtower.proto --create-dirs -o lnd/${npm_package_config_lnd_release_tag}/watchtowerrpc/watchtower.proto
curl ${npm_package_config_lnd_url}/${npm_package_config_lnd_release_tag}/lnrpc/wtclientrpc/wtclient.proto --create-dirs -o lnd/${npm_package_config_lnd_release_tag}/wtclientrpc/wtclient.proto
