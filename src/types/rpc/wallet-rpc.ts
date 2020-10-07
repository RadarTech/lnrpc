import { OutPoint, TransactionDetails, Utxo } from './ln-rpc';
import { KeyDescriptor, KeyLocator, TxOut } from './sign-rpc';

export enum WitnessType {
  UNKNOWN_WITNESS = 0,
  COMMITMENT_TIME_LOCK = 1,
  COMMITMENT_NO_DELAY = 2,
  COMMITMENT_REVOKE = 3,
  HTLC_OFFERED_REVOKE = 4,
  HTLC_ACCEPTED_REVOKE = 5,
  HTLC_OFFERED_TIMEOUT_SECOND_LEVEL = 6,
  HTLC_ACCEPTED_SUCCESS_SECOND_LEVEL = 7,
  HTLC_OFFERED_REMOTE_TIMEOUT = 8,
  HTLC_ACCEPTED_REMOTE_SUCCESS = 9,
  HTLC_SECOND_LEVEL_REVOKE = 10,
  WITNESS_KEY_HASH = 11,
  NESTED_WITNESS_KEY_HASH = 12,
  COMMITMENT_ANCHOR = 13,
}

export enum SweepsCase {
  SWEEPS_NOT_SET = 0,
  TRANSACTION_DETAILS = 1,
  TRANSACTION_IDS = 2,
}

export interface ListUnspentRequest {
  minConfs?: number;
  maxConfs?: number;
}

export interface ListUnspentResponse {
  utxos: Utxo[];
}

export interface LeaseOutputRequest {
  id: Buffer | string;
  outpoint?: OutPoint;
}

export interface LeaseOutputResponse {
  expiration: number;
}

export interface ReleaseOutputRequest {
  id: Buffer | string;
  outpoint?: OutPoint;
}

export interface KeyReq {
  keyFingerPrint: number;
  keyFamily: number;
}

export interface AddrResponse {
  addr: string;
}

export interface Tx {
  txHex: Buffer | string;
  label?: string;
}

export interface PublishResponse {
  publishError?: string;
}

export interface SendOutputsRequest {
  satPerKw: number;
  outputs: TxOut[];
  label?: string;
}

export interface SendOutputsResponse {
  rawTx: Buffer | string;
}

export interface EstimateFeeReq {
  confTarget: number;
}

export interface EstimateFeeResp {
  satPerKw: number;
}

export interface PendingSweep {
  outpoint?: OutPoint;
  witnessType: WitnessType;
  amountSat: number;
  satPerByte: number;
  broadcastAttempts: number;
  nextBroadcastHeight: number;
  requestedConfTarget: number;
  requestedSatPerByte: number;
  force: boolean;
}

export interface PendingSweepsResponse {
  pendingSweeps: PendingSweep[];
}

export interface BumpFeeRequest {
  outpoint: OutPoint;
  targetConf?: number;
  satPerByte?: number;
  force?: boolean;
}

export interface ListSweepsRequest {
  verbose?: boolean;
}

export interface TransactionIDs {
  transactionIds: string[];
}

export interface ListSweepsResponse {
  transactionDetails?: TransactionDetails;
  transactionIds?: TransactionIDs;
}

export interface LabelTransactionRequest {
  txid: Buffer | string;
  label: string;
  overwrite?: boolean;
}

/**
 * LND Wallet gRPC API Client
 */
export interface WalletRpc {
  /**
   * listUnspent returns a list of all utxos spendable by the wallet with a
   * number of confirmations between the specified minimum and maximum.
   */
  listUnspent(args?: ListUnspentRequest): Promise<ListUnspentResponse>;

  /**
   * leaseOutput locks an output to the given ID, preventing it from being
   * available for any future coin selection attempts. The absolute time of the
   * lock's expiration is returned. The expiration of the lock can be extended by
   * successive invocations of this RPC. Outputs can be unlocked before their
   * expiration through `ReleaseOutput`.
   */
  leaseOutput(args: LeaseOutputRequest): Promise<LeaseOutputResponse>;

