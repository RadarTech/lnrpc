import * as protoLoader from '@grpc/proto-loader';
import grpc from 'grpc';

/**
 * Create RPC from proto and return the GRPC package object
 * @param protoFilePath The path to the proto file
 */
export function createGrpcObject(protoFilePath: string) {
  try {
    const packageDefinition = protoLoader.loadSync(protoFilePath, {
      longs: String,
    });
    return grpc.loadPackageDefinition(packageDefinition);
  } catch (e) {
    if (!e.code) e.code = 'GRPC_LOAD_ERR';
    throw e;
  }
}
