// package: routerrpc
// file: routerrpc/router.proto

import * as jspb from "google-protobuf";
import * as rpc_pb from "../rpc_pb";

export class SendPaymentRequest extends jspb.Message {
  getDest(): Uint8Array | string;
  getDest_asU8(): Uint8Array;
  getDest_asB64(): string;
  setDest(value: Uint8Array | string): void;

  getAmt(): number;
  setAmt(value: number): void;

  getAmtMsat(): number;
  setAmtMsat(value: number): void;

  getPaymentHash(): Uint8Array | string;
  getPaymentHash_asU8(): Uint8Array;
  getPaymentHash_asB64(): string;
  setPaymentHash(value: Uint8Array | string): void;

  getFinalCltvDelta(): number;
  setFinalCltvDelta(value: number): void;

  getPaymentRequest(): string;
  setPaymentRequest(value: string): void;

  getTimeoutSeconds(): number;
  setTimeoutSeconds(value: number): void;

  getFeeLimitSat(): number;
  setFeeLimitSat(value: number): void;

  getFeeLimitMsat(): number;
  setFeeLimitMsat(value: number): void;

  getOutgoingChanId(): string;
  setOutgoingChanId(value: string): void;

  getLastHopPubkey(): Uint8Array | string;
  getLastHopPubkey_asU8(): Uint8Array;
  getLastHopPubkey_asB64(): string;
  setLastHopPubkey(value: Uint8Array | string): void;

  getCltvLimit(): number;
  setCltvLimit(value: number): void;

  clearRouteHintsList(): void;
  getRouteHintsList(): Array<rpc_pb.RouteHint>;
  setRouteHintsList(value: Array<rpc_pb.RouteHint>): void;
  addRouteHints(value?: rpc_pb.RouteHint, index?: number): rpc_pb.RouteHint;

  getDestCustomRecordsMap(): jspb.Map<number, Uint8Array | string>;
  clearDestCustomRecordsMap(): void;
  getAllowSelfPayment(): boolean;
  setAllowSelfPayment(value: boolean): void;

  clearDestFeaturesList(): void;
  getDestFeaturesList(): Array<rpc_pb.FeatureBit>;
  setDestFeaturesList(value: Array<rpc_pb.FeatureBit>): void;
  addDestFeatures(value: rpc_pb.FeatureBit, index?: number): rpc_pb.FeatureBit;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendPaymentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SendPaymentRequest): SendPaymentRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendPaymentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendPaymentRequest;
  static deserializeBinaryFromReader(message: SendPaymentRequest, reader: jspb.BinaryReader): SendPaymentRequest;
}

export namespace SendPaymentRequest {
  export type AsObject = {
    dest: Uint8Array | string,
    amt: number,
    amtMsat: number,
    paymentHash: Uint8Array | string,
    finalCltvDelta: number,
    paymentRequest: string,
    timeoutSeconds: number,
    feeLimitSat: number,
    feeLimitMsat: number,
    outgoingChanId: string,
    lastHopPubkey: Uint8Array | string,
    cltvLimit: number,
    routeHints: Array<rpc_pb.RouteHint.AsObject>,
    destCustomRecordsMap: Array<[number, Uint8Array | string]>,
    allowSelfPayment: boolean,
    destFeatures: Array<rpc_pb.FeatureBit>,
  }
}

export class TrackPaymentRequest extends jspb.Message {
  getPaymentHash(): Uint8Array | string;
  getPaymentHash_asU8(): Uint8Array;
  getPaymentHash_asB64(): string;
  setPaymentHash(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TrackPaymentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TrackPaymentRequest): TrackPaymentRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TrackPaymentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TrackPaymentRequest;
  static deserializeBinaryFromReader(message: TrackPaymentRequest, reader: jspb.BinaryReader): TrackPaymentRequest;
}

export namespace TrackPaymentRequest {
  export type AsObject = {
    paymentHash: Uint8Array | string,
  }
}

export class PaymentStatus extends jspb.Message {
  getState(): PaymentState;
  setState(value: PaymentState): void;

  getPreimage(): Uint8Array | string;
  getPreimage_asU8(): Uint8Array;
  getPreimage_asB64(): string;
  setPreimage(value: Uint8Array | string): void;

  hasRoute(): boolean;
  clearRoute(): void;
  getRoute(): rpc_pb.Route | undefined;
  setRoute(value?: rpc_pb.Route): void;

  clearHtlcsList(): void;
  getHtlcsList(): Array<rpc_pb.HTLCAttempt>;
  setHtlcsList(value: Array<rpc_pb.HTLCAttempt>): void;
  addHtlcs(value?: rpc_pb.HTLCAttempt, index?: number): rpc_pb.HTLCAttempt;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PaymentStatus.AsObject;
  static toObject(includeInstance: boolean, msg: PaymentStatus): PaymentStatus.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PaymentStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PaymentStatus;
  static deserializeBinaryFromReader(message: PaymentStatus, reader: jspb.BinaryReader): PaymentStatus;
}

