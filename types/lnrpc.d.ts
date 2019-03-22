import { Readable, Writable } from "stream";

export enum AddressType {
  WITNESS_PUBKEY_HASH = 0,
  NESTED_PUBKEY_HASH = 1,
}

export enum ClosureType {
  COOPERATIVE_CLOSE = 0,
  LOCAL_FORCE_CLOSE = 1,
  REMOTE_FORCE_CLOSE = 2,
  BREACH_CLOSE = 3,
  FUNDING_CANCELED = 4,
  ABANDONED = 5,
}

export interface Transaction {
  txHash: string;
  amount: string;
  numConfirmations: number;
  blockHash: string;
  blockHeight: number;
  timeStamp: string;
  totalFees: string;
  destAddresses: string[];
}

export interface LightningAddress {
  pubkey: string;
  host: string;
}

export interface Peer {
  pubKey: string;
  address: string;
  bytesSent: string;
  bytesRecv: string;
  satSent: string;
  satRecv: string;
  inbound: boolean;
  pingTime: string;
}

export interface PendingHTLC {
  incoming: boolean;
  amount: string;
  outpoint: string;
  maturityHeight: number;
  blocksTilMaturity: number;
  stage: number;
}

export interface HTLC {
  incoming: boolean;
  amount: string;
  hashLock: Uint8Array | string;
  expirationHeight: number;
}

export interface PendingChannel {
  remoteNodePub: string;
  channelPoint: string;
  capacity: string;
  localBalance: string;
  remoteBalance: string;
}

export interface PendingOpenChannel {
  channel?: PendingChannel;
  confirmationHeight: number;
  commitFee: string;
  commitWeight: string;
  feePerKw: string;
}

export interface ClosedChannel {
  channel?: PendingChannel;
  closingTxid: string;
}

export interface ForceClosedChannel {
  channel?: PendingChannel;
  closingTxid: string;
  limboBalance: string;
  maturityHeight: number;
  blocksTilMaturity: number;
  recoveredBalance: string;
  pendingHtlcs: PendingHTLC[];
}

export interface WaitingCloseChannel {
  channel?: PendingChannel;
  limboBalance: string;
}

export interface Channel {
  active: boolean;
  remotePubkey: string;
  channelPoint: string;
  chanId: string;
  capacity: string;
  localBalance: string;
  remoteBalance: string;
  commitFee: string;
  commitWeight: string;
  feePerKw: string;
  unsettledBalance: string;
  totalSatoshisSent: string;
  totalSatoshisReceived: string;
  numUpdates: string;
  pendingHtlcs: HTLC[];
  csvDelay: number;
  pb_private: boolean;
}

export interface ChannelCloseSummary {
  channelPoint: string;
  chanId: string;
  chainHash: string;
  closingTxHash: string;
  remotePubkey: string;
  capacity: string;
  closeHeight: number;
  settledBalance: string;
  timeLockedBalance: string;
  closeType: ClosureType;
}

export interface FeeLimit {
  fixed: string;
  percent: string;
}

export interface Hop {
  chanId: string;
  chanCapacity: string;
  amtToForward: string;
  fee: string;
  expiry: number;
  amtToForwardMsat: string;
  feeMsat: string;
  pubKey: string;
}

export interface Route {
  totalTimeLock: number;
  totalFees: string;
  totalAmt: string;
  hops: Hop[];
  totalFeesMsat: string;
  totalAmtMsat: string;
}

export interface HopHint {
  nodeId: string;
  chanId: string;
  feeBaseMsat: number;
  feeProportionalMillionths: number;
  cltvExpiryDelta: number;
}

export interface RouteHint {
  hopHints: HopHint[];
}

export interface Payment {
  paymentHash: string;
  value: string;
  creationDate: string;
  path: string[];
  fee: string;
  paymentPreimage: string;
  valueSat: string;
  valueMsat: string;
}

export interface NodeAddress {
  network: string;
  addr: string;
}

export interface LightningNode {
  lastUpdate: number;
  pubKey: string;
  alias: string;
  addresses: NodeAddress;
  color: string;
}

export interface RoutingPolicy {
  timeLockDelta: number;
  minHtlc: string;
  feeBaseMsat: string;
  feeRateMilliMsat: string;
  disabled: boolean;
}

export interface ChannelFeeReport {
  chanPoint: string;
  baseFeeMsat: string;
  feePerMil: string;
  feeRate: number;
}

