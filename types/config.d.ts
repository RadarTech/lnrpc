export interface LnRpcClientConfig {
  server: string; // URL for the lightning node to connect to ie. localhost:10009
  tls?: string; // /path/to/tls.cert
  cert?: string; // string representation of tls.cert
  macaroonPath?: string;
  macaroon?: string; // hex-encoded string of macaroon file
  lightning?: object;
  walletUnlocker?: object;
  grpcLoader?: any;
  grpc?: any;
}