export namespace PaymentStatus {
  export type AsObject = {
    state: PaymentState,
    preimage: Uint8Array | string,
    route?: rpc_pb.Route.AsObject,
    htlcs: Array<rpc_pb.HTLCAttempt.AsObject>,
  }
}

export class RouteFeeRequest extends jspb.Message {
  getDest(): Uint8Array | string;
  getDest_asU8(): Uint8Array;
  getDest_asB64(): string;
  setDest(value: Uint8Array | string): void;

  getAmtSat(): number;
  setAmtSat(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RouteFeeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RouteFeeRequest): RouteFeeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RouteFeeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RouteFeeRequest;
  static deserializeBinaryFromReader(message: RouteFeeRequest, reader: jspb.BinaryReader): RouteFeeRequest;
}

export namespace RouteFeeRequest {
  export type AsObject = {
    dest: Uint8Array | string,
    amtSat: number,
  }
}

export class RouteFeeResponse extends jspb.Message {
  getRoutingFeeMsat(): number;
  setRoutingFeeMsat(value: number): void;

  getTimeLockDelay(): number;
  setTimeLockDelay(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RouteFeeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RouteFeeResponse): RouteFeeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RouteFeeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RouteFeeResponse;
  static deserializeBinaryFromReader(message: RouteFeeResponse, reader: jspb.BinaryReader): RouteFeeResponse;
}

export namespace RouteFeeResponse {
  export type AsObject = {
    routingFeeMsat: number,
    timeLockDelay: number,
  }
}

export class SendToRouteRequest extends jspb.Message {
  getPaymentHash(): Uint8Array | string;
  getPaymentHash_asU8(): Uint8Array;
  getPaymentHash_asB64(): string;
  setPaymentHash(value: Uint8Array | string): void;

  hasRoute(): boolean;
  clearRoute(): void;
  getRoute(): rpc_pb.Route | undefined;
  setRoute(value?: rpc_pb.Route): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendToRouteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SendToRouteRequest): SendToRouteRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendToRouteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendToRouteRequest;
  static deserializeBinaryFromReader(message: SendToRouteRequest, reader: jspb.BinaryReader): SendToRouteRequest;
}

export namespace SendToRouteRequest {
  export type AsObject = {
    paymentHash: Uint8Array | string,
    route?: rpc_pb.Route.AsObject,
  }
}

export class SendToRouteResponse extends jspb.Message {
  getPreimage(): Uint8Array | string;
  getPreimage_asU8(): Uint8Array;
  getPreimage_asB64(): string;
  setPreimage(value: Uint8Array | string): void;

  hasFailure(): boolean;
  clearFailure(): void;
  getFailure(): Failure | undefined;
  setFailure(value?: Failure): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendToRouteResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SendToRouteResponse): SendToRouteResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendToRouteResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendToRouteResponse;
  static deserializeBinaryFromReader(message: SendToRouteResponse, reader: jspb.BinaryReader): SendToRouteResponse;
}

export namespace SendToRouteResponse {
  export type AsObject = {
    preimage: Uint8Array | string,
    failure?: Failure.AsObject,
  }
}

export class Failure extends jspb.Message {
  getCode(): Failure.FailureCode;
  setCode(value: Failure.FailureCode): void;

  hasChannelUpdate(): boolean;
  clearChannelUpdate(): void;
  getChannelUpdate(): ChannelUpdate | undefined;
  setChannelUpdate(value?: ChannelUpdate): void;

  getHtlcMsat(): number;
  setHtlcMsat(value: number): void;

  getOnionSha256(): Uint8Array | string;
  getOnionSha256_asU8(): Uint8Array;
  getOnionSha256_asB64(): string;
  setOnionSha256(value: Uint8Array | string): void;

  getCltvExpiry(): number;
  setCltvExpiry(value: number): void;

  getFlags(): number;
  setFlags(value: number): void;

  getFailureSourceIndex(): number;
  setFailureSourceIndex(value: number): void;

  getHeight(): number;
  setHeight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Failure.AsObject;
  static toObject(includeInstance: boolean, msg: Failure): Failure.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Failure, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Failure;
  static deserializeBinaryFromReader(message: Failure, reader: jspb.BinaryReader): Failure;
}

