// package: walletrpc
// file: walletrpc/walletkit.proto

import * as jspb from "google-protobuf";
import * as rpc_pb from "../rpc_pb";
import * as signrpc_signer_pb from "../signrpc/signer_pb";

export class ListUnspentRequest extends jspb.Message {
  getMinConfs(): number;
  setMinConfs(value: number): void;

  getMaxConfs(): number;
  setMaxConfs(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListUnspentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListUnspentRequest): ListUnspentRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListUnspentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListUnspentRequest;
  static deserializeBinaryFromReader(message: ListUnspentRequest, reader: jspb.BinaryReader): ListUnspentRequest;
}

export namespace ListUnspentRequest {
  export type AsObject = {
    minConfs: number,
    maxConfs: number,
  }
}

export class ListUnspentResponse extends jspb.Message {
  clearUtxosList(): void;
  getUtxosList(): Array<rpc_pb.Utxo>;
  setUtxosList(value: Array<rpc_pb.Utxo>): void;
  addUtxos(value?: rpc_pb.Utxo, index?: number): rpc_pb.Utxo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListUnspentResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListUnspentResponse): ListUnspentResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListUnspentResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListUnspentResponse;
  static deserializeBinaryFromReader(message: ListUnspentResponse, reader: jspb.BinaryReader): ListUnspentResponse;
}

export namespace ListUnspentResponse {
  export type AsObject = {
    utxos: Array<rpc_pb.Utxo.AsObject>,
  }
}

export class LeaseOutputRequest extends jspb.Message {
  getId(): Uint8Array | string;
  getId_asU8(): Uint8Array;
  getId_asB64(): string;
  setId(value: Uint8Array | string): void;

  hasOutpoint(): boolean;
  clearOutpoint(): void;
  getOutpoint(): rpc_pb.OutPoint | undefined;
  setOutpoint(value?: rpc_pb.OutPoint): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LeaseOutputRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LeaseOutputRequest): LeaseOutputRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LeaseOutputRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LeaseOutputRequest;
  static deserializeBinaryFromReader(message: LeaseOutputRequest, reader: jspb.BinaryReader): LeaseOutputRequest;
}

export namespace LeaseOutputRequest {
  export type AsObject = {
    id: Uint8Array | string,
    outpoint?: rpc_pb.OutPoint.AsObject,
  }
}

export class LeaseOutputResponse extends jspb.Message {
  getExpiration(): number;
  setExpiration(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LeaseOutputResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LeaseOutputResponse): LeaseOutputResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LeaseOutputResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LeaseOutputResponse;
  static deserializeBinaryFromReader(message: LeaseOutputResponse, reader: jspb.BinaryReader): LeaseOutputResponse;
}

export namespace LeaseOutputResponse {
  export type AsObject = {
    expiration: number,
  }
}

export class ReleaseOutputRequest extends jspb.Message {
  getId(): Uint8Array | string;
  getId_asU8(): Uint8Array;
  getId_asB64(): string;
  setId(value: Uint8Array | string): void;

  hasOutpoint(): boolean;
  clearOutpoint(): void;
  getOutpoint(): rpc_pb.OutPoint | undefined;
  setOutpoint(value?: rpc_pb.OutPoint): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReleaseOutputRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ReleaseOutputRequest): ReleaseOutputRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ReleaseOutputRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReleaseOutputRequest;
  static deserializeBinaryFromReader(message: ReleaseOutputRequest, reader: jspb.BinaryReader): ReleaseOutputRequest;
}

export namespace ReleaseOutputRequest {
  export type AsObject = {
    id: Uint8Array | string,
    outpoint?: rpc_pb.OutPoint.AsObject,
  }
}

export class ReleaseOutputResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReleaseOutputResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ReleaseOutputResponse): ReleaseOutputResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ReleaseOutputResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReleaseOutputResponse;
  static deserializeBinaryFromReader(message: ReleaseOutputResponse, reader: jspb.BinaryReader): ReleaseOutputResponse;
}

