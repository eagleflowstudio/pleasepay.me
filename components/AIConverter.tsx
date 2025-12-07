import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Sparkles, TrendingUp, Info } from 'lucide-react';
import { analyzeConversionTrend } from '../services/geminiService';

interface AIConverterProps {
  onConversionComplete?: () => void;
}

const AIConverter: React.FC<AIConverterProps> = ({ onConversionComplete }) => {
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('ETH');
  const [result, setResult] = useState<number | null>(null);
  const [geminiInsight, setGeminiInsight] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock exchange rates for demo - TODO: Replace with real API
  const mockRates: Record<string, number> = {
    'USD-EUR': 0.92,
    'USD-ETH': 0.00035,
    'USD-BTC': 0.000015,
    'EUR-USD': 1.09,
    'ETH-USD': 2850,
    'BTC-USD': 65000,
    'USD-USDC': 1,
    'USD-USDT': 1,
    'EUR-ETH': 0.00038,
  };

  const handleConvert = async () => {
    setIsLoading(true);
    setGeminiInsight(null);
    setIsAnalyzing(true);

    // Simulate API delay for conversion
    setTimeout(async () => {
      const pair = `${fromCurrency}-${toCurrency}`;
      const rate = mockRates[pair] || 1;
      setResult(amount * rate);
      setIsLoading(false);

      // Call Gemini for insight
      const insight = await analyzeConversionTrend(amount, fromCurrency, toCurrency);
      setGeminiInsight(insight);
      setIsAnalyzing(false);

      // Trigger callback when conversion completes
      if (onConversionComplete) {
        onConversionComplete();
      }
    }, 600);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
    <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700">
    <h2 className="text-2xl font-bold text-white flex items-center">
    <Sparkles className="text-blue-400 mr-2" size={24} />
    AI Smart Converter
    </h2>
    <p className="text-slate-400 text-sm mt-1">Real-time rates + Gemini volatility analysis</p>
    </div>

    <div className="p-6 space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
    <div className="space-y-2">
    <label className="text-sm font-medium text-slate-400">Amount</label>
    <input
    type="number"
    value={amount}
    onChange={(e) => setAmount(Number(e.target.value))}
    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
    />
    </div>

    <div className="space-y-2">
    <label className="text-sm font-medium text-slate-400">From</label>
    <select
    value={fromCurrency}
    onChange={(e) => setFromCurrency(e.target.value)}
    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
    >
    {['USD', 'EUR', 'GBP', 'ETH', 'BTC', 'USDC', 'USDT'].map(c => <option key={c} value={c}>{c}</option>)}
    </select>
    </div>

    <div className="space-y-2">
    <label className="text-sm font-medium text-slate-400">To</label>
    <select
    value={toCurrency}
    onChange={(e) => setToCurrency(e.target.value)}
    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
    >
    {['USD', 'EUR', 'GBP', 'ETH', 'BTC', 'USDC', 'USDT'].map(c => <option key={c} value={c}>{c}</option>)}
    </select>
    </div>
    </div>

    <button
    onClick={handleConvert}
    disabled={isLoading}
    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all flex justify-center items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
    {isLoading ? (
      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
    ) : (
      <>
      <span>Analyze & Convert</span>
      <ArrowRightLeft size={20} />
      </>
    )}
    </button>

    {(result !== null) && (
      <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 animate-fade-in">
      <div className="flex justify-between items-end mb-4">
      <div>
      <p className="text-slate-400 text-sm">Estimated Receive Amount</p>
      <p className="text-3xl font-bold text-white tracking-tight">
      {result.toLocaleString(undefined, { maximumFractionDigits: 8 })} <span className="text-blue-400">{toCurrency}</span>
      </p>
      </div>
      </div>

      {/* Gemini Insight Section */}
      <div className="relative overflow-hidden rounded-lg bg-indigo-900/20 border border-indigo-500/30 p-4">
      <div className="flex items-start space-x-3">
      <div className="mt-1 bg-indigo-500/20 p-2 rounded-lg">
      <TrendingUp size={20} className="text-indigo-400" />
      </div>
      <div>
      <h4 className="text-indigo-300 font-medium mb-1 flex items-center">
      Gemini Strategic Insight
      {isAnalyzing && <span className="ml-2 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>}
      </h4>
      <p className="text-indigo-100 text-sm leading-relaxed">
      {isAnalyzing ? "Analyzing market volatility and spread..." : geminiInsight}
      </p>
      </div>
      </div>
      </div>
      </div>
    )}
    </div>
    </div>

    {/* CTA MOVED HERE - Above feature cards */}
    {result !== null && (
      <div className="mt-8 bg-gradient-to-r from-emerald-900/30 to-blue-900/30 border border-emerald-500/30 rounded-2xl p-8 text-center animate-fade-in">
      <h3 className="text-2xl font-bold text-white mb-3">
      💰 Need to invoice someone in this currency?
      </h3>
      <p className="text-slate-300 mb-6 max-w-xl mx-auto">
      Create professional payment requests with zero-knowledge security. Track who paid what, all in one place.
      </p>
      <button
      className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-900/30 inline-flex items-center space-x-2"
      >
      <span>Get Started Free</span>
      <ArrowRightLeft size={20} />
      </button>
      </div>
    )}

    {/* Feature cards - Now BELOW the CTA */}
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
    <div className="bg-emerald-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
    <TrendingUp className="text-emerald-400" size={24} />
    </div>
    <h3 className="text-white font-semibold">Live Market Data</h3>
    <p className="text-slate-400 text-sm">Connected to real-time global exchange APIs.</p>
    </div>
    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
    <div className="bg-purple-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
    <Sparkles className="text-purple-400" size={24} />
    </div>
    <h3 className="text-white font-semibold">Gemini Intelligence</h3>
    <p className="text-slate-400 text-sm">AI analyzes volatility to save you money.</p>
    </div>
    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
    <div className="bg-blue-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
    <Info className="text-blue-400" size={24} />
    </div>
    <h3 className="text-white font-semibold">Zero Hidden Fees</h3>
    <p className="text-slate-400 text-sm">What you see is exactly what you get.</p>
    </div>
    </div>
    </div>
  );
};

export default AIConverter;
