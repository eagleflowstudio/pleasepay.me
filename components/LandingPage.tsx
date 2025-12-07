import React from 'react';
import { Shield, Zap, Lock, TrendingUp, Globe, FileText, ArrowRight, Check, Code, Eye, Github } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onTryConverter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onTryConverter }) => {
  return (
    <div className="w-full">
    {/* Hero Section */}
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>

    <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
    <div className="text-center max-w-4xl mx-auto">
    <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
    <Shield className="text-blue-400" size={16} />
    <span className="text-blue-300 text-sm font-medium">Zero-Knowledge Encryption • Open Source</span>
    </div>

    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
    One secure place for all your{' '}
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">
    crypto payments
    </span>
    </h1>

    <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
    Stop juggling wallets, spreadsheets, and payment apps. PleasePay.Me gives digital nomads one secure place to store payment addresses, send AI-optimized invoices, and track earnings with complete privacy.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
    <button
    onClick={onGetStarted}
    className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-2xl shadow-blue-900/50 flex items-center space-x-2"
    >
    <span>Start Free</span>
    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
    </button>
    <button
    onClick={onTryConverter}
    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
    >
    Try Currency Converter
    </button>
    </div>

    <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
    <div className="flex items-center space-x-2">
    <Check className="text-emerald-500" size={16} />
    <span>100% client-side encryption</span>
    </div>
    <div className="flex items-center space-x-2">
    <Check className="text-emerald-500" size={16} />
    <span>Zero-knowledge architecture</span>
    </div>
    <div className="flex items-center space-x-2">
    <Check className="text-emerald-500" size={16} />
    <span>Non-custodial • You own your keys</span>
    </div>
    </div>
    </div>
    </div>
    </section>

    <section className="py-20 bg-slate-900">
    <div className="max-w-7xl mx-auto px-4">
    <div className="max-w-4xl mx-auto">
    <div className="text-center mb-12">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-4">
    <Lock className="text-blue-400" size={32} />
    </div>
    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
    What is Zero-Knowledge Encryption?
    </h2>
    <p className="text-xl text-slate-400">
    Your data is encrypted on your device. We never see it. Ever.
    </p>
    </div>

    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 md:p-12 space-y-8">
    <div>
    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
    <span className="text-blue-400 mr-3">1.</span> You Control the Key
    </h3>
    <p className="text-slate-300 leading-relaxed">
    When you create an account, your device generates a unique 24-word recovery phrase (like crypto wallets).
    This phrase is your <strong className="text-white">master encryption key</strong>. You save it. We never see it.
    </p>
    </div>

    <div>
    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
    <span className="text-purple-400 mr-3">2.</span> Everything Encrypts on Your Device
    </h3>
    <p className="text-slate-300 leading-relaxed">
    Before any data leaves your browser, it's encrypted using <strong className="text-white">AES-256-GCM</strong> encryption
    (the same military-grade standard used by banks and governments). Your payment addresses, invoice details, and amounts are
    scrambled into unreadable ciphertext.
    </p>
    </div>

    <div>
    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
    <span className="text-emerald-400 mr-3">3.</span> We Only Store Encrypted Blobs
    </h3>
    <p className="text-slate-300 leading-relaxed">
    Our servers receive and store only the encrypted data. To us, it looks like random gibberish. Even if our database
    was compromised, attackers would only get useless encrypted blobs with no way to decrypt them.
    </p>
    </div>

    <div>
    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
    <span className="text-amber-400 mr-3">4.</span> Only You Can Decrypt
    </h3>
    <p className="text-slate-300 leading-relaxed">
    When you log in with your recovery phrase, your device uses it to decrypt your data locally in your browser.
    The decryption never happens on our servers. <strong className="text-white">You are the only one who can read your data.</strong>
    </p>
    </div>

    <div className="pt-6 border-t border-slate-800">
    <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
    <h4 className="text-blue-300 font-bold mb-2 flex items-center">
    <Shield className="mr-2" size={20} />
    The Trade-Off: Security vs. Recovery
    </h4>
    <p className="text-blue-100 text-sm leading-relaxed">
    Because we use true zero-knowledge encryption, <strong>if you lose your 24-word phrase, we cannot recover your data.</strong>
    This is the price of absolute privacy. No backdoors. No "reset password" that gives us access.
    Your security is in your hands.
    </p>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>

    <section className="py-20 bg-slate-950 border-y border-slate-800">
    <div className="max-w-7xl mx-auto px-4">
    <div className="max-w-4xl mx-auto">
    <div className="text-center mb-12">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 rounded-2xl mb-4">
    <Eye className="text-emerald-400" size={32} />
    </div>
    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
    Open Source & Auditable
    </h2>
    <p className="text-xl text-slate-400">
    Don't trust us. Verify us.
    </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
    <Code className="text-blue-400 mb-4" size={32} />
    <h3 className="text-xl font-bold text-white mb-3">View Our Code</h3>
    <p className="text-slate-400 mb-4 text-sm">
    Our encryption implementation is open source. Security researchers and developers can audit our code
    to verify what we claim.
    </p>
    <a
    href="https://github.com/eagleflowstudio/pleasepay.me"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
    >
    <Github size={16} />
    <span>View on GitHub</span>
    <ArrowRight size={14} />
    </a>
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
    <Shield className="text-purple-400 mb-4" size={32} />
    <h3 className="text-xl font-bold text-white mb-3">Built with Best Practices</h3>
    <ul className="space-y-2 text-sm text-slate-400">
    <li className="flex items-start">
    <Check className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
    <span>Web Crypto API (browser-native encryption)</span>
    </li>
    <li className="flex items-start">
    <Check className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
    <span>AES-256-GCM cipher with random IVs</span>
    </li>
    <li className="flex items-start">
    <Check className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
    <span>BIP-39 standard for recovery phrases</span>
    </li>
    <li className="flex items-start">
    <Check className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
    <span>No plaintext ever leaves your device</span>
    </li>
    </ul>
    </div>
    </div>

    <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
    <h3 className="text-xl font-bold text-white mb-3">Like Telegram, Signal, and 1Password</h3>
    <p className="text-slate-400 max-w-2xl mx-auto text-sm">
    We follow the same zero-knowledge principles as the most trusted privacy tools.
    Your trust should be earned through transparency, not blind faith.
    </p>
    </div>
    </div>
    </div>
    </section>

    <section className="py-20 bg-slate-950">
    <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <div>
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
    The crypto freelancer's nightmare
    </h2>
    <div className="space-y-4">
    {[
      'Payment addresses scattered across 10+ apps',
      'No way to track who paid what',
      'Sending crypto invoices via email or text',
      'Zero privacy in accounting tools',
      'High network fees eating into profits'
    ].map((problem, idx) => (
      <div key={idx} className="flex items-start space-x-3">
      <div className="mt-1 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
      <span className="text-red-400 text-sm">✕</span>
      </div>
      <p className="text-slate-400">{problem}</p>
      </div>
    ))}
    </div>
    </div>
    <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-2xl p-8">
    <h3 className="text-2xl font-bold text-white mb-6">PleasePay.Me solves this</h3>
    <div className="space-y-4">
    {[
      'All payment addresses in one encrypted vault',
      'Simple invoice tracking with manual status updates',
      'Professional payment links with QR codes',
      'Zero-knowledge encryption for complete privacy',
      'AI suggests optimal payment methods to save fees'
    ].map((solution, idx) => (
      <div key={idx} className="flex items-start space-x-3">
      <div className="mt-1 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
      <Check className="text-emerald-400" size={16} />
      </div>
      <p className="text-blue-100">{solution}</p>
      </div>
    ))}
    </div>
    </div>
    </div>
    </div>
    </section>

    <section className="py-20 bg-slate-900/50">
    <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-16">
    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
    Everything you need, nothing you don't
    </h2>
    <p className="text-slate-400 text-lg">
    Built for crypto-savvy digital nomads who value privacy
    </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all group">
    <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
    <Lock className="text-blue-400" size={28} />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">Zero-Knowledge Vault</h3>
    <p className="text-slate-400 leading-relaxed">
    Store all your crypto addresses, IBANs, and payment details with client-side AES-256 encryption. We never see your data.
    </p>
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all group">
    <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-all">
    <FileText className="text-purple-400" size={28} />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">Smart Invoicing</h3>
    <p className="text-slate-400 leading-relaxed">
    Generate professional payment requests with unique links and QR codes. Track status manually and see your total earnings.
    </p>
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/50 transition-all group">
    <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-all">
    <Zap className="text-emerald-400" size={28} />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">AI Payment Optimizer</h3>
    <p className="text-slate-400 leading-relaxed">
    Gemini AI analyzes network fees and suggests the cheapest payment method for each transaction. Save money on every invoice.
    </p>
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-amber-500/50 transition-all group">
    <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-all">
    <TrendingUp className="text-amber-400" size={28} />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">Currency Converter</h3>
    <p className="text-slate-400 leading-relaxed">
    Real-time crypto and fiat exchange rates with AI insights about market volatility and optimal timing.
    </p>
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all group">
    <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-all">
    <Globe className="text-cyan-400" size={28} />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">Global Payment Support</h3>
    <p className="text-slate-400 leading-relaxed">
    Accept payments in any crypto (BTC, ETH, USDC, USDT) or fiat currency. Perfect for international clients.
    </p>
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-rose-500/50 transition-all group">
    <div className="w-14 h-14 bg-rose-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-rose-500/20 transition-all">
    <Shield className="text-rose-400" size={28} />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">Privacy First</h3>
    <p className="text-slate-400 leading-relaxed">
    Your financial data stays encrypted on your device. No third-party access, no data mining, no surveillance.
    </p>
    </div>
    </div>
    </div>
    </section>

    <section className="py-20 bg-slate-950">
    <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-16">
    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
    Get paid in 3 simple steps
    </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="text-center">
    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-blue-500">
    <span className="text-2xl font-bold text-blue-400">1</span>
    </div>
    <h3 className="text-xl font-bold text-white mb-3">Add Payment Methods</h3>
    <p className="text-slate-400">
    Securely store all your crypto addresses and bank details in your encrypted vault
    </p>
    </div>

    <div className="text-center">
    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-purple-500">
    <span className="text-2xl font-bold text-purple-400">2</span>
    </div>
    <h3 className="text-xl font-bold text-white mb-3">Create Invoice</h3>
    <p className="text-slate-400">
    Generate a payment request with AI-suggested optimal payment method
    </p>
    </div>

    <div className="text-center">
    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-emerald-500">
    <span className="text-2xl font-bold text-emerald-400">3</span>
    </div>
    <h3 className="text-xl font-bold text-white mb-3">Share & Track</h3>
    <p className="text-slate-400">
    Send the link to your client and mark as paid when funds arrive
    </p>
    </div>
    </div>
    </div>
    </section>

    <section className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-y border-slate-800">
    <div className="max-w-4xl mx-auto px-4 text-center">
    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
    Ready to simplify your crypto payments?
    </h2>
    <p className="text-xl text-slate-300 mb-10">
    Join digital nomads who trust PleasePay.Me for secure, private payment management
    </p>
    <button
    onClick={onGetStarted}
    className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-2xl shadow-blue-900/50"
    >
    Start Free
    </button>
    <p className="text-slate-500 text-sm mt-6">
    Set up in 2 minutes • 100% free • Open source
    </p>
    </div>
    </section>
    </div>
  );
};

export default LandingPage;