export interface ForwardingEvent {
  timestamp: string;
  chanIdIn: string;
  chanIdOut: string;
  amtIn: string;
  amtOut: string;
  fee: string;
}

export interface GenSeedRequest {
  aezeedPassphrase?: Uint8Array | string;
  seedEntropy?: Uint8Array | string;
}

export interface GenSeedResponse {
  cipherSeedMnemonic: string[];
  encipheredSeed: Uint8Array | string;
}

export interface InitWalletRequest {
  walletPassword: Uint8Array | string;
  cipherSeedMnemonic: string[];
  aezeedPassphrase?: Uint8Array | string;
  recoveryWindow?: number;
}

export interface UnlockWalletRequest {
  walletPassword: Uint8Array | string;
  recoveryWindow?: number;
}

export interface ChangePasswordRequest {
  currentPassword: Uint8Array | string;
  newPassword: Uint8Array | string;
}

export interface WalletBalanceResponse {
  totalBalance: string;
  confirmedBalance: string;
  unconfirmedBalance: string;
}

export interface ChannelBalanceResponse {
  balance: string;
  pendingOpenBalance: string;
}

export interface TransactionDetails {
  transactions: Transaction[];
}

export interface SendCoinsRequest {
  addr: string;
  amount: string;
  targetConf?: number;
  satPerByte?: string;
}

export interface SendCoinsResponse {
  txid: string;
}

export interface SendManyRequest {
  addrtoamountMap: Array<[string, number]>;
  targetConf?: number;
  satPerByte?: string;
}

export interface SendManyResponse {
  txid: string;
}

export interface NewAddressRequest {
  type?: AddressType;
}

export interface NewAddressResponse {
  address: string;
}

export interface SignMessageRequest {
  msg: Uint8Array | string;
}

export interface SignMessageResponse {
  signature: string;
}

export interface VerifyMessageRequest {
  msg: Uint8Array | string;
  signature: string;
}

export interface VerifyMessageResponse {
  valid: boolean;
  pubkey: string;
}

export interface ConnectPeerRequest {
  addr?: LightningAddress;
  perm?: boolean;
}

export interface DisconnectPeerRequest {
  pubKey: string;
}

export interface ListPeersResponse {
  peers: Peer[];
}

export interface GetInfoResponse {
  identityPubkey: string;
  alias: string;
  numPendingChannels: number;
  numActiveChannels: number;
  numPeers: number;
  blockHeight: number;
  blockHash: string;
  syncedToChain: boolean;
  testnet: boolean;
  chains: string[];
  uris: string[];
  bestHeaderTimestamp: string;
  version: string;
  numInactiveChannels: number;
}

export interface PendingChannelsResponse {
  totalLimboBalance: string;
  pendingOpenChannels: PendingOpenChannel[];
  pendingClosingChannels: ClosedChannel[];
  pendingForceClosingChannels: ForceClosedChannel[];
  waitingCloseChannels: WaitingCloseChannel[];
}

export interface ListChannelsRequest {
  activeOnly?: boolean;
  inactiveOnly?: boolean;
  publicOnly?: boolean;
  privateOnly?: boolean;
}

export interface ListChannelsResponse {
  channels: Channel[];
}

export interface ClosedChannelsRequest {
  cooperative?: boolean;
  localForce?: boolean;
  remoteForce?: boolean;
  breach?: boolean;
  fundingCanceled?: boolean;
  abandoned?: boolean;
}

export interface ClosedChannelsResponse {
  channels: ChannelCloseSummary[];
}

export interface OpenChannelRequest {
  nodePubkey?: Uint8Array | string;
  nodePubkeyString?: string;
  localFundingAmount?: string;
  pushSat?: string;
  targetConf?: number;
  satPerByte?: string;
  pb_private?: boolean;
  minHtlcMsat?: string;
  remoteCsvDelay?: number;
  minConfs?: number;
  spendUnconfirmed?: boolean;
}

export interface ChannelPoint {
  fundingTxidBytes: Uint8Array | string;
  fundingTxidStr: string;
  outputIndex: number;
}

export interface CloseChannelRequest {
  channelPoint: ChannelPoint;
  force?: boolean;
  targetConf?: number;
  satPerByte?: string;
}

export interface AbandonChannelRequest {
  channelPoint?: ChannelPoint;
}

export interface SendRequest {
  dest?: Uint8Array | string;
  destString?: string;
  amt?: string;
  paymentHash?: Uint8Array | string;
  paymentHashString?: string;
  paymentRequest?: string;
  finalCltvDelta?: number;
  feeLimit?: FeeLimit;
}