export namespace ReleaseOutputResponse {
  export type AsObject = {
  }
}

export class KeyReq extends jspb.Message {
  getKeyFingerPrint(): number;
  setKeyFingerPrint(value: number): void;

  getKeyFamily(): number;
  setKeyFamily(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): KeyReq.AsObject;
  static toObject(includeInstance: boolean, msg: KeyReq): KeyReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: KeyReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): KeyReq;
  static deserializeBinaryFromReader(message: KeyReq, reader: jspb.BinaryReader): KeyReq;
}

export namespace KeyReq {
  export type AsObject = {
    keyFingerPrint: number,
    keyFamily: number,
  }
}

export class AddrRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddrRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddrRequest): AddrRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddrRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddrRequest;
  static deserializeBinaryFromReader(message: AddrRequest, reader: jspb.BinaryReader): AddrRequest;
}

export namespace AddrRequest {
  export type AsObject = {
  }
}

export class AddrResponse extends jspb.Message {
  getAddr(): string;
  setAddr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddrResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddrResponse): AddrResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddrResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddrResponse;
  static deserializeBinaryFromReader(message: AddrResponse, reader: jspb.BinaryReader): AddrResponse;
}

export namespace AddrResponse {
  export type AsObject = {
    addr: string,
  }
}

export class Transaction extends jspb.Message {
  getTxHex(): Uint8Array | string;
  getTxHex_asU8(): Uint8Array;
  getTxHex_asB64(): string;
  setTxHex(value: Uint8Array | string): void;

  getLabel(): string;
  setLabel(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Transaction.AsObject;
  static toObject(includeInstance: boolean, msg: Transaction): Transaction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Transaction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Transaction;
  static deserializeBinaryFromReader(message: Transaction, reader: jspb.BinaryReader): Transaction;
}

export namespace Transaction {
  export type AsObject = {
    txHex: Uint8Array | string,
    label: string,
  }
}

export class PublishResponse extends jspb.Message {
  getPublishError(): string;
  setPublishError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PublishResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PublishResponse): PublishResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PublishResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PublishResponse;
  static deserializeBinaryFromReader(message: PublishResponse, reader: jspb.BinaryReader): PublishResponse;
}

export namespace PublishResponse {
  export type AsObject = {
    publishError: string,
  }
}

export class SendOutputsRequest extends jspb.Message {
  getSatPerKw(): number;
  setSatPerKw(value: number): void;

  clearOutputsList(): void;
  getOutputsList(): Array<signrpc_signer_pb.TxOut>;
  setOutputsList(value: Array<signrpc_signer_pb.TxOut>): void;
  addOutputs(value?: signrpc_signer_pb.TxOut, index?: number): signrpc_signer_pb.TxOut;

  getLabel(): string;
  setLabel(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendOutputsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SendOutputsRequest): SendOutputsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendOutputsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendOutputsRequest;
  static deserializeBinaryFromReader(message: SendOutputsRequest, reader: jspb.BinaryReader): SendOutputsRequest;
}

export namespace SendOutputsRequest {
  export type AsObject = {
    satPerKw: number,
    outputs: Array<signrpc_signer_pb.TxOut.AsObject>,
    label: string,
  }
}

export class SendOutputsResponse extends jspb.Message {
  getRawTx(): Uint8Array | string;
  getRawTx_asU8(): Uint8Array;
  getRawTx_asB64(): string;
  setRawTx(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendOutputsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SendOutputsResponse): SendOutputsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendOutputsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendOutputsResponse;
  static deserializeBinaryFromReader(message: SendOutputsResponse, reader: jspb.BinaryReader): SendOutputsResponse;
}

export namespace SendOutputsResponse {
  export type AsObject = {
    rawTx: Uint8Array | string,
  }
}

export class EstimateFeeRequest extends jspb.Message {
  getConfTarget(): number;
  setConfTarget(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EstimateFeeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EstimateFeeRequest): EstimateFeeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EstimateFeeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EstimateFeeRequest;
  static deserializeBinaryFromReader(message: EstimateFeeRequest, reader: jspb.BinaryReader): EstimateFeeRequest;
}

