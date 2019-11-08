import { GrpcObjectConfig } from '../types';

/**
 * Create RPC from proto and return the GRPC package object
 * @param config The configuration necessary to create the grpc object
 */
export function createGrpcObject(config: GrpcObjectConfig) {
  try {
    const { protoFilePath, includeDirs, grpcLoader, grpc } = config;
    const packageDefinition = grpcLoader.loadSync(protoFilePath, {
      longs: String,
      includeDirs,
    });
    return grpc.loadPackageDefinition(packageDefinition);
  } catch (e) {
    if (!e.code) e.code = 'GRPC_LOAD_ERR';
    throw e;
  }
}
