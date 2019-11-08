export interface StatusResponse {
  active: boolean;
}

export interface ModifyStatusRequest {
  enable: boolean;
}

export interface QueryScoresRequest {
  pubkeys: string[];
  ignoreLocalState?: boolean;
}

export interface HeuristicResult {
  heuristic: string;
  scoresMap: Array<[string, number]>;
}

export interface QueryScoresResponse {
  results: HeuristicResult[];
}

export interface SetScoresRequest {
  heuristic: string;
  scoresMap: Array<[string, number]>;
}

/**
 * LND Autopilot gRPC API Client
 */
export interface AutopilotRpc {
  /**
   * status returns whether the daemon's autopilot agent is active.
   */
  status(args?: {}): Promise<StatusResponse>;

  /**
   * modifyStatus is used to modify the status of the autopilot agent, like
   * enabling or disabling it.
   */
  modifyStatus(args: ModifyStatusRequest): Promise<{}>;

  /**
   * queryScores queries all available autopilot heuristics, in addition to any
   * active combination of these heuristics, for the scores they would give to
   * the given nodes.
   */
  queryScores(args: QueryScoresRequest): Promise<QueryScoresResponse>;

  /**
   * setScores attempts to set the scores used by the running autopilot agent,
   * if the external scoring heuristic is enabled.
   */
  setScores(args: SetScoresRequest): Promise<{}>;
}
