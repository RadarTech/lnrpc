import { Readable } from '../streams';
import { Invoice, RouteHint } from './ln-rpc';

export interface SubscribeSingleInvoiceRequest {
  rHash: Buffer | string;
}

export interface CancelInvoiceMsg {
  paymentHash: Buffer | string;
}

export interface AddHoldInvoiceRequest {
  memo?: string;
  hash?: Buffer | string;
  value?: number;
  descriptionHash?: Buffer | string;
  expiry?: number;
  fallbackAddr?: string;
  cltvExpiry?: number;
  routeHints?: RouteHint[];
  private?: boolean;
}

export interface AddHoldInvoiceResp {
  paymentRequest: string;
}

export interface SettleInvoiceMsg {
  preimage: Buffer | string;
}

/**
 * LND Invoices gRPC API Client
 */
export interface InvoicesRpc {
  /**
   * subscribeSingleInvoice returns a uni-directional stream (server -> client)
   * to notify the client of state transitions of the specified invoice.
   * Initially the current invoice state is always sent out.
   */
  subscribeSingleInvoice(args: SubscribeSingleInvoiceRequest): Readable<Invoice>;

  /**
   * cancelInvoice cancels a currently open invoice. If the invoice is already
   * canceled, this call will succeed. If the invoice is already settled, it will
   * fail.
   */
  cancelInvoice(args: CancelInvoiceMsg): Promise<{}>;

  /**
   * addHoldInvoice creates a hold invoice. It ties the invoice to the hash
   * supplied in the request.
   */
  addHoldInvoice(args: AddHoldInvoiceRequest): Promise<AddHoldInvoiceResp>;

  /**
   * settleInvoice settles an accepted invoice. If the invoice is already
   * settled, this call will succeed.
   */
  settleInvoice(args: SettleInvoiceMsg): Promise<{}>;
}
