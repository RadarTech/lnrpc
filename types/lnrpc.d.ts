import { 
  GetInfoRequest,
  GetInfoResponse,
  ListPeersRequest,
  ListPeersResponse,
  GenSeedRequest,
  GenSeedResponse,
  InitWalletRequest, 
  InitWalletResponse,
  UnlockWalletRequest,
  UnlockWalletResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  WalletBalanceRequest,
  WalletBalanceResponse,
  ChannelBalanceRequest,
  ChannelBalanceResponse,
  GetTransactionsRequest,
  TransactionDetails,
  SendCoinsRequest,
  SendCoinsResponse,
  Transaction,
  SendManyRequest,
  SendManyResponse,
  NewAddressRequest,
  NewAddressResponse,
  SignMessageRequest,
  SignMessageResponse,
  VerifyMessageRequest,
  VerifyMessageResponse,
  ConnectPeerRequest,
  ConnectPeerResponse,
  DisconnectPeerRequest,
  DisconnectPeerResponse,
  PendingChannelsRequest,
  PendingChannelsResponse,
  ListChannelsRequest,
  ListChannelsResponse,
  ClosedChannelsRequest,
  ClosedChannelsResponse,
  OpenChannelRequest,
  ChannelPoint,
  OpenStatusUpdate,
  AbandonChannelRequest,
  AbandonChannelResponse,
  SendRequest,
  SendResponse,
  SendToRouteRequest,
  Invoice,
  AddInvoiceResponse,
  ListInvoiceRequest,
  ListInvoiceResponse,
  PaymentHash,
  InvoiceSubscription,
  PayReqString,
  PayReq,
  ListPaymentsRequest,
  ListPaymentsResponse,
  DeleteAllPaymentsRequest,
  DeleteAllPaymentsResponse,
  ChannelGraphRequest,
  ChannelGraph,
  ChanInfoRequest,
  ChannelEdge,
  NodeInfoRequest,
  NodeInfo,
  QueryRoutesRequest,
  QueryRoutesResponse,
  NetworkInfoRequest,
  NetworkInfo,
  StopRequest,
  StopResponse,
  GraphTopologySubscription,
  GraphTopologyUpdate,
  DebugLevelRequest,
  DebugLevelResponse,
  FeeReportRequest,
  FeeReportResponse,
  PolicyUpdateRequest,
  PolicyUpdateResponse,
  ForwardingHistoryRequest,
  ForwardingHistoryResponse
} from "./generated/rpc_pb";

export class LnRpc {
  public genSeed(args: GenSeedRequest.AsObject): Promise<GenSeedResponse.AsObject>;
  public initWallet(args: InitWalletRequest.AsObject): Promise<InitWalletResponse.AsObject>;
  public unlockWallet(args: UnlockWalletRequest.AsObject): Promise<UnlockWalletResponse.AsObject>;
  public changePassword(args: ChangePasswordRequest.AsObject): Promise<ChangePasswordResponse.AsObject>;
  public walletBalance(): Promise<WalletBalanceResponse.AsObject>;
  public channelBalance(args: ChannelBalanceRequest.AsObject): Promise<ChannelBalanceResponse.AsObject>;
  public getTransactions(): Promise<TransactionDetails.AsObject>;
  public sendCoins(args: SendCoinsRequest.AsObject): Promise<SendCoinsResponse.AsObject>;
  public subscribeTransactions(): Promise<Transaction.AsObject>;
  public sendMany(args: SendManyRequest.AsObject): Promise<SendManyResponse.AsObject>;
  public newAddress(args: NewAddressRequest.AsObject): Promise<NewAddressResponse.AsObject>;
  public signMessage(args: SignMessageRequest.AsObject): Promise<SignMessageResponse.AsObject>;
  public verifyMessage(args: VerifyMessageRequest.AsObject): Promise<VerifyMessageResponse.AsObject>;
  public connectPeer(args: ConnectPeerRequest.AsObject): Promise<ConnectPeerResponse.AsObject>;
  public disconnectPeer(args: DisconnectPeerRequest.AsObject): Promise<DisconnectPeerResponse.AsObject>;
  public listPeers(): Promise<ListPeersResponse.AsObject>;
  public getInfo(): Promise<GetInfoResponse.AsObject>;
  public pendingChannels(): Promise<PendingChannelsResponse.AsObject>;
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
  public listPayments(): Promise<ListPaymentsResponse.AsObject>;
  public deleteAllPayments(): Promise<DeleteAllPaymentsResponse.AsObject>;
  public describeGraph(args: ChannelGraphRequest.AsObject): Promise<ChannelGraph.AsObject>;
  public getChanInfo(args: ChanInfoRequest.AsObject): Promise<ChannelEdge.AsObject>;
  public getNodeInfo(args: NodeInfoRequest.AsObject): Promise<NodeInfo.AsObject>;
  public queryRoutes(args: QueryRoutesRequest.AsObject): Promise<QueryRoutesResponse.AsObject>;
  public getNetworkInfo(): Promise<NetworkInfo.AsObject>;
  public stopDaemon(): Promise<StopResponse.AsObject>;
  public subscribeChannelGraph(): Promise<GraphTopologyUpdate.AsObject>;
  public debugLevel(args: DebugLevelRequest.AsObject): Promise<DebugLevelResponse.AsObject>;
  public feeReport(): Promise<FeeReportResponse.AsObject>;
  public updateChannelPolicy(args: PolicyUpdateRequest.AsObject): Promise<PolicyUpdateResponse.AsObject>;
  public forwardingHistory(args: ForwardingHistoryRequest.AsObject): Promise<ForwardingHistoryResponse.AsObject>;
}
