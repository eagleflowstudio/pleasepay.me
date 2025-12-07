import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Plus, Trash2, Shield, AlertTriangle } from 'lucide-react';
import { VaultItem } from '../types';
import { encryptData, decryptData } from '../services/securityService';

interface SmartVaultProps {
  items: VaultItem[];
  setItems: React.Dispatch<React.SetStateAction<VaultItem[]>>;
  vaultKey: CryptoKey | null;
}

const SmartVault: React.FC<SmartVaultProps> = ({ items = [], setItems, vaultKey }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemData, setNewItemData] = useState('');
  const [newItemType, setNewItemType] = useState<VaultItem['type']>('CRYPTO');
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [decryptedValues, setDecryptedValues] = useState<Record<string, string>>({});

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vaultKey || !newItemData) return;

    try {
      const { encryptedData, iv } = await encryptData(newItemData, vaultKey);
      
      const newItem: VaultItem = {
        id: crypto.randomUUID(),
        name: newItemName || 'Untitled Asset',
        type: newItemType,
        encryptedData,
        iv
      };

      setItems(prev => [...prev, newItem]);
      setNewItemName('');
      setNewItemData('');
      setShowAddForm(false);
    } catch (error) {
      console.error("Encryption failed", error);
    }
  };

  const toggleReveal = async (item: VaultItem) => {
    if (revealedIds.has(item.id)) {
      const newRevealed = new Set(revealedIds);
      newRevealed.delete(item.id);
      setRevealedIds(newRevealed);
    } else {
      if (!vaultKey) return;
      try {
        const value = await decryptData(item.encryptedData, item.iv, vaultKey);
        setDecryptedValues(prev => ({ ...prev, [item.id]: value }));
        setRevealedIds(prev => new Set(prev).add(item.id));
      } catch (error) {
        alert("Decryption failed.");
      }
    }
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  if (!vaultKey) return <div className="text-center p-8">Initializing Zero-Knowledge Environment...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-2xl font-bold text-white flex items-center">
            <Lock className="text-emerald-400 mr-2" />
            Zero-Knowledge Vault
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-lg">
            Client-side encryption (AES-256 GCM). We never see your data. Only your generated key can decrypt these assets.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={18} />
          <span>Add Asset</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddItem} className="bg-slate-900 border border-slate-800 p-6 rounded-xl animate-fade-in space-y-4">
          <h3 className="text-white font-semibold">Encrypt New Asset</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Asset Name</label>
              <input
                type="text"
                placeholder="e.g., Primary ETH Wallet"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Asset Type</label>
              <select
                value={newItemType}
                onChange={(e) => setNewItemType(e.target.value as VaultItem['type'])}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-emerald-500 outline-none"
              >
                <option value="CRYPTO">Crypto Address</option>
                <option value="IBAN">IBAN / Bank</option>
                <option value="CARD">Card Number (P2P)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Sensitive Data (Will be encrypted immediately)
            </label>
            <input
              type="text"
              placeholder="0x..."
              value={newItemData}
              onChange={(e) => setNewItemData(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white font-mono focus:border-emerald-500 outline-none"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-medium"
            >
              Encrypt & Save
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {!items || items.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-xl">
            <Shield className="mx-auto text-slate-600 mb-3" size={48} />
            <p className="text-slate-400">Your vault is empty. Add an asset to start.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between group hover:border-slate-700 transition-all">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                   {item.type === 'CRYPTO' ? '₿' : item.type === 'IBAN' ? '🏦' : '💳'}
                </div>
                <div>
                  <h4 className="text-white font-medium">{item.name}</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{item.type}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden md:block">
                  {revealedIds.has(item.id) ? (
                    <span className="font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                      {decryptedValues[item.id]}
                    </span>
                  ) : (
                    <span className="font-mono text-slate-600 bg-slate-950 px-2 py-1 rounded">
                      •••• •••• •••• ••••
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleReveal(item)}
                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                    title={revealedIds.has(item.id) ? "Hide" : "Decrypt & Reveal"}
                  >
                    {revealedIds.has(item.id) ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="bg-amber-900/20 border border-amber-900/50 rounded-lg p-4 flex items-start space-x-3">
         <AlertTriangle className="text-amber-500 flex-shrink-0" size={20} />
         <p className="text-xs text-amber-200/80">
            <strong>Security Notice:</strong> Your decryption key is held in temporary memory. 
            If you refresh the page, your vault will lock and require re-authentication (simulated in this demo). 
            In a production environment, you would input your 24-word seed phrase to unlock.
         </p>
      </div>
    </div>
  );
};

export default SmartVault;