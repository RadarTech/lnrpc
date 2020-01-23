import { Readable } from '../streams';
import { Route, RouteHint, FeatureBit } from './ln-rpc';
import { HTLCAttempt } from '../generated/rpc_pb';

export enum PaymentState {
  IN_FLIGHT = 0,
  SUCCEEDED = 1,
  FAILED_TIMEOUT = 2,
  FAILED_NO_ROUTE = 3,
  FAILED_ERROR = 4,
  FAILED_INCORRECT_PAYMENT_DETAILS = 5,
  FAILED_INSUFFICIENT_BALANCE = 6,
}

export enum FailureCode {
  RESERVED = 0,
  INCORRECT_OR_UNKNOWN_PAYMENT_DETAILS = 1,
  INCORRECT_PAYMENT_AMOUNT = 2,
  FINAL_INCORRECT_CLTV_EXPIRY = 3,
  FINAL_INCORRECT_HTLC_AMOUNT = 4,
  FINAL_EXPIRY_TOO_SOON = 5,
  INVALID_REALM = 6,
  EXPIRY_TOO_SOON = 7,
  INVALID_ONION_VERSION = 8,
  INVALID_ONION_HMAC = 9,
  INVALID_ONION_KEY = 10,
  AMOUNT_BELOW_MINIMUM = 11,
  FEE_INSUFFICIENT = 12,
  INCORRECT_CLTV_EXPIRY = 13,
  CHANNEL_DISABLED = 14,
  TEMPORARY_CHANNEL_FAILURE = 15,
  REQUIRED_NODE_FEATURE_MISSING = 16,
  REQUIRED_CHANNEL_FEATURE_MISSING = 17,
  UNKNOWN_NEXT_PEER = 18,
  TEMPORARY_NODE_FAILURE = 19,
  PERMANENT_NODE_FAILURE = 20,
  PERMANENT_CHANNEL_FAILURE = 21,
  EXPIRY_TOO_FAR = 22,
  MPP_TIMEOUT = 23,
  UNKNOWN_FAILURE = 998,
  UNREADABLE_FAILURE = 999,
}

export interface SendPaymentRequest {
  dest?: Buffer | string;
  amt?: number;
  amtMsat?: number;
  paymentHash?: Buffer | string;
  finalCltvDelta?: number;
  paymentRequest?: string;
  timeoutSeconds?: number;
  feeLimitSat?: number;
  feeLimitMsat?: number;
  outgoingChanId?: string;
  lastHopPubkey?: Buffer | string;
  cltvLimit?: number;
  routeHints?: RouteHint[];
  destCustomRecordsMap?: [number, Uint8Array][] | string[];
  allowSelfPayment?: boolean;
  destFeatures?: FeatureBit[];
}

export interface PaymentStatus {
  state: PaymentState;
  preimage: Buffer | string;
  route?: Route;
  htlcs?: HTLCAttempt[];
}

export interface TrackPaymentRequest {
  paymentHash: Buffer | string;
}

export interface RouteFeeRequest {
  dest: Buffer | string;
  amtSat: number;
}

export interface RouteFeeResponse {
  routingFeeMsat: number;
  timeLockDelay: number;
}

export interface SendToRouteReq {
  paymentHash: Buffer | string;
  route?: Route;
}

export interface ChanUpdate {
  signature: Buffer | string;
  chainHash: Buffer | string;
  chanId: number;
  timestamp: number;
  messageFlags: number;
  channelFlags: number;
  timeLockDelta: number;
  htlcMinimumMsat: number;
  baseFee: number;
  feeRate: number;
  htlcMaximumMsat: number;
  extraOpaqueData: Buffer | string;
}

export interface Failure {
  code: FailureCode;
  channelUpdate?: ChanUpdate;
  htlcMsat: number;
  onionSha256: Uint8Array | string;
  cltvExpiry: number;
  flags: number;
  failureSourceIndex: number;
  height: number;
}

export interface SendToRouteResponse {
  preimage: Buffer | string;
  failure?: Failure;
}

export interface PairHistory {
  nodeFrom: Buffer | string;
  nodeTo: Buffer | string;
  history?: PairData;
}

export interface PairData {
  failTime?: number;
  failAmtSat?: number;
  failAmtMsat?: number;
  successTime?: number;
  successAmtSat?: number;
  successAmtMsat?: number;
}

export interface QueryProbabilityRequest {
  fromNode?: Buffer | string,
  toNode?: Buffer | string,
  amtMsat?: number,
}

export interface QueryProbabilityResponse {
  probability: number,
  history?: PairData,
}

export interface QueryMissionControlResponse {
  pairs: PairHistory[];
}

export interface BuildRouteRequest {
  amtMsat: number;
  finalCltvDelta?: number;
  outgoingChanId?: string;
  hopPubkeys: Array<Buffer | string>;
}

export interface BuildRouteResponse {
  route?: Route;
}

/**
 * LND Router gRPC API Client
 */
export interface RouterRpc {
  /**
   * sendPayment attempts to route a payment described by the passed
   * PaymentRequest to the final destination. The call returns a stream of
   * payment status updates.
   */
  sendPayment(args: SendPaymentRequest): Readable<PaymentStatusUpdate>;

  /**
   * trackPayment returns an update stream for the payment identified by the
   * payment hash.
   */
  trackPayment(args: TrackPaymentRequest): Readable<PaymentStatusUpdate>;

  /**
   * estimateRouteFee allows callers to obtain a lower bound w.r.t how much it
   * may cost to send an HTLC to the target end destination.
   */
  estimateRouteFee(args: RouteFeeRequest): Promise<RouteFeeResponse>;

  /**
   * sendToRoute attempts to make a payment via the specified route. This method
   * differs from SendPayment in that it allows users to specify a full route
   * manually. This can be used for things like rebalancing, and atomic swaps.
   */
  sendToRoute(args: SendToRouteReq): Promise<SendToRouteResponse>;

  /**
   * resetMissionControl clears all mission control state and starts with a clean
   * slate.
   */
  resetMissionControl(args?: {}): Promise<{}>;

  /**
   * queryMissionControl exposes the internal mission control state to callers.
   * It is a development feature.
   */
  queryMissionControl(args?: {}): Promise<QueryMissionControlResponse>;

  /**
   * queryProbability returns the current success probability estimate for a
   * given node pair and amount.
   */
  queryProbability(args: QueryProbabilityRequest): Promise<QueryProbabilityResponse>;

  /**
   * buildRoute builds a fully specified route based on a list of hop public
   * keys. It retrieves the relevant channel policies from the graph in order to
   * calculate the correct fees and time locks.
   */
  buildRoute(args: BuildRouteRequest): Promise<BuildRouteResponse>;
}
