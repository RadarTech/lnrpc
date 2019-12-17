import { GrpcObjectConfig, NestedGrpcObject } from '../types';

/**
 * Create RPC from proto and return the GRPC package object
 * @param config The configuration necessary to create the grpc object
 */
export function createGrpcObject(config: GrpcObjectConfig) {
  try {
    const { protoFilePath, includeDirs, grpcLoader, grpc, includeDefaults } = config;
    const packageDefinition = grpcLoader.loadSync(protoFilePath, {
      longs: String,
      defaults: includeDefaults ?? false,
      includeDirs,
    });
    return grpc.loadPackageDefinition(packageDefinition) as NestedGrpcObject;
  } catch (e) {
    if (!e.code) e.code = 'GRPC_LOAD_ERR';
    throw e;
  }
}
