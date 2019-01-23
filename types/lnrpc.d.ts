import {
  AbandonChannelRequest,
  AbandonChannelResponse,
  AddInvoiceResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  ChanInfoRequest,
  ChannelBalanceRequest,
  ChannelBalanceResponse,
  ChannelEdge,
  ChannelGraph,
  ChannelGraphRequest,
  ChannelPoint,
  ClosedChannelsRequest,
  ClosedChannelsResponse,
  ConnectPeerRequest,
  ConnectPeerResponse,
  DebugLevelRequest,
  DebugLevelResponse,
  DeleteAllPaymentsRequest,
  DeleteAllPaymentsResponse,
  DisconnectPeerRequest,
  DisconnectPeerResponse,
  FeeReportRequest,
  FeeReportResponse,
  ForwardingHistoryRequest,
  ForwardingHistoryResponse
  GenSeedRequest,
  GenSeedResponse,
  GetInfoRequest,
  GetInfoResponse,
  GetTransactionsRequest,
  GraphTopologySubscription,
  GraphTopologyUpdate,
  InitWalletRequest,
  InitWalletResponse,
  Invoice,
  InvoiceSubscription,
  ListChannelsRequest,
  ListChannelsResponse,
  ListInvoiceRequest,
  ListInvoiceResponse,
  ListPaymentsRequest,
  ListPaymentsResponse,
  ListPeersRequest,
  ListPeersResponse,
  NetworkInfo,
  NetworkInfoRequest,
  NewAddressRequest,
  NewAddressResponse,
  NodeInfo,
  NodeInfoRequest,
  OpenChannelRequest,
  OpenStatusUpdate,
  PaymentHash,
  PayReq,
  PayReqString,
  PendingChannelsRequest,
  PendingChannelsResponse,
  PolicyUpdateRequest,
  PolicyUpdateResponse,
  QueryRoutesRequest,
  QueryRoutesResponse,
  SendCoinsRequest,
  SendCoinsResponse,
  SendManyRequest,
  SendManyResponse,
  SendRequest,
  SendResponse,
  SendToRouteRequest,
  SignMessageRequest,
  SignMessageResponse,
  StopRequest,
  StopResponse,
  Transaction,
  TransactionDetails,
  UnlockWalletRequest,
  UnlockWalletResponse,
  VerifyMessageRequest,
  VerifyMessageResponse,
  WalletBalanceRequest,
  WalletBalanceResponse,
} from "./generated/rpc_pb";

export class LnRpc {
  public genSeed(args: GenSeedRequest.AsObject): Promise<GenSeedResponse.AsObject>;
  public initWallet(args: InitWalletRequest.AsObject): Promise<InitWalletResponse.AsObject>;
  public unlockWallet(args: UnlockWalletRequest.AsObject): Promise<UnlockWalletResponse.AsObject>;
  public changePassword(args: ChangePasswordRequest.AsObject): Promise<ChangePasswordResponse.AsObject>;
  public walletBalance(args: WalletBalanceRequest.AsObject): Promise<WalletBalanceResponse.AsObject>;
  public channelBalance(args: ChannelBalanceRequest.AsObject): Promise<ChannelBalanceResponse.AsObject>;
  public getTransactions(args: GetTransactionsRequest.AsObject): Promise<TransactionDetails.AsObject>;
  public sendCoins(args: SendCoinsRequest.AsObject): Promise<SendCoinsResponse.AsObject>;
  public subscribeTransactions(args: GetTransactionsRequest.AsObject): Promise<Transaction.AsObject>;
  public sendMany(args: SendManyRequest.AsObject): Promise<SendManyResponse.AsObject>;
  public newAddress(args: NewAddressRequest.AsObject): Promise<NewAddressResponse.AsObject>;
  public signMessage(args: SignMessageRequest.AsObject): Promise<SignMessageResponse.AsObject>;
  public verifyMessage(args: VerifyMessageRequest.AsObject): Promise<VerifyMessageResponse.AsObject>;
  public connectPeer(args: ConnectPeerRequest.AsObject): Promise<ConnectPeerResponse.AsObject>;
  public disconnectPeer(args: DisconnectPeerRequest.AsObject): Promise<DisconnectPeerResponse.AsObject>;
  public listPeers(args: ListChannelsRequest.AsObject): Promise<ListPeersResponse.AsObject>;
  public getInfo(args: GetInfoRequest.AsObject): Promise<GetInfoResponse.AsObject>;
  public pendingChannels(args: PendingChannelsRequest.AsObject): Promise<PendingChannelsResponse.AsObject>;
  public listChannels(args: ListChannelsRequest.AsObject): Promise<ListChannelsResponse.AsObject>;
  public closedChannels(args: ClosedChannelsRequest.AsObject): Promise<ClosedChannelsResponse.AsObject>;
  public openChannelSync(args: OpenChannelRequest.AsObject): Promise<ChannelPoint.AsObject>;
  public openChannel(args: OpenChannelRequest.AsObject): Promise<OpenStatusUpdate.AsObject>;
  public abandonChannel(args: AbandonChannelRequest.AsObject): Promise<AbandonChannelResponse.AsObject>;
  public sendPayment(args: SendRequest.AsObject): Promise<SendResponse.AsObject>;
  public sendPaymentSync(args: SendRequest.AsObject): Promise<SendResponse.AsObject>;
  public sendToRoute(args: SendToRouteRequest.AsObject): Promise<SendResponse.AsObject>;
  public sendToRouteSync(args: SendToRouteRequest.AsObject): Promise<SendResponse.AsObject>;
  public addInvoice(args: Invoice.AsObject): Promise<AddInvoiceResponse.AsObject>;
  public listInvoices(args: ListInvoiceRequest.AsObject): Promise<ListInvoiceResponse.AsObject>;
  public lookupInvoice(args: PaymentHash.AsObject): Promise<Invoice.AsObject>;
  public subscribeInvoices(args: InvoiceSubscription.AsObject): Promise<Invoice.AsObject>;
  public decodePayReq(args: PayReqString.AsObject): Promise<PayReq.AsObject>;
  public listPayments(args: ListChannelsRequest.AsObject): Promise<ListPaymentsResponse.AsObject>;
  public deleteAllPayments(args: DeleteAllPaymentsRequest.AsObject): Promise<DeleteAllPaymentsResponse.AsObject>;
  public describeGraph(args: ChannelGraphRequest.AsObject): Promise<ChannelGraph.AsObject>;
  public getChanInfo(args: ChanInfoRequest.AsObject): Promise<ChannelEdge.AsObject>;
  public getNodeInfo(args: NodeInfoRequest.AsObject): Promise<NodeInfo.AsObject>;
  public queryRoutes(args: QueryRoutesRequest.AsObject): Promise<QueryRoutesResponse.AsObject>;
  public getNetworkInfo(args: NetworkInfoRequest.AsObject): Promise<NetworkInfo.AsObject>;
  public stopDaemon(args: StopResponse.AsObject): Promise<StopResponse.AsObject>;
  public subscribeChannelGraph(args: GraphTopologySubscription.AsObject): Promise<GraphTopologyUpdate.AsObject>;
  public debugLevel(args: DebugLevelRequest.AsObject): Promise<DebugLevelResponse.AsObject>;
  public feeReport(args: FeeReportRequest.AsObject): Promise<FeeReportResponse.AsObject>;
  public updateChannelPolicy(args: PolicyUpdateRequest.AsObject): Promise<PolicyUpdateResponse.AsObject>;
  public forwardingHistory(args: ForwardingHistoryRequest.AsObject): Promise<ForwardingHistoryResponse.AsObject>;
}
