// Add to your existing types.ts

export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  description: string;
  paymentMethodId: string; // References VaultItem
  status: 'pending' | 'paid' | 'expired';
  createdAt: number;
  paidAt?: number;
  recipientEmail?: string;
  invoiceLink: string; // pleasepay.me/@user/inv-xxx
  qrCode?: string;
}

export enum AppView {
  HOME = 'HOME',
  CONVERTER = 'CONVERTER',
  VAULT = 'VAULT',
  INVOICES = 'INVOICES',
  ADMIN = 'ADMIN',
  ADMIN_LOGIN = 'ADMIN_LOGIN'

}

// Update User interface to include email
export interface User {
  id: string;
  username: string; // @pleasepay_ID
  isPremium: boolean;
  walletAddress?: string;
  email?: string; // Add this
}
