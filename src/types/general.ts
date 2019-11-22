import * as grpcLoader from '@grpc/proto-loader';
import grpc, { ChannelCredentials, Client, GrpcObject } from 'grpc';

export type GrpcLoader = typeof grpcLoader;

export type Grpc = typeof grpc;

export interface SubscriptionMethod {
  name: string;
  skipEmptyArgDefault?: boolean;
}

export interface NestedGrpcObject {
  [index: string]: {
    [index: string]: typeof Client;
  };
}

export interface ConnectionConfig {
  grpcPkgObj: NestedGrpcObject;
  server: string;
  credentials: ChannelCredentials;
}

export interface GrpcServiceConfig extends ConnectionConfig {
  service: any;
  subscriptionMethods?: SubscriptionMethod[];
}

export interface GrpcObjectConfig {
  protoFilePath: string;
  includeDirs?: string[];
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

export interface AutopilotRpcClientConfig extends RpcClientConfig {
  autopilot?: any;
}

export interface ChainRpcClientConfig extends RpcClientConfig {
  chainNotifier?: any;
}

export interface InvoicesRpcClientConfig extends RpcClientConfig {
  invoices?: any;
}

export interface RouterRpcClientConfig extends RpcClientConfig {
  router?: any;
}

export interface SignRpcClientConfig extends RpcClientConfig {
  signer?: any;
}

export interface WalletRpcClientConfig extends RpcClientConfig {
  walletKit?: any;
}

export interface WatchtowerRpcClientConfig extends RpcClientConfig {
  watchtower?: any;
}

export interface WtClientRpcClientConfig extends RpcClientConfig {
  watchtowerClient?: any;
}

export interface LnRpcClientConfig extends RpcClientConfig {
  lightning?: any;
  walletUnlocker?: any;
}
