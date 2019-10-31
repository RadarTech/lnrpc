export enum AddressType {
  WITNESS_PUBKEY_HASH = 0,
  NESTED_PUBKEY_HASH = 1,
  UNUSED_WITNESS_PUBKEY_HASH = 2,
  UNUSED_NESTED_PUBKEY_HASH = 3,
}

export enum ClosureType {
  COOPERATIVE_CLOSE = 0,
  LOCAL_FORCE_CLOSE = 1,
  REMOTE_FORCE_CLOSE = 2,
  BREACH_CLOSE = 3,
  FUNDING_CANCELED = 4,
  ABANDONED = 5,
}

export enum SyncType {
  UNKNOWN_SYNC = 0,
  ACTIVE_SYNC = 1,
  PASSIVE_SYNC = 2,
}

export enum UpdateType {
  OPEN_CHANNEL = 0,
  CLOSED_CHANNEL = 1,
  ACTIVE_CHANNEL = 2,
  INACTIVE_CHANNEL = 3,
}

export enum ChannelCase {
  CHANNEL_NOT_SET = 0,
  OPEN_CHANNEL = 1,
  CLOSED_CHANNEL = 2,
  ACTIVE_CHANNEL = 3,
  INACTIVE_CHANNEL = 4,
}

export enum InvoiceState {
  OPEN = 0,
  SETTLED = 1,
  CANCELED = 2,
  ACCEPTED = 3,
}

export enum BackupCase {
  BACKUP_NOT_SET = 0,
  CHAN_BACKUPS = 1,
  MULTI_CHAN_BACKUP = 2,
}

export enum PaymentStatus {
  UNKNOWN = 0,
  IN_FLIGHT = 1,
  SUCCEEDED = 2,
  FAILED = 3,
}
