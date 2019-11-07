import * as grpcLoader from '@grpc/proto-loader';
import grpc, { ChannelCredentials, GrpcObject } from 'grpc';

export type GrpcLoader = typeof grpcLoader;

export type Grpc = typeof grpc;

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

export interface GrpcObjectConfig {
  protoFilePath: string;
  grpcLoader: GrpcLoader;
  grpc: Grpc;
}

export interface RpcClientConfig {
  server?: string; // URL for the lightning node to connect to ie. localhost:10009
  tls?: string | false; // /path/to/tls.cert or false to disable certificate pinning
  cert?: Buffer | string; // string or buffer representation of tls.cert
  macaroonPath?: string;
  macaroon?: Buffer | string; // hex-encoded string of macaroon file
  certEncoding?: string; // Default to utf-8
  grpcLoader?: GrpcLoader;
  grpc?: Grpc;
}

export interface ChainRpcConfig extends RpcClientConfig {
  chainNotifier?: any;
}

export interface LnRpcConfig extends RpcClientConfig {
  lightning?: any;
  walletUnlocker?: any;
}