export namespace EstimateFeeRequest {
  export type AsObject = {
    confTarget: number,
  }
}

export class EstimateFeeResponse extends jspb.Message {
  getSatPerKw(): number;
  setSatPerKw(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EstimateFeeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: EstimateFeeResponse): EstimateFeeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EstimateFeeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EstimateFeeResponse;
  static deserializeBinaryFromReader(message: EstimateFeeResponse, reader: jspb.BinaryReader): EstimateFeeResponse;
}

export namespace EstimateFeeResponse {
  export type AsObject = {
    satPerKw: number,
  }
}

export class PendingSweep extends jspb.Message {
  hasOutpoint(): boolean;
  clearOutpoint(): void;
  getOutpoint(): rpc_pb.OutPoint | undefined;
  setOutpoint(value?: rpc_pb.OutPoint): void;

  getWitnessType(): WitnessType;
  setWitnessType(value: WitnessType): void;

  getAmountSat(): number;
  setAmountSat(value: number): void;

  getSatPerByte(): number;
  setSatPerByte(value: number): void;

  getBroadcastAttempts(): number;
  setBroadcastAttempts(value: number): void;

  getNextBroadcastHeight(): number;
  setNextBroadcastHeight(value: number): void;

  getRequestedConfTarget(): number;
  setRequestedConfTarget(value: number): void;

  getRequestedSatPerByte(): number;
  setRequestedSatPerByte(value: number): void;

  getForce(): boolean;
  setForce(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PendingSweep.AsObject;
  static toObject(includeInstance: boolean, msg: PendingSweep): PendingSweep.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PendingSweep, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PendingSweep;
  static deserializeBinaryFromReader(message: PendingSweep, reader: jspb.BinaryReader): PendingSweep;
}

export namespace PendingSweep {
  export type AsObject = {
    outpoint?: rpc_pb.OutPoint.AsObject,
    witnessType: WitnessType,
    amountSat: number,
    satPerByte: number,
    broadcastAttempts: number,
    nextBroadcastHeight: number,
    requestedConfTarget: number,
    requestedSatPerByte: number,
    force: boolean,
  }
}

export class PendingSweepsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PendingSweepsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PendingSweepsRequest): PendingSweepsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PendingSweepsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PendingSweepsRequest;
  static deserializeBinaryFromReader(message: PendingSweepsRequest, reader: jspb.BinaryReader): PendingSweepsRequest;
}

export namespace PendingSweepsRequest {
  export type AsObject = {
  }
}

export class PendingSweepsResponse extends jspb.Message {
  clearPendingSweepsList(): void;
  getPendingSweepsList(): Array<PendingSweep>;
  setPendingSweepsList(value: Array<PendingSweep>): void;
  addPendingSweeps(value?: PendingSweep, index?: number): PendingSweep;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PendingSweepsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PendingSweepsResponse): PendingSweepsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PendingSweepsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PendingSweepsResponse;
  static deserializeBinaryFromReader(message: PendingSweepsResponse, reader: jspb.BinaryReader): PendingSweepsResponse;
}

export namespace PendingSweepsResponse {
  export type AsObject = {
    pendingSweeps: Array<PendingSweep.AsObject>,
  }
}

export class BumpFeeRequest extends jspb.Message {
  hasOutpoint(): boolean;
  clearOutpoint(): void;
  getOutpoint(): rpc_pb.OutPoint | undefined;
  setOutpoint(value?: rpc_pb.OutPoint): void;

  getTargetConf(): number;
  setTargetConf(value: number): void;

  getSatPerByte(): number;
  setSatPerByte(value: number): void;

  getForce(): boolean;
  setForce(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BumpFeeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BumpFeeRequest): BumpFeeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BumpFeeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BumpFeeRequest;
  static deserializeBinaryFromReader(message: BumpFeeRequest, reader: jspb.BinaryReader): BumpFeeRequest;
}

