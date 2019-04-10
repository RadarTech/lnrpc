import { Writable, WritableOptions } from "stream";
import { Readable, ReadableOptions } from "./readable";

declare class Duplex<REQ = any, RES = any> extends Readable<RES> implements Writable {
  public writable: boolean;
  public readonly writableHighWaterMark: number;
  public readonly writableLength: number;
  constructor(opts?: DuplexOptions<REQ, RES>);
  public _write(chunk: REQ, encoding: string, callback: (error?: Error | null) => void): void;
  public _writev?(chunks: Array<{ chunk: REQ, encoding: string }>, callback: (error?: Error | null) => void): void;
  public _destroy(error: Error | null, callback: (error: Error | null) => void): void;
  public _final(callback: (error?: Error | null) => void): void;
  public write(chunk: REQ, cb?: (error: Error | null | undefined) => void): boolean;
  public write(chunk: REQ, encoding?: string, cb?: (error: Error | null | undefined) => void): boolean;
  public setDefaultEncoding(encoding: string): this;
  public end(cb?: () => void): void;
  public end(chunk: REQ, cb?: () => void): void;
  public end(chunk: REQ, encoding?: string, cb?: () => void): void;
  public cork(): void;
  public uncork(): void;
}

export interface DuplexOptions<REQ, RES> extends ReadableOptions<RES>, WritableOptions {
  allowHalfOpen?: boolean;
  readableObjectMode?: boolean;
  writableObjectMode?: boolean;
  read?(this: Duplex<REQ, RES>, size: number): void;
  write?(this: Duplex<REQ, RES>, chunk: REQ, encoding: string, callback: (error?: Error | null) => void): void;
  writev?(
    this: Duplex<REQ, RES>,
    chunks: Array<{ chunk: REQ, encoding: string }>,
    callback: (error?: Error | null) => void,
  ): void;
  final?(this: Duplex<REQ, RES>, callback: (error?: Error | null) => void): void;
  destroy?(this: Duplex<REQ, RES>, error: Error | null, callback: (error: Error | null) => void): void;
}