export namespace Failure {
  export type AsObject = {
    code: Failure.FailureCode,
    channelUpdate?: ChannelUpdate.AsObject,
    htlcMsat: number,
    onionSha256: Uint8Array | string,
    cltvExpiry: number,
    flags: number,
    failureSourceIndex: number,
    height: number,
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
}

export class ChannelUpdate extends jspb.Message {
  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  getChainHash(): Uint8Array | string;
  getChainHash_asU8(): Uint8Array;
  getChainHash_asB64(): string;
  setChainHash(value: Uint8Array | string): void;

  getChanId(): string;
  setChanId(value: string): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  getMessageFlags(): number;
  setMessageFlags(value: number): void;

  getChannelFlags(): number;
  setChannelFlags(value: number): void;

  getTimeLockDelta(): number;
  setTimeLockDelta(value: number): void;

  getHtlcMinimumMsat(): number;
  setHtlcMinimumMsat(value: number): void;

  getBaseFee(): number;
  setBaseFee(value: number): void;

  getFeeRate(): number;
  setFeeRate(value: number): void;

  getHtlcMaximumMsat(): number;
  setHtlcMaximumMsat(value: number): void;

  getExtraOpaqueData(): Uint8Array | string;
  getExtraOpaqueData_asU8(): Uint8Array;
  getExtraOpaqueData_asB64(): string;
  setExtraOpaqueData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChannelUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: ChannelUpdate): ChannelUpdate.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChannelUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChannelUpdate;
  static deserializeBinaryFromReader(message: ChannelUpdate, reader: jspb.BinaryReader): ChannelUpdate;
}

export namespace ChannelUpdate {
  export type AsObject = {
    signature: Uint8Array | string,
    chainHash: Uint8Array | string,
    chanId: string,
    timestamp: number,
    messageFlags: number,
    channelFlags: number,
    timeLockDelta: number,
    htlcMinimumMsat: number,
    baseFee: number,
    feeRate: number,
    htlcMaximumMsat: number,
    extraOpaqueData: Uint8Array | string,
  }
}

export class ResetMissionControlRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResetMissionControlRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ResetMissionControlRequest): ResetMissionControlRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResetMissionControlRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResetMissionControlRequest;
  static deserializeBinaryFromReader(message: ResetMissionControlRequest, reader: jspb.BinaryReader): ResetMissionControlRequest;
}

export namespace ResetMissionControlRequest {
  export type AsObject = {
  }
}

export class ResetMissionControlResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResetMissionControlResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ResetMissionControlResponse): ResetMissionControlResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResetMissionControlResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResetMissionControlResponse;
  static deserializeBinaryFromReader(message: ResetMissionControlResponse, reader: jspb.BinaryReader): ResetMissionControlResponse;
}

export namespace ResetMissionControlResponse {
  export type AsObject = {
  }
}

export class QueryMissionControlRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryMissionControlRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryMissionControlRequest): QueryMissionControlRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryMissionControlRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryMissionControlRequest;
  static deserializeBinaryFromReader(message: QueryMissionControlRequest, reader: jspb.BinaryReader): QueryMissionControlRequest;
}

export namespace QueryMissionControlRequest {
  export type AsObject = {
  }
}

export class QueryMissionControlResponse extends jspb.Message {
  clearPairsList(): void;
  getPairsList(): Array<PairHistory>;
  setPairsList(value: Array<PairHistory>): void;
  addPairs(value?: PairHistory, index?: number): PairHistory;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryMissionControlResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryMissionControlResponse): QueryMissionControlResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryMissionControlResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryMissionControlResponse;
  static deserializeBinaryFromReader(message: QueryMissionControlResponse, reader: jspb.BinaryReader): QueryMissionControlResponse;
}

export namespace QueryMissionControlResponse {
  export type AsObject = {
    pairs: Array<PairHistory.AsObject>,
  }
}

export class PairHistory extends jspb.Message {
  getNodeFrom(): Uint8Array | string;
  getNodeFrom_asU8(): Uint8Array;
  getNodeFrom_asB64(): string;
  setNodeFrom(value: Uint8Array | string): void;

  getNodeTo(): Uint8Array | string;
  getNodeTo_asU8(): Uint8Array;
  getNodeTo_asB64(): string;
  setNodeTo(value: Uint8Array | string): void;

  hasHistory(): boolean;
  clearHistory(): void;
  getHistory(): PairData | undefined;
  setHistory(value?: PairData): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PairHistory.AsObject;
  static toObject(includeInstance: boolean, msg: PairHistory): PairHistory.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PairHistory, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PairHistory;
  static deserializeBinaryFromReader(message: PairHistory, reader: jspb.BinaryReader): PairHistory;
}

export namespace PairHistory {
  export type AsObject = {
    nodeFrom: Uint8Array | string,
    nodeTo: Uint8Array | string,
    history?: PairData.AsObject,
  }
}

