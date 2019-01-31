import Gen from './generated/rpc_pb';
import { Stream } from 'stream';

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

export class LnRpc {
  public genSeed(args: GenSeedRequest): Promise<GenSeedResponse>;
  public initWallet(args: InitWalletRequest): Promise<InitWalletResponse>;
  public unlockWallet(args: UnlockWalletRequest): Promise<UnlockWalletResponse>;
  public changePassword(args: ChangePasswordRequest): Promise<ChangePasswordResponse>;
  public walletBalance(args: WalletBalanceRequest): Promise<WalletBalanceResponse>;
  public channelBalance(args: ChannelBalanceRequest): Promise<ChannelBalanceResponse>;
  public getTransactions(args: GetTransactionsRequest): Promise<TransactionDetails>;
  public sendCoins(args: SendCoinsRequest): Promise<SendCoinsResponse>;
  public subscribeTransactions(args: GetTransactionsRequest): Promise<Stream>;
  public sendMany(args: SendManyRequest): Promise<SendManyResponse>;
  public newAddress(args: NewAddressRequest): Promise<NewAddressResponse>;
  public signMessage(args: SignMessageRequest): Promise<SignMessageResponse>;
  public verifyMessage(args: VerifyMessageRequest): Promise<VerifyMessageResponse>;
  public connectPeer(args: ConnectPeerRequest): Promise<ConnectPeerResponse>;
  public disconnectPeer(args: DisconnectPeerRequest): Promise<DisconnectPeerResponse>;
  public listPeers(args: ListPeersRequest): Promise<ListPeersResponse>;
  public getInfo(args: GetInfoRequest): Promise<GetInfoResponse>;
  public pendingChannels(args: PendingChannelsRequest): Promise<PendingChannelsResponse>;
  public listChannels(args: ListChannelsRequest): Promise<ListChannelsResponse>;
  public closedChannels(args: ClosedChannelsRequest): Promise<ClosedChannelsResponse>;
  public openChannelSync(args: OpenChannelRequest): Promise<ChannelPoint>;
  public openChannel(args: OpenChannelRequest): Promise<Stream>;
  public abandonChannel(args: AbandonChannelRequest): Promise<AbandonChannelResponse>;
  public sendPayment(args: SendRequest): Promise<Stream>;
  public sendPaymentSync(args: SendRequest): Promise<SendResponse>;
  public sendToRoute(args: SendToRouteRequest): Promise<Stream>;
  public sendToRouteSync(args: SendToRouteRequest): Promise<SendResponse>;
  public addInvoice(args: Invoice): Promise<AddInvoiceResponse>;
  public listInvoices(args: ListInvoiceRequest): Promise<ListInvoiceResponse>;
  public lookupInvoice(args: PaymentHash): Promise<Invoice>;
  public subscribeInvoices(args: InvoiceSubscription): Promise<Stream>;
  public decodePayReq(args: PayReqString): Promise<PayReq>;
  public listPayments(args: ListPaymentsRequest): Promise<ListPaymentsResponse>;
  public deleteAllPayments(args: DeleteAllPaymentsRequest): Promise<DeleteAllPaymentsResponse>;
  public describeGraph(args: ChannelGraphRequest): Promise<ChannelGraph>;
  public getChanInfo(args: ChanInfoRequest): Promise<ChannelEdge>;
  public getNodeInfo(args: NodeInfoRequest): Promise<NodeInfo>;
  public queryRoutes(args: QueryRoutesRequest): Promise<QueryRoutesResponse>;
  public getNetworkInfo(args: NetworkInfoRequest): Promise<NetworkInfo>;
  public stopDaemon(args: StopRequest): Promise<StopResponse>;
  public subscribeChannelGraph(args: GraphTopologySubscription): Promise<Stream>;
  public debugLevel(args: DebugLevelRequest): Promise<DebugLevelResponse>;
  public feeReport(args: FeeReportRequest): Promise<FeeReportResponse>;
  public updateChannelPolicy(args: PolicyUpdateRequest): Promise<PolicyUpdateResponse>;
  public forwardingHistory(args: ForwardingHistoryRequest): Promise<ForwardingHistoryResponse>;
}