export interface SendResponse {
  paymentError: string;
  paymentPreimage: Uint8Array | string;
  paymentRoute?: Route;
}

export interface SendToRouteRequest {
  paymentHash?: Uint8Array | string;
  paymentHashString?: string;
  routes?: Route[];
}

export interface Invoice {
  memo?: string;
  receipt?: Uint8Array | string;
  rPreimage?: Uint8Array | string;
  rHash?: Uint8Array | string;
  value?: string;
  settled?: boolean;
  creationDate?: string;
  settleDate?: string;
  paymentRequest?: string;
  descriptionHash?: Uint8Array | string;
  expiry?: string;
  fallbackAddr?: string;
  cltvExpiry?: string;
  routeHints?: RouteHint[];
  pb_private?: boolean;
  addIndex?: string;
  settleIndex?: string;
  amtPaid?: string;
  amtPaidSat?: string;
  amtPaidMsat?: string;
}

export interface AddInvoiceResponse {
  rHash: Uint8Array | string;
  paymentRequest: string;
  addIndex: string;
}

export interface ListInvoiceRequest {
  pendingOnly?: boolean;
  indexOffset?: string;
  numMaxInvoices?: string;
  reversed?: boolean;
}

export interface ListInvoiceResponse {
  invoices: Invoice[];
  lastIndexOffset: string;
  firstIndexOffset: string;
}

export interface PaymentHash {
  rHashStr?: string;
  rHash?: Uint8Array | string;
}

export interface InvoiceSubscription {
  addIndex?: string;
  settleIndex?: string;
}

export interface PayReqString {
  payReq: string;
}

export interface PayReq {
  destination: string;
  paymentHash: string;
  numSatoshis: string;
  timestamp: string;
  expiry: string;
  description: string;
  descriptionHash: string;
  fallbackAddr: string;
  cltvExpiry: string;
  routeHints?: RouteHint[];
}

export interface ListPaymentsResponse {
  payments: Payment[];
}

export interface ChannelGraphRequest {
  includeUnannounced?: boolean;
}

export interface ChannelGraph {
  nodes: LightningNode[];
  edges: ChannelEdge[];
}

export interface ChanInfoRequest {
  chanId: string;
}

export interface ChannelEdge {
  channelId: string;
  chanPoint: string;
  lastUpdate: number;
  node1Pub: string;
  node2Pub: string;
  capacity: string;
  node1Policy?: RoutingPolicy;
  node2Policy?: RoutingPolicy;
}

export interface NodeInfoRequest {
  pubKey: string;
}

export interface NodeInfo {
  node?: LightningNode;
  numChannels: number;
  totalCapacity: string;
}

export interface QueryRoutesRequest {
  pubKey: string;
  amt?: string;
  numRoutes?: number;
  finalCltvDelta?: number;
  feeLimit?: FeeLimit;
}

export interface QueryRoutesResponse {
  routes: Route[];
}

export interface NetworkInfo {
  graphDiameter: number;
  avgOutDegree: number;
  maxOutDegree: number;
  numNodes: number;
  numChannels: number;
  totalNetworkCapacity: string;
  avgChannelSize: number;
  minChannelSize: string;
  maxChannelSize: string;
}

export interface DebugLevelRequest {
  show?: boolean;
  levelSpec: string;
}

export interface DebugLevelResponse {
  subSystems: string;
}

export interface FeeReportResponse {
  channelFees: ChannelFeeReport[];
  dayFeeSum: string;
  weekFeeSum: string;
  monthFeeSum: string;
}

export interface PolicyUpdateRequest {
  global?: boolean;
  chanPoint?: ChannelPoint;
  baseFeeMsat: string;
  feeRate: number;
  timeLockDelta: number;
}

export interface ForwardingHistoryRequest {
  startTime?: string;
  endTime?: string;
  indexOffset?: number;
  numMaxEvents?: number;
}

export interface ForwardingHistoryResponse {
  forwardingEvents: ForwardingEvent[];
  lastOffsetIndex: number;
}

/**
 * LND gRPC API Client
 */
export class LnRpc {
  /**
   * genSeed is the first method that should be used to instantiate a new lnd instance. This method allows a caller
   * to generate a new aezeed cipher seed given an optional passphrase. If provided, the passphrase will be
   * necessary to decrypt the cipherseed to expose the internal wallet seed. Once the cipherseed is obtained and
   * verified by the user, the initWallet method should be used to commit the newly generated seed, and create the
   * wallet.
   */
  public genSeed(args: GenSeedRequest): Promise<GenSeedResponse>;