export class PairData extends jspb.Message {
  getFailTime(): number;
  setFailTime(value: number): void;

  getFailAmtSat(): number;
  setFailAmtSat(value: number): void;

  getFailAmtMsat(): number;
  setFailAmtMsat(value: number): void;

  getSuccessTime(): number;
  setSuccessTime(value: number): void;

  getSuccessAmtSat(): number;
  setSuccessAmtSat(value: number): void;

  getSuccessAmtMsat(): number;
  setSuccessAmtMsat(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PairData.AsObject;
  static toObject(includeInstance: boolean, msg: PairData): PairData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PairData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PairData;
  static deserializeBinaryFromReader(message: PairData, reader: jspb.BinaryReader): PairData;
}

export namespace PairData {
  export type AsObject = {
    failTime: number,
    failAmtSat: number,
    failAmtMsat: number,
    successTime: number,
    successAmtSat: number,
    successAmtMsat: number,
  }
}

export class QueryProbabilityRequest extends jspb.Message {
  getFromNode(): Uint8Array | string;
  getFromNode_asU8(): Uint8Array;
  getFromNode_asB64(): string;
  setFromNode(value: Uint8Array | string): void;

  getToNode(): Uint8Array | string;
  getToNode_asU8(): Uint8Array;
  getToNode_asB64(): string;
  setToNode(value: Uint8Array | string): void;

  getAmtMsat(): number;
  setAmtMsat(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryProbabilityRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryProbabilityRequest): QueryProbabilityRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryProbabilityRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryProbabilityRequest;
  static deserializeBinaryFromReader(message: QueryProbabilityRequest, reader: jspb.BinaryReader): QueryProbabilityRequest;
}

export namespace QueryProbabilityRequest {
  export type AsObject = {
    fromNode: Uint8Array | string,
    toNode: Uint8Array | string,
    amtMsat: number,
  }
}

export class QueryProbabilityResponse extends jspb.Message {
  getProbability(): number;
  setProbability(value: number): void;

  hasHistory(): boolean;
  clearHistory(): void;
  getHistory(): PairData | undefined;
  setHistory(value?: PairData): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryProbabilityResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryProbabilityResponse): QueryProbabilityResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryProbabilityResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryProbabilityResponse;
  static deserializeBinaryFromReader(message: QueryProbabilityResponse, reader: jspb.BinaryReader): QueryProbabilityResponse;
}

export namespace QueryProbabilityResponse {
  export type AsObject = {
    probability: number,
    history?: PairData.AsObject,
  }
}

export class BuildRouteRequest extends jspb.Message {
  getAmtMsat(): number;
  setAmtMsat(value: number): void;

  getFinalCltvDelta(): number;
  setFinalCltvDelta(value: number): void;

  getOutgoingChanId(): string;
  setOutgoingChanId(value: string): void;

  clearHopPubkeysList(): void;
  getHopPubkeysList(): Array<Uint8Array | string>;
  getHopPubkeysList_asU8(): Array<Uint8Array>;
  getHopPubkeysList_asB64(): Array<string>;
  setHopPubkeysList(value: Array<Uint8Array | string>): void;
  addHopPubkeys(value: Uint8Array | string, index?: number): Uint8Array | string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BuildRouteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BuildRouteRequest): BuildRouteRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BuildRouteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BuildRouteRequest;
  static deserializeBinaryFromReader(message: BuildRouteRequest, reader: jspb.BinaryReader): BuildRouteRequest;
}

export namespace BuildRouteRequest {
  export type AsObject = {
    amtMsat: number,
    finalCltvDelta: number,
    outgoingChanId: string,
    hopPubkeys: Array<Uint8Array | string>,
  }
}

export class BuildRouteResponse extends jspb.Message {
  hasRoute(): boolean;
  clearRoute(): void;
  getRoute(): rpc_pb.Route | undefined;
  setRoute(value?: rpc_pb.Route): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BuildRouteResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BuildRouteResponse): BuildRouteResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BuildRouteResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BuildRouteResponse;
  static deserializeBinaryFromReader(message: BuildRouteResponse, reader: jspb.BinaryReader): BuildRouteResponse;
}

export namespace BuildRouteResponse {
  export type AsObject = {
    route?: rpc_pb.Route.AsObject,
  }
}

export enum PaymentState {
  IN_FLIGHT = 0,
  SUCCEEDED = 1,
  FAILED_TIMEOUT = 2,
  FAILED_NO_ROUTE = 3,
  FAILED_ERROR = 4,
  FAILED_INCORRECT_PAYMENT_DETAILS = 5,
  FAILED_INSUFFICIENT_BALANCE = 6,
}

