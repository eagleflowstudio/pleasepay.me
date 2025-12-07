import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AIConverter from './components/AIConverter';
import SmartVault from './components/SmartVault';
import InvoiceDashboard from './components/InvoiceDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { AppView, User, VaultItem, Invoice } from './types';
import { generateVaultKey } from './services/securityService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [vaultKey, setVaultKey] = useState<CryptoKey | null>(null);
  const [vaultItems, setVaultItems] = useState<VaultItem[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [showConverterCTA, setShowConverterCTA] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Helper: Map AppView to URL path
  const viewToPath = (view: AppView): string => {
    const pathMap: Record<AppView, string> = {
      [AppView.HOME]: '/',
      [AppView.CONVERTER]: '/converter',
      [AppView.VAULT]: '/vault',
      [AppView.INVOICES]: '/invoices',
      [AppView.ADMIN]: '/dashboard-analytics',
      [AppView.ADMIN_LOGIN]: '/dashboard-analytics'
    };
    return pathMap[view] || '/';
  };

  // Helper: Map URL path to AppView
  const pathToView = (path: string): AppView => {
    const viewMap: Record<string, AppView> = {
      '/': AppView.HOME,
      '/converter': AppView.CONVERTER,
      '/vault': AppView.VAULT,
      '/invoices': AppView.INVOICES,
      '/dashboard-analytics': AppView.ADMIN_LOGIN
    };
    return viewMap[path] || AppView.HOME;
  };

  // Helper: Set view and update URL
  const setViewAndUrl = (view: AppView) => {
    setCurrentView(view);
    const path = viewToPath(view);
    window.history.pushState({}, '', path);
  };

  // Check admin status on load
  useEffect(() => {
    const adminStatus = localStorage.getItem('pleasepay_admin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Initialize view from URL on mount
  useEffect(() => {
    const path = window.location.pathname;

    if (path === '/dashboard-analytics') {
      if (localStorage.getItem('pleasepay_admin') === 'true') {
        setCurrentView(AppView.ADMIN);
      } else {
        setCurrentView(AppView.ADMIN_LOGIN);
      }
    } else {
      const view = pathToView(path);
      setCurrentView(view);
    }
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const view = pathToView(path);
      setCurrentView(view);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle wallet connection and key generation
  const handleConnect = async () => {
    const mockUser: User = {
      id: 'u_' + Date.now(),
      username: '@pleasepay_cuahtli',
      isPremium: true,
      walletAddress: '0x' + Math.random().toString(16).substring(2, 10),
      email: 'cuahtli@pleasepay.me'
    };
    setUser(mockUser);

    const key = await generateVaultKey();
    setVaultKey(key);

    setViewAndUrl(AppView.VAULT);
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    handleConnect();
    setViewAndUrl(AppView.ADMIN);
  };

  const handleLogout = () => {
    setUser(null);
    setVaultKey(null);
    setVaultItems([]);
    setInvoices([]);
    localStorage.removeItem('pleasepay_admin');
    setIsAdmin(false);
    setViewAndUrl(AppView.HOME);
  };

  // Show CTA after user uses converter
  const handleConverterUsed = () => {
    if (!user) {
      setShowConverterCTA(true);
    }
  };

  // Handle invoice creation from converter page
  const handleCreateInvoiceFromConverter = (amount: number, currency: string) => {
    if (!user) {
      alert('Please sign up to create invoices');
      handleConnect();
      return;
    }
    setViewAndUrl(AppView.INVOICES);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
    <Navbar
    currentView={currentView}
    setView={setViewAndUrl}
    user={user}
    onConnect={handleConnect}
    onLogout={handleLogout}
    isAdmin={isAdmin}
    />

    <main className="flex-grow overflow-y-auto">
    <div className="w-full">

    {/* Admin Login Page */}
    {currentView === AppView.ADMIN_LOGIN && (
      <AdminLogin onLoginSuccess={handleAdminLogin} />
    )}

    {/* Landing Page - Home */}
    {currentView === AppView.HOME && (
      <LandingPage onGetStarted={handleConnect} onTryConverter={() => setViewAndUrl(AppView.CONVERTER)} />
    )}

    {/* Converter Page - Separate with CTAs */}
    {currentView === AppView.CONVERTER && (
      <div className="max-w-7xl mx-auto px-4 py-8">
      <AIConverter onConversionComplete={handleConverterUsed} />

      {/* Next Steps CTA */}
      {showConverterCTA && !user && (
        <div className="mt-12 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-2xl p-8 text-center animate-fade-in">
        <h3 className="text-2xl font-bold text-white mb-3">
        Need to invoice someone in this currency?
        </h3>
        <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
        Create a free account to generate professional crypto invoices,
        store payment addresses securely, and track all your earnings in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
        onClick={handleConnect}
        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-blue-900/30"
        >
        Create Free Account
        </button>
        <button
        onClick={() => setViewAndUrl(AppView.HOME)}
        className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
        >
        Learn More
        </button>
        </div>
        </div>
      )}

      {/* For logged-in users: Quick invoice creation */}
      {user && (
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
        <p className="text-slate-400 mb-4">
        Ready to request payment in this currency?
        </p>
        <button
        onClick={() => setViewAndUrl(AppView.INVOICES)}
        className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
        Create Invoice
        </button>
        </div>
      )}
      </div>
    )}

    {/* Smart Vault - Authenticated Only */}
    {currentView === AppView.VAULT && user && (
      <div className="max-w-7xl mx-auto px-4 py-8">
      <SmartVault
      items={vaultItems}
      setItems={setVaultItems}
      vaultKey={vaultKey}
      />

      {/* Guide user to next step after adding payment methods */}
      {vaultItems.length > 0 && invoices.length === 0 && (
        <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 flex items-start space-x-4">
        <div className="bg-blue-500/20 p-3 rounded-lg">
        <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        </div>
        <div className="flex-1">
        <h4 className="text-white font-semibold mb-1">Great! Your payment addresses are secure.</h4>
        <p className="text-blue-200 text-sm mb-3">
        Next step: Create your first invoice and start getting paid.
        </p>
        <button
        onClick={() => setViewAndUrl(AppView.INVOICES)}
        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
        Create First Invoice →
        </button>
        </div>
        </div>
      )}
      </div>
    )}

    {/* Invoice Dashboard - Authenticated Only */}
    {currentView === AppView.INVOICES && user && (
      <div className="max-w-7xl mx-auto px-4 py-8">
      <InvoiceDashboard
      invoices={invoices}
      setInvoices={setInvoices}
      vaultItems={vaultItems}
      vaultKey={vaultKey}
      />
      </div>
    )}

    {/* Admin Dashboard - Restricted */}
    {currentView === AppView.ADMIN && isAdmin && user && (
      <div className="w-full">
      <AdminDashboard />
      </div>
    )}

    {/* Auth Guard for Protected Routes */}
    {(currentView !== AppView.HOME && currentView !== AppView.CONVERTER && currentView !== AppView.ADMIN_LOGIN && !user) && (
      <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center bg-slate-900 rounded-2xl border border-slate-800 p-12">
      <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
      <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">Access Restricted</h2>
      <p className="text-slate-400 mb-8 max-w-md mx-auto">
      Create a free account to access your secure vault, create invoices, and track payments with zero-knowledge encryption.
      </p>
      <button
      onClick={handleConnect}
      className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-blue-900/30"
      >
      Create Free Account
      </button>
      </div>
      </div>
    )}
    </div>
    </main>

    <footer className="border-t border-slate-900 py-8 mt-auto bg-slate-950">
    <div className="max-w-7xl mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
    <div className="text-slate-600 text-sm">
    &copy; {new Date().getFullYear()} PleasePay.Me. All rights reserved.
    </div>
    <div className="flex items-center space-x-6 text-sm">
    <span className="text-slate-600">Non-Custodial</span>
    <span className="text-slate-600">•</span>
    <span className="text-slate-600">Zero-Knowledge Encryption</span>
    <span className="text-slate-600">•</span>
    <span className="text-slate-600">Privacy First</span>
    </div>
    </div>
    </div>
    </footer>
    </div>
  );
};

export default App;