  /**
   *
   * initWallet is used when lnd is starting up for the first time to fully initialize the daemon and its internal
   * wallet. At the very least a wallet password must be provided. This will be used to encrypt sensitive material
   * on disk. In the case of a recovery scenario, the user can also specify their aezeed mnemonic and passphrase.
   * If set, then the daemon will use this prior state to initialize its internal wallet. Alternatively, this can
   * be used along with the genSeed RPC to obtain a seed, then present it to the user. Once it has been verified by
   * the user, the seed can be fed into this RPC in order to commit the new wallet.
   */
  public initWallet(args: InitWalletRequest): Promise<{}>;

  /**
   * unlockWallet is used at startup of lnd to provide a password to unlock the wallet database.
   */
  public unlockWallet(args: UnlockWalletRequest): Promise<{}>;

  /**
   * changePassword changes the password of the encrypted wallet. This will automatically unlock the wallet
   * database if successful.
   */
  public changePassword(args: ChangePasswordRequest): Promise<{}>;

  /**
   * walletBalance returns total unspent outputs(confirmed and unconfirmed), all confirmed unspent outputs and all
   * unconfirmed unspent outputs under control of the wallet.
   */
  public walletBalance(args?: {}): Promise<WalletBalanceResponse>;

  /**
   * channelBalance returns the total funds available across all open channels in satoshis.
   */
  public channelBalance(args?: {}): Promise<ChannelBalanceResponse>;

  /**
   * getTransactions returns a list describing all the known transactions relevant to the wallet.
   */
  public getTransactions(args?: {}): Promise<TransactionDetails>;

  /**
   * sendCoins executes a request to send coins to a particular address. Unlike sendMany, this RPC call only allows
   * creating a single output at a time. If neither targetConf, or satPerByte are set, then the internal wallet
   * will consult its fee model to determine a fee for the default confirmation target.
   */
  public sendCoins(args: SendCoinsRequest): Promise<SendCoinsResponse>;

  /**
   * subscribeTransactions creates a uni-directional stream from the server to the client in which any newly
   * discovered transactions relevant to the wallet are sent over.
   */
  public subscribeTransactions(args?: {}): Promise<Readable>;

  /**
   * sendMany handles a request for a transaction that creates multiple specified outputs in parallel. If neither
   * targetConf, or satPerByte are set, then the internal wallet will consult its fee model to determine a fee
   * for the default confirmation target.
   */
  public sendMany(args: SendManyRequest): Promise<SendManyResponse>;

  /**
   * newAddress creates a new address under control of the local wallet.
   */
  public newAddress(args?: NewAddressRequest): Promise<NewAddressResponse>;

  /**
   * signMessage signs a message with this node’s private key. The returned signature string is zbase32 encoded and
   * pubkey recoverable, meaning that only the message digest and signature are needed for verification.
   */
  public signMessage(args: SignMessageRequest): Promise<SignMessageResponse>;

  /**
   * verifyMessage verifies a signature over a msg. The signature must be zbase32 encoded and signed by an active
   * node in the resident node’s channel database. In addition to returning the validity of the signature,
   * verifyMessage also returns the recovered pubkey from the signature.
   */
  public verifyMessage(args: VerifyMessageRequest): Promise<VerifyMessageResponse>;

  /**
   * connectPeer attempts to establish a connection to a remote peer. This is at the networking level, and is used
   * for communication between nodes. This is distinct from establishing a channel with a peer.
   */
  public connectPeer(args: ConnectPeerRequest): Promise<{}>;

  /**
   * disconnectPeer attempts to disconnect one peer from another identified by a given pubKey. In the case that we
   * currently have a pending or active channel with the target peer, then this action will be not be allowed.
   */
  public disconnectPeer(args: DisconnectPeerRequest): Promise<{}>;

  /**
   * listPeers returns a verbose listing of all currently active peers.
   */
  public listPeers(args?: {}): Promise<ListPeersResponse>;

  /**
   * getInfo returns general information concerning the lightning node including it’s identity pubkey, alias, the
   * chains it is connected to, and information concerning the number of open+pending channels.
   */
  public getInfo(args?: {}): Promise<GetInfoResponse>;

  /**
   * pendingChannels returns a list of all the channels that are currently considered “pending”. A channel is
   * pending if it has finished the funding workflow and is waiting for confirmations for the funding txn, or is in
   * the process of closure, either initiated cooperatively or non-cooperatively.
   */
  public pendingChannels(args?: {}): Promise<PendingChannelsResponse>;

