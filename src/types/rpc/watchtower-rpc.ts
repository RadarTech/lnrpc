export interface GetInfoResp {
  pubkey: Buffer | string;
  listeners: string[];
  uris: string[];
}

/**
 * LND Watchtower gRPC API Client
 */
export interface WatchtowerRpc {
  /**
   * getInfo returns general information concerning the companion watchtower
   * including it's public key and URIs where the server is currently
   * listening for clients.
   * lncli: tower info
   */
  getInfo(args?: {}): Promise<GetInfoResp>;
}
