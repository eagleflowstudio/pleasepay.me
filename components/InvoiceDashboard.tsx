import React, { useState } from 'react';
import { Plus, FileText, CheckCircle, Clock, XCircle, QrCode, ExternalLink, Download, TrendingUp } from 'lucide-react';
import { VaultItem, Invoice } from '../types';
import { decryptData } from '../services/securityService';

interface InvoiceDashboardProps {
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  vaultItems: VaultItem[];
  vaultKey: CryptoKey | null;
}

const InvoiceDashboard: React.FC<InvoiceDashboardProps> = ({
  invoices,
  setInvoices,
  vaultItems,
  vaultKey
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'USD',
    description: '',
    paymentMethodId: '',
    recipientEmail: ''
  });

  // Stats calculations
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const totalPending = invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount || !formData.paymentMethodId) {
      alert('Please fill in amount and select payment method');
      return;
    }

    // Generate unique invoice ID and link
    const invoiceId = 'inv_' + Date.now() + '_' + Math.random().toString(36).substring(7);
    const invoiceLink = `pleasepay.me/@user/${invoiceId}`;

    const newInvoice: Invoice = {
      id: invoiceId,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      description: formData.description || 'Payment Request',
      paymentMethodId: formData.paymentMethodId,
      status: 'pending',
      createdAt: Date.now(),
      recipientEmail: formData.recipientEmail,
      invoiceLink: invoiceLink,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(invoiceLink)}`
    };

    setInvoices(prev => [newInvoice, ...prev]);

    // Reset form
    setFormData({
      amount: '',
      currency: 'USD',
      description: '',
      paymentMethodId: '',
      recipientEmail: ''
    });
    setShowCreateForm(false);
  };

  const handleMarkAsPaid = (invoiceId: string) => {
    setInvoices(prev => prev.map(inv =>
      inv.id === invoiceId
        ? { ...inv, status: 'paid' as const, paidAt: Date.now() }
        : inv
    ));
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    if (confirm('Delete this invoice?')) {
      setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
    }
  };

  const getPaymentMethodName = (methodId: string) => {
    const method = vaultItems.find(item => item.id === methodId);
    return method ? method.name : 'Unknown';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center">
            <FileText className="text-blue-400 mr-3" size={32} />
            Invoice Dashboard
          </h2>
          <p className="text-slate-400 mt-1">Manage your payment requests and track earnings</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 font-semibold transition-colors shadow-lg shadow-blue-900/30"
        >
          <Plus size={20} />
          <span>Create Invoice</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Invoiced</span>
            <TrendingUp className="text-blue-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">${totalInvoiced.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-1">{invoices.length} invoices</p>
        </div>

        <div className="bg-slate-900 border border-emerald-800/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Paid</span>
            <CheckCircle className="text-emerald-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-emerald-400">${totalPaid.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-1">
            {invoices.filter(i => i.status === 'paid').length} paid
          </p>
        </div>

        <div className="bg-slate-900 border border-amber-800/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Pending</span>
            <Clock className="text-amber-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-amber-400">${totalPending.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-1">
            {invoices.filter(i => i.status === 'pending').length} awaiting payment
          </p>
        </div>
      </div>

      {/* Create Invoice Form */}
      {showCreateForm && (
        <form onSubmit={handleCreateInvoice} className="bg-slate-900 border border-slate-800 rounded-xl p-8 animate-fade-in">
          <h3 className="text-xl font-bold text-white mb-6">Create New Invoice</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Amount *</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none"
                placeholder="1000.00"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Currency *</label>
              <select
                value={formData.currency}
                onChange={e => setFormData({...formData, currency: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none"
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>BTC</option>
                <option>ETH</option>
                <option>USDC</option>
                <option>USDT</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none"
                placeholder="e.g., Website design project - Phase 1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Payment Method *</label>
              <select
                value={formData.paymentMethodId}
                onChange={e => setFormData({...formData, paymentMethodId: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none"
                required
              >
                <option value="">Select from vault...</option>
                {vaultItems.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.type})
                  </option>
                ))}
              </select>
              {vaultItems.length === 0 && (
                <p className="text-amber-400 text-xs mt-2">
                  ⚠️ Add payment methods to your vault first
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Recipient Email (optional)</label>
              <input
                type="email"
                value={formData.recipientEmail}
                onChange={e => setFormData({...formData, recipientEmail: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none"
                placeholder="client@example.com"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="px-6 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-lg font-semibold transition-colors"
            >
              Generate Invoice
            </button>
          </div>
        </form>
      )}

      {/* Invoice List */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {invoices.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="mx-auto text-slate-700 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No invoices yet</h3>
            <p className="text-slate-500 mb-6">Create your first invoice to start tracking payments</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Create First Invoice
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-950 border-b border-slate-800">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Description</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Amount</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Method</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {invoices.map(invoice => (
                  <tr key={invoice.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date(invoice.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">{invoice.description}</p>
                      {invoice.recipientEmail && (
                        <p className="text-xs text-slate-500">{invoice.recipientEmail}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white font-semibold">
                        {invoice.amount.toLocaleString()} {invoice.currency}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {getPaymentMethodName(invoice.paymentMethodId)}
                    </td>
                    <td className="px-6 py-4">
                      {invoice.status === 'paid' ? (
                        <span className="inline-flex items-center space-x-1 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium">
                          <CheckCircle size={14} />
                          <span>Paid</span>
                        </span>
                      ) : invoice.status === 'expired' ? (
                        <span className="inline-flex items-center space-x-1 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-medium">
                          <XCircle size={14} />
                          <span>Expired</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-medium">
                          <Clock size={14} />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {invoice.status === 'pending' && (
                          <button
                            onClick={() => handleMarkAsPaid(invoice.id)}
                            className="p-2 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors"
                            title="Mark as paid"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => window.open(invoice.qrCode, '_blank')}
                          className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                          title="View QR code"
                        >
                          <QrCode size={18} />
                        </button>
                        <button
                          onClick={() => navigator.clipboard.writeText(invoice.invoiceLink)}
                          className="p-2 text-purple-400 hover:bg-purple-400/10 rounded-lg transition-colors"
                          title="Copy link"
                        >
                          <ExternalLink size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteInvoice(invoice.id)}
                          className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Export Button */}
      {invoices.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              const csv = [
                ['Date', 'Description', 'Amount', 'Currency', 'Status', 'Link'],
                ...invoices.map(inv => [
                  new Date(inv.createdAt).toLocaleDateString(),
                  inv.description,
                  inv.amount,
                  inv.currency,
                  inv.status,
                  inv.invoiceLink
                ])
              ].map(row => row.join(',')).join('\n');

              const blob = new Blob([csv], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'pleasepay-invoices.csv';
              a.click();
            }}
            className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Download size={18} />
            <span>Export to CSV</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default InvoiceDashboard;
