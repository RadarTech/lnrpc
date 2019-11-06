import { ChannelCredentials, GrpcObject } from 'grpc';

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