  /**
   * listChannels returns a description of all the open channels that this node is a participant in.
   */
  public listChannels(args?: ListChannelsRequest): Promise<ListChannelsResponse>;

  /**
   * closedChannels returns a description of all the closed channels that this node was a participant in.
   */
  public closedChannels(args?: ClosedChannelsRequest): Promise<ClosedChannelsResponse>;

  /**
   * openChannelSync is a synchronous version of the openChannel RPC call. This call is meant to be consumed by
   * clients to the REST proxy. As with all other sync calls, all byte slices are intended to be populated as hex
   * encoded strings.
   */
  public openChannelSync(args: OpenChannelRequest): Promise<ChannelPoint>;

  /**
   * openChannel attempts to open a singly funded channel specified in the request to a remote peer. Users are able
   * to specify a target number of blocks that the funding transaction should be confirmed in, or a manual fee rate
   * to us for the funding transaction. If neither are specified, then a lax block confirmation target is used.
   */
  public openChannel(args: OpenChannelRequest): Promise<Readable>;

  /**
   * closeChannel attempts to close an active channel identified by its channel outpoint (ChannelPoint). The
   * actions of this method can additionally be augmented to attempt a force close after a timeout period in the
   * case of an inactive peer. If a non-force close (cooperative closure) is requested, then the user can specify
   * either a target number of blocks until the closure transaction is confirmed, or a manual fee rate. If neither
   * are specified, then a default lax, block confirmation target is used.
   */
  public closeChannel(args: CloseChannelRequest): Promise<Readable>;

  /**
   * abandonChannel removes all channel state from the database except for a close summary. This method can be used
   * to get rid of permanently unusable channels due to bugs fixed in newer versions of lnd. Only available when in
   * debug builds of lnd.
   */
  public abandonChannel(args: AbandonChannelRequest): Promise<{}>;

  /**
   * sendPayment dispatches a bi-directional streaming RPC for sending payments through the Lightning Network. A
   * single RPC invocation creates a persistent bi-directional stream allowing clients to rapidly send payments
   * through the Lightning Network with a single persistent connection.
   */
  public sendPayment(args: SendRequest): Promise<Writable>;

  /**
   * sendPaymentSync is the synchronous non-streaming version of sendPayment. This RPC is intended to be consumed
   * by clients of the REST proxy. Additionally, this RPC expects the destination’s public key and the payment hash
   * (if any) to be encoded as hex strings.
   */
  public sendPaymentSync(args: SendRequest): Promise<SendResponse>;

  /**
   * sendToRoute is a bi-directional streaming RPC for sending payment through the Lightning Network. This method
   * differs from SendPayment in that it allows users to specify a full route manually. This can be used for things
   * like rebalancing, and atomic swaps.
   */
  public sendToRoute(args: SendToRouteRequest): Promise<Writable>;

  /**
   * sendToRouteSync is a synchronous version of sendToRoute. It Will block until the payment either fails or succeeds.
   */
  public sendToRouteSync(args: SendToRouteRequest): Promise<SendResponse>;

  /**
   * addInvoice attempts to add a new invoice to the invoice database. Any duplicated invoices are rejected, therefore
   * all invoices must have a unique payment preimage.
   */
  public addInvoice(args: Invoice): Promise<AddInvoiceResponse>;

  /**
   * listInvoices returns a list of all the invoices currently stored within the database. Any active debug
   * invoices are ignored. It has full support for paginated responses, allowing users to query for specific
   * invoices through their addIndex. This can be done by using either the firstIndexOffset or lastIndexOffset
   * fields included in the response as the indexOffset of the next request. The reversed flag is set by default
   * in order to paginate backwards. If you wish to paginate forwards, you must explicitly set the flag to false.
   * If none of the parameters are specified, then the last 100 invoices will be returned.
   */
  public listInvoices(args?: ListInvoiceRequest): Promise<ListInvoiceResponse>;

  /**
   * lookupInvoice attempts to look up an invoice according to its payment hash. The passed payment hash must
   * be exactly 32 bytes, if not, an error is returned.
   */
  public lookupInvoice(args: PaymentHash): Promise<Invoice>;

