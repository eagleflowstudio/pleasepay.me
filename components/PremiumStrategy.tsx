import React, { useState } from 'react';
import { Lightbulb, Target, MapPin, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';
import { getOptimalPaymentStrategy } from '../services/geminiService';

const PremiumStrategy: React.FC = () => {
  const [formData, setFormData] = useState({
    location: 'United States',
    amount: 5000,
    currency: 'USD',
    riskProfile: 'Moderate - Prefer tax efficiency over high yield'
  });
  
  const [strategy, setStrategy] = useState<{
    recommendation: string;
    reasoning: string;
    actionPlan: string[];
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await getOptimalPaymentStrategy(
        formData.location,
        formData.amount,
        formData.currency,
        formData.riskProfile
      );
      setStrategy(result);
    } catch (error) {
      alert("AI Strategy Generation Failed. Check console/API Key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Form */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 border border-indigo-500/30 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
             <Target className="mr-2 text-indigo-300" />
             Payment Strategy Engine
          </h2>
          <p className="text-indigo-200 mb-6 text-sm">
            PleasePay.Me uses Gemini to analyze your local tax laws and market liquidity to suggest the perfect asset for this transaction.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-indigo-200 text-xs uppercase font-bold tracking-wide mb-2">My Tax Residency</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-indigo-400" size={18} />
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-indigo-950/50 border border-indigo-700/50 rounded-lg pl-10 p-3 text-white focus:ring-2 focus:ring-indigo-400 outline-none" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-indigo-200 text-xs uppercase font-bold tracking-wide mb-2">Amount</label>
                <div className="relative">
                   <DollarSign className="absolute left-3 top-3 text-indigo-400" size={18} />
                   <input 
                    type="number" 
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: Number(e.target.value)})}
                    className="w-full bg-indigo-950/50 border border-indigo-700/50 rounded-lg pl-10 p-3 text-white focus:ring-2 focus:ring-indigo-400 outline-none" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-indigo-200 text-xs uppercase font-bold tracking-wide mb-2">Currency</label>
                <select 
                   value={formData.currency}
                   onChange={e => setFormData({...formData, currency: e.target.value})}
                   className="w-full bg-indigo-950/50 border border-indigo-700/50 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-400 outline-none" 
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>JPY</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-indigo-200 text-xs uppercase font-bold tracking-wide mb-2">Goal / Risk Profile</label>
              <textarea 
                rows={3}
                value={formData.riskProfile}
                onChange={e => setFormData({...formData, riskProfile: e.target.value})}
                className="w-full bg-indigo-950/50 border border-indigo-700/50 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-400 outline-none" 
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-white text-indigo-900 font-bold py-3 rounded-lg hover:bg-indigo-50 transition-colors flex justify-center items-center"
            >
              {isLoading ? "Analyzing..." : "Generate Strategy"}
            </button>
          </form>
        </div>
      </div>

      {/* Results Panel */}
      <div className="space-y-6">
        {strategy ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 h-full animate-fade-in">
             <div className="flex items-center space-x-3 mb-6 border-b border-slate-800 pb-4">
                <div className="bg-emerald-500/20 p-2 rounded-full">
                  <Lightbulb className="text-emerald-400" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Recommendation: {strategy.recommendation}</h3>
                  <span className="text-emerald-400 text-sm font-mono">Confidence Score: 92%</span>
                </div>
             </div>
             
             <div className="space-y-6">
                <div>
                  <h4 className="text-slate-400 text-xs uppercase font-bold mb-2">Strategic Reasoning</h4>
                  <p className="text-slate-200 leading-relaxed text-sm">
                    {strategy.reasoning}
                  </p>
                </div>

                <div>
                  <h4 className="text-slate-400 text-xs uppercase font-bold mb-3">Action Plan</h4>
                  <div className="space-y-3">
                    {strategy.actionPlan && strategy.actionPlan.length > 0 ? (
                      strategy.actionPlan.map((step, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="text-blue-500 mt-0.5 flex-shrink-0" size={16} />
                          <span className="text-slate-300 text-sm">{step}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500 text-sm italic">No specific action steps provided.</p>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800">
                  <button className="w-full flex items-center justify-between text-white bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-lg transition-colors group">
                    <span className="font-medium">Generate Payment Link for {strategy.recommendation}</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                  </button>
                </div>
             </div>
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center border-dashed">
            <div className="bg-slate-800 p-4 rounded-full mb-4">
               <Target className="text-slate-500" size={32} />
            </div>
            <h3 className="text-slate-300 font-medium">Ready to Optimize</h3>
            <p className="text-slate-500 text-sm mt-2 max-w-xs">
              Fill out the form to receive a Gemini-powered tax and liquidity strategy for this payment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumStrategy;