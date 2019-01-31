import { Stream } from "stream";
import Gen from "./generated/rpc_pb";

// Overwrite specific properties
type Overwrite<T1, T2> = {
  [P in Exclude<keyof T1, keyof T2>]: T1[P]
} & T2;

export type GenSeedRequest = Partial<Gen.GenSeedRequest.AsObject>;
export type GenSeedResponse = Gen.GenSeedResponse.AsObject;
export type InitWalletRequest = Overwrite<Gen.InitWalletRequest.AsObject, {
  aezeedPassphrase?: Uint8Array | string,
  recoveryWindow?: number,
}>;
export type InitWalletResponse = Gen.InitWalletResponse.AsObject;
export type UnlockWalletRequest = Overwrite<Gen.UnlockWalletRequest.AsObject, {
  recoveryWindow?: number,
}>;
export type UnlockWalletResponse = Gen.UnlockWalletResponse.AsObject;
export type ChangePasswordRequest = Gen.ChangePasswordRequest.AsObject;
export type ChangePasswordResponse = Gen.ChangePasswordResponse.AsObject;
export type WalletBalanceRequest = Gen.WalletBalanceRequest.AsObject;
export type WalletBalanceResponse = Gen.WalletBalanceResponse.AsObject;
export type ChannelBalanceRequest = Gen.ChannelBalanceRequest.AsObject;
export type ChannelBalanceResponse = Gen.ChannelBalanceResponse.AsObject;
export type GetTransactionsRequest = Gen.GetTransactionsRequest.AsObject;
export type TransactionDetails = Gen.TransactionDetails.AsObject;
export type SendCoinsRequest = Overwrite<Gen.SendCoinsRequest.AsObject, {
  targetConf?: number,
  satPerByte?: string,
}>;
export type SendCoinsResponse = Gen.SendCoinsResponse.AsObject;
export type SendManyRequest = Overwrite<Gen.SendManyRequest.AsObject, {
  targetConf?: number,
  satPerByte?: string,
}>;
export type SendManyResponse = Gen.SendManyResponse.AsObject;
export type NewAddressRequest = Partial<Gen.NewAddressRequest.AsObject>;
export type NewAddressResponse = Gen.NewAddressResponse.AsObject;
export type SignMessageRequest = Gen.SignMessageRequest.AsObject;
export type SignMessageResponse = Gen.SignMessageResponse.AsObject;
export type VerifyMessageRequest = Gen.VerifyMessageRequest.AsObject;
export type VerifyMessageResponse = Gen.VerifyMessageResponse.AsObject;
export type ConnectPeerRequest = Overwrite<Gen.ConnectPeerRequest.AsObject, {
  perm?: boolean,
}>;
export type ConnectPeerResponse = Gen.ConnectPeerResponse.AsObject;
export type DisconnectPeerRequest = Gen.DisconnectPeerRequest.AsObject;
export type DisconnectPeerResponse = Gen.DisconnectPeerResponse.AsObject;
export type ListPeersRequest = Gen.ListPeersRequest.AsObject;
export type ListPeersResponse = Gen.ListPeersResponse.AsObject;
export type GetInfoRequest = Gen.GetInfoRequest.AsObject;
export type GetInfoResponse = Gen.GetInfoResponse.AsObject;
export type PendingChannelsRequest = Gen.PendingChannelsRequest.AsObject;
export type PendingChannelsResponse = Gen.PendingChannelsResponse.AsObject;
export type ListChannelsRequest = Partial<Gen.ListChannelsRequest.AsObject>;
export type ListChannelsResponse = Gen.ListChannelsResponse.AsObject;
export type ClosedChannelsRequest = Partial<Gen.ClosedChannelsRequest.AsObject>;
export type ClosedChannelsResponse = Gen.ClosedChannelsResponse.AsObject;
export type OpenChannelRequest = Partial<Gen.OpenChannelRequest.AsObject>;
export type ChannelPoint = Gen.ChannelPoint.AsObject;
export type CloseChannelRequest = Overwrite<Gen.CloseChannelRequest.AsObject, {
  force?: boolean,
  targetConf?: number,
  satPerByte?: string,
}>;
export type AbandonChannelRequest = Gen.AbandonChannelRequest.AsObject;
export type AbandonChannelResponse = Gen.AbandonChannelResponse.AsObject;
export type SendRequest = Partial<Gen.SendRequest.AsObject>;
export type SendResponse = Gen.SendResponse.AsObject;
export type SendToRouteRequest = Partial<Gen.SendToRouteRequest.AsObject>;
export type Invoice = Partial<Gen.Invoice.AsObject>;
export type AddInvoiceResponse = Gen.AddInvoiceResponse.AsObject;
export type ListInvoiceRequest = Partial<Gen.ListInvoiceRequest.AsObject>;
export type ListInvoiceResponse = Gen.ListInvoiceResponse.AsObject;
export type PaymentHash = Partial<Gen.PaymentHash.AsObject>;
export type InvoiceSubscription = Gen.InvoiceSubscription.AsObject;
export type PayReqString = Gen.PayReqString.AsObject;
export type PayReq = Gen.PayReq.AsObject;
export type ListPaymentsRequest = Gen.ListPaymentsRequest.AsObject;
export type ListPaymentsResponse = Gen.ListPaymentsResponse.AsObject;
export type DeleteAllPaymentsRequest = Gen.DeleteAllPaymentsRequest.AsObject;
export type DeleteAllPaymentsResponse = Gen.DeleteAllPaymentsResponse.AsObject;
export type ChannelGraphRequest = Partial<Gen.ChannelGraphRequest.AsObject>;
export type ChannelGraph = Gen.ChannelGraph.AsObject;
export type ChanInfoRequest = Gen.ChanInfoRequest.AsObject;
export type ChannelEdge = Gen.ChannelEdge.AsObject;
export type NodeInfoRequest = Gen.NodeInfoRequest.AsObject;
export type NodeInfo = Gen.NodeInfo.AsObject;
export type QueryRoutesRequest = Overwrite<Gen.QueryRoutesRequest.AsObject, {
  amt?: string,
  numRoutes?: number,
  finalCltvDelta?: number,
}>;
export type QueryRoutesResponse = Gen.QueryRoutesResponse.AsObject;
export type NetworkInfoRequest = Gen.NetworkInfoRequest.AsObject;
export type NetworkInfo = Gen.NetworkInfo.AsObject;
export type StopRequest = Gen.StopRequest.AsObject;
export type StopResponse = Gen.StopResponse.AsObject;
export type GraphTopologySubscription = Gen.GraphTopologySubscription.AsObject;
export type DebugLevelRequest = Overwrite<Gen.DebugLevelRequest.AsObject, {
  show?: boolean,
}>;
export type DebugLevelResponse = Gen.DebugLevelResponse.AsObject;
export type FeeReportRequest = Gen.FeeReportRequest.AsObject;
export type FeeReportResponse = Gen.FeeReportResponse.AsObject;
export type PolicyUpdateRequest = Overwrite<Gen.PolicyUpdateRequest.AsObject, {
  global?: boolean,
}>;
export type PolicyUpdateResponse = Gen.PolicyUpdateResponse.AsObject;
export type ForwardingHistoryRequest = Partial<Gen.ForwardingHistoryRequest.AsObject>;
export type ForwardingHistoryResponse = Gen.ForwardingHistoryResponse.AsObject;

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
  public initWallet(args: InitWalletRequest): Promise<InitWalletResponse>;

  /**
   * unlockWallet is used at startup of lnd to provide a password to unlock the wallet database.
   */
  public unlockWallet(args: UnlockWalletRequest): Promise<UnlockWalletResponse>;

  /**
   * changePassword changes the password of the encrypted wallet. This will automatically unlock the wallet
   * database if successful.
   */
  public changePassword(args: ChangePasswordRequest): Promise<ChangePasswordResponse>;

  /**
   * walletBalance returns total unspent outputs(confirmed and unconfirmed), all confirmed unspent outputs and all
   * unconfirmed unspent outputs under control of the wallet.
   */
  public walletBalance(args: WalletBalanceRequest): Promise<WalletBalanceResponse>;

  /**
   * channelBalance returns the total funds available across all open channels in satoshis.
   */
  public channelBalance(args: ChannelBalanceRequest): Promise<ChannelBalanceResponse>;

  /**
   * getTransactions returns a list describing all the known transactions relevant to the wallet.
   */
  public getTransactions(args: GetTransactionsRequest): Promise<TransactionDetails>;

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
  public subscribeTransactions(args: GetTransactionsRequest): Promise<Stream>;

  /**
   * sendMany handles a request for a transaction that creates multiple specified outputs in parallel. If neither
   * targetConf, or satPerByte are set, then the internal wallet will consult its fee model to determine a fee
   * for the default confirmation target.
   */
  public sendMany(args: SendManyRequest): Promise<SendManyResponse>;

  /**
   * newAddress creates a new address under control of the local wallet.
   */
  public newAddress(args: NewAddressRequest): Promise<NewAddressResponse>;

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
  public connectPeer(args: ConnectPeerRequest): Promise<ConnectPeerResponse>;

  /**
   * disconnectPeer attempts to disconnect one peer from another identified by a given pubKey. In the case that we
   * currently have a pending or active channel with the target peer, then this action will be not be allowed.
   */
  public disconnectPeer(args: DisconnectPeerRequest): Promise<DisconnectPeerResponse>;

  /**
   * listPeers returns a verbose listing of all currently active peers.
   */
  public listPeers(args: ListPeersRequest): Promise<ListPeersResponse>;

  /**
   * getInfo returns general information concerning the lightning node including it’s identity pubkey, alias, the
   * chains it is connected to, and information concerning the number of open+pending channels.
   */
  public getInfo(args: GetInfoRequest): Promise<GetInfoResponse>;

  /**
   * pendingChannels returns a list of all the channels that are currently considered “pending”. A channel is
   * pending if it has finished the funding workflow and is waiting for confirmations for the funding txn, or is in
   * the process of closure, either initiated cooperatively or non-cooperatively.
   */
  public pendingChannels(args: PendingChannelsRequest): Promise<PendingChannelsResponse>;

  /**
   * listChannels returns a description of all the open channels that this node is a participant in.
   */
  public listChannels(args: ListChannelsRequest): Promise<ListChannelsResponse>;

  /**
   * closedChannels returns a description of all the closed channels that this node was a participant in.
   */
  public closedChannels(args: ClosedChannelsRequest): Promise<ClosedChannelsResponse>;

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
  public openChannel(args: OpenChannelRequest): Promise<Stream>;

  /**
   * closeChannel attempts to close an active channel identified by its channel outpoint (ChannelPoint). The
   * actions of this method can additionally be augmented to attempt a force close after a timeout period in the
   * case of an inactive peer. If a non-force close (cooperative closure) is requested, then the user can specify
   * either a target number of blocks until the closure transaction is confirmed, or a manual fee rate. If neither
   * are specified, then a default lax, block confirmation target is used.
   */
  public closeChannel(args: CloseChannelRequest): Promise<Stream>;

  /**
   * abandonChannel removes all channel state from the database except for a close summary. This method can be used
   * to get rid of permanently unusable channels due to bugs fixed in newer versions of lnd. Only available when in
   * debug builds of lnd.
   */
  public abandonChannel(args: AbandonChannelRequest): Promise<AbandonChannelResponse>;

  /**
   * sendPayment dispatches a bi-directional streaming RPC for sending payments through the Lightning Network. A
   * single RPC invocation creates a persistent bi-directional stream allowing clients to rapidly send payments
   * through the Lightning Network with a single persistent connection.
   */
  public sendPayment(args: SendRequest): Promise<Stream>;

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
  public sendToRoute(args: SendToRouteRequest): Promise<Stream>;

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
  public listInvoices(args: ListInvoiceRequest): Promise<ListInvoiceResponse>;

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
  public subscribeInvoices(args: InvoiceSubscription): Promise<Stream>;

  /**
   * decodePayReq takes an encoded payment request string and attempts to decode it, returning a full description
   * of the conditions encoded within the payment request.
   */
  public decodePayReq(args: PayReqString): Promise<PayReq>;

  /**
   * listPayments returns a list of all outgoing payments.
   */
  public listPayments(args: ListPaymentsRequest): Promise<ListPaymentsResponse>;

  /**
   * deleteAllPayments deletes all outgoing payments from DB.
   */
  public deleteAllPayments(args: DeleteAllPaymentsRequest): Promise<DeleteAllPaymentsResponse>;

  /**
   * describeGraph returns a description of the latest graph state from the point of view of the node. The graph
   * information is partitioned into two components: all the nodes/vertexes, and all the edges that connect the
   * vertexes themselves. As this is a directed graph, the edges also contain the node directional specific routing
   * policy which includes: the time lock delta, fee information, etc.
   */
  public describeGraph(args: ChannelGraphRequest): Promise<ChannelGraph>;

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
  public getNetworkInfo(args: NetworkInfoRequest): Promise<NetworkInfo>;

  /**
   * stopDaemon will send a shutdown request to the interrupt handler, triggering a graceful shutdown of the daemon.
   */
  public stopDaemon(args: StopRequest): Promise<StopResponse>;

  /**
   * subscribeChannelGraph launches a streaming RPC that allows the caller to receive notifications upon any
   * changes to the channel graph topology from the point of view of the responding node. Events notified include:
   * new nodes coming online, nodes updating their authenticated attributes, new channels being advertised, updates
   * in the routing policy for a directional channel edge, and when channels are closed on-chain.
   */
  public subscribeChannelGraph(args: GraphTopologySubscription): Promise<Stream>;

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
  public feeReport(args: FeeReportRequest): Promise<FeeReportResponse>;

  /**
   * updateChannelPolicy allows the caller to update the fee schedule and channel policies for all channels globally,
   * or a particular channel.
   */
  public updateChannelPolicy(args: PolicyUpdateRequest): Promise<PolicyUpdateResponse>;

  /**
   * forwardingHistory allows the caller to query the htlcswitch for a record of all HTLC’s forwarded within the
   * target time range, and integer offset within that time range. If no time-range is specified, then the first
   * chunk of the past 24 hrs of forwarding history are returned. A list of forwarding events are returned. The
   * size of each forwarding event is 40 bytes, and the max message size able to be returned in gRPC is 4 MiB. As a
   * result each message can only contain 50k entries. Each response has the index offset of the last entry. The
   * index offset can be provided to the request to allow the caller to skip a series of records.
   */
  public forwardingHistory(args: ForwardingHistoryRequest): Promise<ForwardingHistoryResponse>;
}