export namespace BumpFeeRequest {
  export type AsObject = {
    outpoint?: rpc_pb.OutPoint.AsObject,
    targetConf: number,
    satPerByte: number,
    force: boolean,
  }
}

export class BumpFeeResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BumpFeeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BumpFeeResponse): BumpFeeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BumpFeeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BumpFeeResponse;
  static deserializeBinaryFromReader(message: BumpFeeResponse, reader: jspb.BinaryReader): BumpFeeResponse;
}

export namespace BumpFeeResponse {
  export type AsObject = {
  }
}

export class ListSweepsRequest extends jspb.Message {
  getVerbose(): boolean;
  setVerbose(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListSweepsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListSweepsRequest): ListSweepsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListSweepsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListSweepsRequest;
  static deserializeBinaryFromReader(message: ListSweepsRequest, reader: jspb.BinaryReader): ListSweepsRequest;
}

export namespace ListSweepsRequest {
  export type AsObject = {
    verbose: boolean,
  }
}

export class ListSweepsResponse extends jspb.Message {
  hasTransactionDetails(): boolean;
  clearTransactionDetails(): void;
  getTransactionDetails(): rpc_pb.TransactionDetails | undefined;
  setTransactionDetails(value?: rpc_pb.TransactionDetails): void;

  hasTransactionIds(): boolean;
  clearTransactionIds(): void;
  getTransactionIds(): ListSweepsResponse.TransactionIDs | undefined;
  setTransactionIds(value?: ListSweepsResponse.TransactionIDs): void;

  getSweepsCase(): ListSweepsResponse.SweepsCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListSweepsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListSweepsResponse): ListSweepsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListSweepsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListSweepsResponse;
  static deserializeBinaryFromReader(message: ListSweepsResponse, reader: jspb.BinaryReader): ListSweepsResponse;
}

export namespace ListSweepsResponse {
  export type AsObject = {
    transactionDetails?: rpc_pb.TransactionDetails.AsObject,
    transactionIds?: ListSweepsResponse.TransactionIDs.AsObject,
  }

  export class TransactionIDs extends jspb.Message {
    clearTransactionIdsList(): void;
    getTransactionIdsList(): Array<string>;
    setTransactionIdsList(value: Array<string>): void;
    addTransactionIds(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransactionIDs.AsObject;
    static toObject(includeInstance: boolean, msg: TransactionIDs): TransactionIDs.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransactionIDs, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransactionIDs;
    static deserializeBinaryFromReader(message: TransactionIDs, reader: jspb.BinaryReader): TransactionIDs;
  }

  export namespace TransactionIDs {
    export type AsObject = {
      transactionIds: Array<string>,
    }
  }

  export enum SweepsCase {
    SWEEPS_NOT_SET = 0,
    TRANSACTION_DETAILS = 1,
    TRANSACTION_IDS = 2,
  }
}

export class LabelTransactionRequest extends jspb.Message {
  getTxid(): Uint8Array | string;
  getTxid_asU8(): Uint8Array;
  getTxid_asB64(): string;
  setTxid(value: Uint8Array | string): void;

  getLabel(): string;
  setLabel(value: string): void;

  getOverwrite(): boolean;
  setOverwrite(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LabelTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LabelTransactionRequest): LabelTransactionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LabelTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LabelTransactionRequest;
  static deserializeBinaryFromReader(message: LabelTransactionRequest, reader: jspb.BinaryReader): LabelTransactionRequest;
}

export namespace LabelTransactionRequest {
  export type AsObject = {
    txid: Uint8Array | string,
    label: string,
    overwrite: boolean,
  }
}

export class LabelTransactionResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LabelTransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LabelTransactionResponse): LabelTransactionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LabelTransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LabelTransactionResponse;
  static deserializeBinaryFromReader(message: LabelTransactionResponse, reader: jspb.BinaryReader): LabelTransactionResponse;
}

export namespace LabelTransactionResponse {
  export type AsObject = {
  }
}

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

