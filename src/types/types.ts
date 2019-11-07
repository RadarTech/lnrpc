import grpc, { ChannelCredentials, GrpcObject } from 'grpc';

export interface SubscriptionMethod {
  name: string;
  skipEmptyArgDefault?: boolean;
}

export interface ConnectionConfig {
  grpcPkgObj: GrpcObject;
  server: string;
  credentials: ChannelCredentials;
}

export interface GrpcServiceConfig extends ConnectionConfig {
  service: any;
  subscriptionMethods?: SubscriptionMethod[];
}

export interface RpcClientConfig {
  cert?: Buffer | string;
  certEncoding?: string;
  tlsPath?: string;
  macaroon?: Buffer | string;
  macaroonPath?: string;
}

export interface ChainRpcConfig extends RpcClientConfig {
  chainNotifier?: any;
}