  /**
   * subscribeInvoices returns a uni-directional stream (server -> client) for notifying the client of newly
   * added/settled invoices. The caller can optionally specify the addIndex and/or the settleIndex. If the
   * addIndex is specified, then we’ll first start by sending add invoice events for all invoices with an
   * addIndex greater than the specified value. If the settleIndex is specified, the next, we’ll send out all
   * settle events for invoices with a settleIndex greater than the specified value. One or both of these fields
   * can be set. If no fields are set, then we’ll only send out the latest add/settle events.
   */
  public subscribeInvoices(args?: InvoiceSubscription): Promise<Readable>;

  /**
   * decodePayReq takes an encoded payment request string and attempts to decode it, returning a full description
   * of the conditions encoded within the payment request.
   */
  public decodePayReq(args: PayReqString): Promise<PayReq>;

  /**
   * listPayments returns a list of all outgoing payments.
   */
  public listPayments(args?: {}): Promise<ListPaymentsResponse>;

  /**
   * deleteAllPayments deletes all outgoing payments from DB.
   */
  public deleteAllPayments(args?: {}): Promise<{}>;

  /**
   * describeGraph returns a description of the latest graph state from the point of view of the node. The graph
   * information is partitioned into two components: all the nodes/vertexes, and all the edges that connect the
   * vertexes themselves. As this is a directed graph, the edges also contain the node directional specific routing
   * policy which includes: the time lock delta, fee information, etc.
   */
  public describeGraph(args?: ChannelGraphRequest): Promise<ChannelGraph>;

  /**
   * getChanInfo returns the latest authenticated network announcement for the given channel identified by its
   * channel ID: an 8-byte integer which uniquely identifies the location of transaction’s funding output within
   * the blockchain.
   */
  public getChanInfo(args: ChanInfoRequest): Promise<ChannelEdge>;

  /**
   * getNodeInfo returns the latest advertised, aggregated, and authenticated channel information for the specified
   * node identified by its public key.
   */
  public getNodeInfo(args: NodeInfoRequest): Promise<NodeInfo>;

  /**
   * queryRoutes attempts to query the daemon’s Channel Router for a possible route to a target destination capable
   * of carrying a specific amount of satoshis. The retuned route contains the full details required to craft and
   * send an HTLC, also including the necessary information that should be present within the Sphinx packet
   * encapsulated within the HTLC.
   */
  public queryRoutes(args: QueryRoutesRequest): Promise<QueryRoutesResponse>;

  /**
   * getNetworkInfo returns some basic stats about the known channel graph from the point of view of the node.
   */
  public getNetworkInfo(args?: {}): Promise<NetworkInfo>;

  /**
   * stopDaemon will send a shutdown request to the interrupt handler, triggering a graceful shutdown of the daemon.
   */
  public stopDaemon(args?: {}): Promise<{}>;

  /**
   * subscribeChannelGraph launches a streaming RPC that allows the caller to receive notifications upon any
   * changes to the channel graph topology from the point of view of the responding node. Events notified include:
   * new nodes coming online, nodes updating their authenticated attributes, new channels being advertised, updates
   * in the routing policy for a directional channel edge, and when channels are closed on-chain.
   */
  public subscribeChannelGraph(args?: {}): Promise<Readable>;

  /**
   * debugLevel allows a caller to programmatically set the logging verbosity of lnd. The logging can be targeted
   * according to a coarse daemon-wide logging level, or in a granular fashion to specify the logging for a target
   * sub-system.
   */
  public debugLevel(args: DebugLevelRequest): Promise<DebugLevelResponse>;

  /**
   * feeReport allows the caller to obtain a report detailing the current fee schedule enforced by the node globally
   * for each channel.
   */
  public feeReport(args?: {}): Promise<FeeReportResponse>;

  /**
   * updateChannelPolicy allows the caller to update the fee schedule and channel policies for all channels globally,
   * or a particular channel.
   */
  public updateChannelPolicy(args: PolicyUpdateRequest): Promise<{}>;

  /**
   * forwardingHistory allows the caller to query the htlcswitch for a record of all HTLC’s forwarded within the
   * target time range, and integer offset within that time range. If no time-range is specified, then the first
   * chunk of the past 24 hrs of forwarding history are returned. A list of forwarding events are returned. The
   * size of each forwarding event is 40 bytes, and the max message size able to be returned in gRPC is 4 MiB. As a
   * result each message can only contain 50k entries. Each response has the index offset of the last entry. The
   * index offset can be provided to the request to allow the caller to skip a series of records.
   */
  public forwardingHistory(args?: ForwardingHistoryRequest): Promise<ForwardingHistoryResponse>;
}
