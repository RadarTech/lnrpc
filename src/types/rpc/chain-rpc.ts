import { Readable } from '../streams';

export interface ConfRequest {
  txid?: Buffer | string;
  script?: Buffer | string;
  numConfs?: number;
  heightHint?: number;
}

export interface ConfDetails {
  rawTx: Buffer | string;
  blockHash: Buffer | string;
  blockHeight: number;
  txIndex: number;
}

export interface ConfEvent {
  conf?: ConfDetails;
  reorg?: {}; // Not implemented
}

export interface Outpoint {
  hash: Buffer | string;
  index: number;
}

export interface SpendRequest {
  outpoint?: Outpoint;
  script?: Buffer | string;
  heightHint?: number;
}

export interface SpendDetails {
  spendingOutpoint?: Outpoint;
  rawSpendingTx: Buffer | string;
  spendingTxHash: Buffer | string;
  spendingInputIndex: number;
  spendingHeight: number;
}

export interface SpendEvent {
  spend?: SpendDetails;
  reorg?: {}; // Not implemented
}

export interface BlockEpoch {
  hash?: Buffer | string;
  height?: number;
}

/**
 * LND Chain gRPC API Client
 */
export interface ChainRpc {
  /**
   * registerConfirmationsNtfn is a synchronous response-streaming RPC that
   * registers an intent for a client to be notified once a confirmation request
   * has reached its required number of confirmations on-chain.
   * A client can specify whether the confirmation request should be for a
   * particular transaction by its hash or for an output script by specifying a
   * zero hash.
   */
  registerConfirmationsNtfn(args: ConfRequest): Readable<ConfEvent>;

  /**
   * registerSpendNtfn is a synchronous response-streaming RPC that registers an
   * intent for a client to be notification once a spend request has been spent
   * by a transaction that has confirmed on-chain.
   * A client can specify whether the spend request should be for a particular
   * outpoint  or for an output script by specifying a zero outpoint.
   */
  registerSpendNtfn(args: SpendRequest): Readable<SpendEvent>;

  /**
   * registerBlockEpochNtfn is a synchronous response-streaming RPC that
   * registers an intent for a client to be notified of blocks in the chain. The
   * stream will return a hash and height tuple of a block for each new/stale
   * block in the chain. It is the client's responsibility to determine whether
   * the tuple returned is for a new or stale block in the chain.
   * A client can also request a historical backlog of blocks from a particular
   * point. This allows clients to be idempotent by ensuring that they do not
   * missing processing a single block within the chain.
   */
  registerBlockEpochNtfn(args: BlockEpoch): Readable<BlockEpoch>;
}