  /**
   * releaseOutput unlocks an output, allowing it to be available for coin
   * selection if it remains unspent. The ID should match the one used to
   * originally lock the output.
   */
  releaseOutput(args?: ReleaseOutputRequest): Promise<{}>;

  /**
   * deriveNextKey attempts to derive the *next* key within the key family
   * (account in BIP43) specified. This method should return the next external
   * child within this branch.
   */
  deriveNextKey(args: KeyReq): Promise<KeyDescriptor>;

  /**
   * deriveKey attempts to derive an arbitrary key specified by the passed
   * KeyLocator.
   */
  deriveKey(args: KeyLocator): Promise<KeyDescriptor>;

  /**
   * nextAddr returns the next unused address within the wallet.
   */
  nextAddr(args?: {}): Promise<AddrResponse>;

  /**
   * publishTransaction attempts to publish the passed transaction to the
   * network. Once this returns without an error, the wallet will continually
   * attempt to re-broadcast the transaction on start up, until it enters the
   * chain.
   */
  publishTransaction(args: Tx): Promise<PublishResponse>;

  /**
   * sendOutputs is similar to the existing sendmany call in Bitcoind, and
   * allows the caller to create a transaction that sends to several outputs at
   * once. This is ideal when wanting to batch create a set of transactions.
   */
  sendOutputs(args: SendOutputsRequest): Promise<SendOutputsResponse>;

  /**
   * estimateFee attempts to query the internal fee estimator of the wallet to
   * determine the fee (in sat/kw) to attach to a transaction in order to
   * achieve the confirmation target.
   */
  estimateFee(args: EstimateFeeReq): Promise<EstimateFeeResp>;

  /*
   * pendingSweeps returns lists of on-chain outputs that lnd is currently
   * attempting to sweep within its central batching engine. Outputs with similar
   * fee rates are batched together in order to sweep them within a single
   * transaction.
   * NOTE: Some of the fields within PendingSweepsRequest are not guaranteed to
   * remain supported. This is an advanced API that depends on the internals of
   * the UtxoSweeper, so things may change.
   */
  pendingSweeps(args?: {}): Promise<PendingSweepsResponse>;

  /*
   * bumpFee bumps the fee of an arbitrary input within a transaction. This RPC
   * takes a different approach than bitcoind's bumpfee command. lnd has a
   * central batching engine in which inputs with similar fee rates are batched
   * together to save on transaction fees. Due to this, we cannot rely on
   * bumping the fee on a specific transaction, since transactions can change at
   * any point with the addition of new inputs. The list of inputs that
   * currently exist within lnd's central batching engine can be retrieved
   * through the PendingSweeps RPC.
   * When bumping the fee of an input that currently exists within lnd's central
   * batching engine, a higher fee transaction will be created that replaces the
   * lower fee transaction through the Replace-By-Fee (RBF) policy. If it
   * This RPC also serves useful when wanting to perform a Child-Pays-For-Parent
   * (CPFP), where the child transaction pays for its parent's fee. This can be
   * done by specifying an outpoint within the low fee transaction that is under
   * the control of the wallet.
   * The fee preference can be expressed either as a specific fee rate or a delta
   * of blocks in which the output should be swept on-chain within. If a fee
   * preference is not explicitly specified, then an error is returned.
   * Note that this RPC currently doesn't perform any validation checks on the
   * fee preference being provided. For now, the responsibility of ensuring that
   * the new fee preference is sufficient is delegated to the user.
   */
  bumpFee(args: BumpFeeRequest): Promise<{}>;

  /**
   * listSweeps returns a list of the sweep transactions our node has produced.
   * Note that these sweeps may not be confirmed yet, as we record sweeps on
   * broadcast, not confirmation.
   */
  listSweeps(args?: ListSweepsRequest): Promise<ListSweepsResponse>;

  /**
   * labelTransaction adds a label to a transaction. If the transaction already
   * has a label the call will fail unless the overwrite bool is set. This will
   * overwrite the exiting transaction label. Labels must not be empty, and
   * cannot exceed 500 characters.
   */
  labelTransaction(args: LabelTransactionRequest): Promise<{}>;
}
