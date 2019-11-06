// package: signrpc
// file: signrpc/signer.proto

import * as jspb from "google-protobuf";

export class KeyLocator extends jspb.Message {
  getKeyFamily(): number;
  setKeyFamily(value: number): void;

  getKeyIndex(): number;
  setKeyIndex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): KeyLocator.AsObject;
  static toObject(includeInstance: boolean, msg: KeyLocator): KeyLocator.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: KeyLocator, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): KeyLocator;
  static deserializeBinaryFromReader(message: KeyLocator, reader: jspb.BinaryReader): KeyLocator;
}

export namespace KeyLocator {
  export type AsObject = {
    keyFamily: number,
    keyIndex: number,
  }
}

export class KeyDescriptor extends jspb.Message {
  getRawKeyBytes(): Uint8Array | string;
  getRawKeyBytes_asU8(): Uint8Array;
  getRawKeyBytes_asB64(): string;
  setRawKeyBytes(value: Uint8Array | string): void;

  hasKeyLoc(): boolean;
  clearKeyLoc(): void;
  getKeyLoc(): KeyLocator | undefined;
  setKeyLoc(value?: KeyLocator): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): KeyDescriptor.AsObject;
  static toObject(includeInstance: boolean, msg: KeyDescriptor): KeyDescriptor.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: KeyDescriptor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): KeyDescriptor;
  static deserializeBinaryFromReader(message: KeyDescriptor, reader: jspb.BinaryReader): KeyDescriptor;
}

export namespace KeyDescriptor {
  export type AsObject = {
    rawKeyBytes: Uint8Array | string,
    keyLoc?: KeyLocator.AsObject,
  }
}

export class TxOut extends jspb.Message {
  getValue(): number;
  setValue(value: number): void;

  getPkScript(): Uint8Array | string;
  getPkScript_asU8(): Uint8Array;
  getPkScript_asB64(): string;
  setPkScript(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TxOut.AsObject;
  static toObject(includeInstance: boolean, msg: TxOut): TxOut.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TxOut, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TxOut;
  static deserializeBinaryFromReader(message: TxOut, reader: jspb.BinaryReader): TxOut;
}

export namespace TxOut {
  export type AsObject = {
    value: number,
    pkScript: Uint8Array | string,
  }
}

export class SignDescriptor extends jspb.Message {
  hasKeyDesc(): boolean;
  clearKeyDesc(): void;
  getKeyDesc(): KeyDescriptor | undefined;
  setKeyDesc(value?: KeyDescriptor): void;

  getSingleTweak(): Uint8Array | string;
  getSingleTweak_asU8(): Uint8Array;
  getSingleTweak_asB64(): string;
  setSingleTweak(value: Uint8Array | string): void;

  getDoubleTweak(): Uint8Array | string;
  getDoubleTweak_asU8(): Uint8Array;
  getDoubleTweak_asB64(): string;
  setDoubleTweak(value: Uint8Array | string): void;

  getWitnessScript(): Uint8Array | string;
  getWitnessScript_asU8(): Uint8Array;
  getWitnessScript_asB64(): string;
  setWitnessScript(value: Uint8Array | string): void;

  hasOutput(): boolean;
  clearOutput(): void;
  getOutput(): TxOut | undefined;
  setOutput(value?: TxOut): void;

  getSighash(): number;
  setSighash(value: number): void;

  getInputIndex(): number;
  setInputIndex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignDescriptor.AsObject;
  static toObject(includeInstance: boolean, msg: SignDescriptor): SignDescriptor.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignDescriptor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignDescriptor;
  static deserializeBinaryFromReader(message: SignDescriptor, reader: jspb.BinaryReader): SignDescriptor;
}

export namespace SignDescriptor {
  export type AsObject = {
    keyDesc?: KeyDescriptor.AsObject,
    singleTweak: Uint8Array | string,
    doubleTweak: Uint8Array | string,
    witnessScript: Uint8Array | string,
    output?: TxOut.AsObject,
    sighash: number,
    inputIndex: number,
  }
}

export class SignReq extends jspb.Message {
  getRawTxBytes(): Uint8Array | string;
  getRawTxBytes_asU8(): Uint8Array;
  getRawTxBytes_asB64(): string;
  setRawTxBytes(value: Uint8Array | string): void;

  clearSignDescsList(): void;
  getSignDescsList(): Array<SignDescriptor>;
  setSignDescsList(value: Array<SignDescriptor>): void;
  addSignDescs(value?: SignDescriptor, index?: number): SignDescriptor;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignReq.AsObject;
  static toObject(includeInstance: boolean, msg: SignReq): SignReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignReq;
  static deserializeBinaryFromReader(message: SignReq, reader: jspb.BinaryReader): SignReq;
}

export namespace SignReq {
  export type AsObject = {
    rawTxBytes: Uint8Array | string,
    signDescsList: Array<SignDescriptor.AsObject>,
  }
}

export class SignResp extends jspb.Message {
  clearRawSigsList(): void;
  getRawSigsList(): Array<Uint8Array | string>;
  getRawSigsList_asU8(): Array<Uint8Array>;
  getRawSigsList_asB64(): Array<string>;
  setRawSigsList(value: Array<Uint8Array | string>): void;
  addRawSigs(value: Uint8Array | string, index?: number): Uint8Array | string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignResp.AsObject;
  static toObject(includeInstance: boolean, msg: SignResp): SignResp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignResp;
  static deserializeBinaryFromReader(message: SignResp, reader: jspb.BinaryReader): SignResp;
}

export namespace SignResp {
  export type AsObject = {
    rawSigsList: Array<Uint8Array | string>,
  }
}

export class InputScript extends jspb.Message {
  clearWitnessList(): void;
  getWitnessList(): Array<Uint8Array | string>;
  getWitnessList_asU8(): Array<Uint8Array>;
  getWitnessList_asB64(): Array<string>;
  setWitnessList(value: Array<Uint8Array | string>): void;
  addWitness(value: Uint8Array | string, index?: number): Uint8Array | string;

  getSigScript(): Uint8Array | string;
  getSigScript_asU8(): Uint8Array;
  getSigScript_asB64(): string;
  setSigScript(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InputScript.AsObject;
  static toObject(includeInstance: boolean, msg: InputScript): InputScript.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InputScript, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InputScript;
  static deserializeBinaryFromReader(message: InputScript, reader: jspb.BinaryReader): InputScript;
}

export namespace InputScript {
  export type AsObject = {
    witnessList: Array<Uint8Array | string>,
    sigScript: Uint8Array | string,
  }
}

export class InputScriptResp extends jspb.Message {
  clearInputScriptsList(): void;
  getInputScriptsList(): Array<InputScript>;
  setInputScriptsList(value: Array<InputScript>): void;
  addInputScripts(value?: InputScript, index?: number): InputScript;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InputScriptResp.AsObject;
  static toObject(includeInstance: boolean, msg: InputScriptResp): InputScriptResp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InputScriptResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InputScriptResp;
  static deserializeBinaryFromReader(message: InputScriptResp, reader: jspb.BinaryReader): InputScriptResp;
}

export namespace InputScriptResp {
  export type AsObject = {
    inputScriptsList: Array<InputScript.AsObject>,
  }
}

