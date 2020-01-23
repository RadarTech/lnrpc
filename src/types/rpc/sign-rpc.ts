export interface KeyLocator {
  keyFamily: number;
  keyIndex: number;
}

export interface KeyDescriptor {
  rawKeyBytes: Buffer | string;
  keyLoc?: KeyLocator;
}

export interface TxOut {
  value: number;
  pkScript: Buffer | string;
}

export interface SignDescriptor {
  keyDesc?: KeyDescriptor;
  singleTweak?: Buffer | string;
  doubleTweak?: Buffer | string;
  witnessScript?: Buffer | string;
  output?: TxOut;
  sighash?: number;
  inputIndex?: number;
}

export interface SignReq {
  rawTxBytes?: Buffer | string;
  signDescs?: SignDescriptor[];
}

export interface SignResp {
  rawSigs: Array<Buffer | string>;
}

export interface InputScript {
  witness: Array<Buffer | string>;
  sigScript: Buffer | string;
}

export interface InputScriptResp {
  inputScripts: InputScript[];
}

export interface SignMessageReq {
  msg: Buffer | string,
  keyLoc?: KeyLocator,
}

export interface SignMessageResp {
  signature: Buffer | string,
}

export interface VerifyMessageReq {
  msg: Buffer | string,
  signature: Buffer | string,
  pubkey: Buffer | string,
}

export interface VerifyMessageResp {
  valid: boolean,
}

export interface SharedKeyRequest {
  ephemeralPubkey: Buffer | string,
  keyLoc?: KeyLocator,
}

export interface SharedKeyResponse {
  sharedKey: Buffer | string,
}

/**
 * LND Sign gRPC API Client
 */
export interface SignRpc {
  /**
   * signOutputRaw is a method that can be used to generated a signature for a
   * set of inputs/outputs to a transaction. Each request specifies details
   * concerning how the outputs should be signed, which keys they should be
   * signed with, and also any optional tweaks. The return value is a fixed
   * 64-byte signature (the same format as we use on the wire in Lightning).
   * If we are  unable to sign using the specified keys, then an error will be
   * returned.
   */
  signOutputRaw(args: SignReq): Promise<SignResp>;

  /**
   * computeInputScript generates a complete InputIndex for the passed
   * transaction with the signature as defined within the passed SignDescriptor.
   * This method should be capable of generating the proper input script for
   * both regular p2wkh output and p2wkh outputs nested within a regular p2sh
   * output.
   * Note that when using this method to sign inputs belonging to the wallet,
   * the only items of the SignDescriptor that need to be populated are pkScript
   * in the TxOut field, the value in that same field, and finally the input
   * index.
   */
  computeInputScript(args: SignReq): Promise<InputScriptResp>;

  /**
   * SignMessage signs a message with the key specified in the key locator. The
   * returned signature is fixed-size LN wire format encoded.
   * 
   * The main difference to SignMessage in the main RPC is that a specific key is
   * used to sign the message instead of the node identity private key.
   */
  signMessage (args: SignMessageReq): Promise<SignMessageResp>;

  /**
   * VerifyMessage verifies a signature over a message using the public key
   * provided. The signature must be fixed-size LN wire format encoded.
   * 
   * The main difference to VerifyMessage in the main RPC is that the public key
   * used to sign the message does not have to be a node known to the network.
   */
  verifyMessage (args: VerifyMessageReq): Promise<VerifyMessageResp>;

  /**
   * DeriveSharedKey returns a shared secret key by performing Diffie-Hellman key
   * derivation between the ephemeral public key in the request and the node's
   * key specified in the key_loc parameter (or the node's identity private key
   * if no key locator is specified):
   *    P_shared = privKeyNode * ephemeralPubkey
   * The resulting shared public key is serialized in the compressed format and
   * hashed with sha256, resulting in the final key length of 256bit.
   */
   deriveSharedKey (args: SharedKeyRequest): Promise<SharedKeyResponse>;
}
