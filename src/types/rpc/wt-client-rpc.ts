export interface AddTowerRequest {
  pubkey: Buffer | string;
  address?: string;
}

export interface RemoveTowerRequest {
  pubkey: Buffer | string;
  address?: string;
}

export interface ListTowersRequest {
  includeSessions?: boolean;
}

export interface TowerSession {
  numBackups: number;
  numPendingBackups: number;
  maxBackups: number;
  sweepSatPerByte: number;
}

export interface Tower {
  pubkey: Buffer | string;
  addresses: string;
  activeSessionCandidate: boolean;
  numSessions: number;
  sessions: TowerSession[];
}

export interface ListTowersResponse {
  towers: Tower[];
}

export interface GetTowerInfoRequest {
  pubkey: Buffer | string;
  includeSessions?: boolean;
}

export interface StatsResponse {
  numBackups: number;
  numPendingBackups: number;
  numFailedBackups: number;
  numSessionsAcquired: number;
  numSessionsExhausted: number;
}

export interface PolicyResponse {
  maxUpdates: number;
  sweepSatPerByte: number;
}

/**
 * LND WtClient gRPC API Client
 */
export interface WtClientRpc {
  /*
   * addTower adds a new watchtower reachable at the given address and
   * considers it for new sessions. If the watchtower already exists, then
   * any new addresses included will be considered when dialing it for
   * session negotiations and backups.
   */
  addTower(args: AddTowerRequest): Promise<{}>;

  /*
   * removeTower removes a watchtower from being considered for future session
   * negotiations and from being used for any subsequent backups until it's added
   * again. If an address is provided, then this RPC only serves as a way of
   * removing the address from the watchtower instead.
   */
  removeTower(args: RemoveTowerRequest): Promise<{}>;

  /**
   * listTowers returns the list of watchtowers registered with the client.
   */
  listTowers(args?: ListTowersRequest): Promise<ListTowersResponse>;

  /**
   * getTowerInfo retrieves information for a registered watchtower.
   */
  getTowerInfo(args: GetTowerInfoRequest): Promise<Tower>;

  /**
   * stats returns the in-memory statistics of the client since startup.
   */
  stats(args?: {}): Promise<StatsResponse>;

  /**
   * policy returns the active watchtower client policy configuration.
   */
  policy(args?: {}): Promise<PolicyResponse>;
}
