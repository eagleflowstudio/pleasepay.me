import React, { useState, useEffect } from 'react';
import {
    Users, FileText, Wallet, TrendingUp, Activity,
    DollarSign, Globe, Zap, BarChart3, PieChart
} from 'lucide-react';

interface AdminStats {
    totalUsers: number;
    activeUsers: number;
    totalInvoices: number;
    totalVaultItems: number;
    conversionRequests: number;
    popularCurrencies: { name: string; count: number }[];
    invoicesByStatus: { status: string; count: number }[];
    userGrowth: { date: string; count: number }[];
    avgInvoicesPerUser: number;
    avgVaultItemsPerUser: number;
}

const AdminDashboard: React.FC = () => {
    // Mock data - In production, this would come from Firebase aggregated queries
    // IMPORTANT: No access to encrypted data, payment addresses, or amounts
    const [stats, setStats] = useState<AdminStats>({
        totalUsers: 1247,
        activeUsers: 892,
        totalInvoices: 3456,
        totalVaultItems: 4891,
        conversionRequests: 12483,
        popularCurrencies: [
            { name: 'USDC', count: 456 },
            { name: 'ETH', count: 389 },
            { name: 'BTC', count: 234 },
            { name: 'USDT', count: 198 },
            { name: 'EUR', count: 145 }
        ],
        invoicesByStatus: [
            { status: 'paid', count: 2103 },
            { status: 'pending', count: 1234 },
            { status: 'expired', count: 119 }
        ],
        userGrowth: [
            { date: 'Dec 1', count: 1100 },
            { date: 'Dec 2', count: 1135 },
            { date: 'Dec 3', count: 1167 },
            { date: 'Dec 4', count: 1189 },
            { date: 'Dec 5', count: 1210 },
            { date: 'Dec 6', count: 1228 },
            { date: 'Dec 7', count: 1247 }
        ],
        avgInvoicesPerUser: 2.77,
        avgVaultItemsPerUser: 3.92
    });

    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
        <div>
        <h1 className="text-3xl font-bold text-white flex items-center">
        <BarChart3 className="text-purple-400 mr-3" size={32} />
        Admin Dashboard
        </h1>
        <p className="text-slate-400 mt-1">Privacy-respecting business intelligence</p>
        </div>

        <select
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value as any)}
        className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg outline-none focus:border-blue-500"
        >
        <option value="7d">Last 7 Days</option>
        <option value="30d">Last 30 Days</option>
        <option value="90d">Last 90 Days</option>
        </select>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 flex items-start space-x-3">
        <div className="bg-blue-500/20 p-2 rounded-lg">
        <Users className="text-blue-400" size={20} />
        </div>
        <div>
        <h4 className="text-blue-300 font-medium mb-1">Zero-Knowledge Privacy Maintained</h4>
        <p className="text-blue-200 text-sm">
        This dashboard shows only aggregated, anonymized metrics. No access to encrypted vault data,
        payment addresses, invoice amounts, or user identities.
        </p>
        </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-all">
        <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
        <Users className="text-blue-400" size={24} />
        </div>
        <span className="text-emerald-400 text-sm font-medium">+12.4%</span>
        </div>
        <p className="text-3xl font-bold text-white mb-1">{stats.totalUsers.toLocaleString()}</p>
        <p className="text-slate-400 text-sm">Total Users</p>
        <p className="text-slate-500 text-xs mt-2">{stats.activeUsers} active this week</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition-all">
        <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
        <FileText className="text-purple-400" size={24} />
        </div>
        <span className="text-emerald-400 text-sm font-medium">+8.7%</span>
        </div>
        <p className="text-3xl font-bold text-white mb-1">{stats.totalInvoices.toLocaleString()}</p>
        <p className="text-slate-400 text-sm">Invoices Created</p>
        <p className="text-slate-500 text-xs mt-2">{stats.avgInvoicesPerUser.toFixed(2)} avg per user</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all">
        <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
        <Wallet className="text-emerald-400" size={24} />
        </div>
        <span className="text-emerald-400 text-sm font-medium">+15.2%</span>
        </div>
        <p className="text-3xl font-bold text-white mb-1">{stats.totalVaultItems.toLocaleString()}</p>
        <p className="text-slate-400 text-sm">Payment Methods Stored</p>
        <p className="text-slate-500 text-xs mt-2">{stats.avgVaultItemsPerUser.toFixed(2)} avg per user</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 transition-all">
        <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
        <Activity className="text-amber-400" size={24} />
        </div>
        <span className="text-emerald-400 text-sm font-medium">+22.1%</span>
        </div>
        <p className="text-3xl font-bold text-white mb-1">{stats.conversionRequests.toLocaleString()}</p>
        <p className="text-slate-400 text-sm">Converter Uses</p>
        <p className="text-slate-500 text-xs mt-2">Primary acquisition funnel</p>
        </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
        <TrendingUp className="text-blue-400 mr-2" size={20} />
        User Growth Trend
        </h3>
        <div className="space-y-3">
        {stats.userGrowth.map((day, idx) => {
            const maxCount = Math.max(...stats.userGrowth.map(d => d.count));
            const percentage = (day.count / maxCount) * 100;
            const growth = idx > 0 ? day.count - stats.userGrowth[idx - 1].count : 0;

            return (
                <div key={day.date}>
                <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">{day.date}</span>
                <span className="text-white font-medium">
                {day.count.toLocaleString()}
                {growth > 0 && (
                    <span className="text-emerald-400 text-xs ml-2">+{growth}</span>
                )}
                </span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2">
                <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
                />
                </div>
                </div>
            );
        })}
        </div>
        </div>

        {/* Popular Currencies */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
        <DollarSign className="text-emerald-400 mr-2" size={20} />
        Most Used Currencies
        </h3>
        <div className="space-y-4">
        {stats.popularCurrencies.map((currency, idx) => {
            const maxCount = Math.max(...stats.popularCurrencies.map(c => c.count));
            const percentage = (currency.count / maxCount) * 100;

            return (
                <div key={currency.name}>
                <div className="flex justify-between mb-2">
                <div className="flex items-center space-x-2">
                <span className="text-white font-medium">{currency.name}</span>
                <span className="text-xs text-slate-500">#{idx + 1}</span>
                </div>
                <span className="text-slate-400 text-sm">{currency.count} invoices</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2">
                <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                style={{ width: `${percentage}%` }}
                />
                </div>
                </div>
            );
        })}
        </div>
        </div>
        </div>

        {/* Invoice Status & Engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoice Status Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
        <PieChart className="text-purple-400 mr-2" size={20} />
        Invoice Status Distribution
        </h3>
        <div className="space-y-4">
        {stats.invoicesByStatus.map(status => {
            const total = stats.invoicesByStatus.reduce((sum, s) => sum + s.count, 0);
            const percentage = ((status.count / total) * 100).toFixed(1);
            const color = status.status === 'paid' ? 'emerald' : status.status === 'pending' ? 'amber' : 'red';

        return (
            <div key={status.status} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full bg-${color}-500`}></div>
            <span className="text-white font-medium capitalize">{status.status}</span>
            </div>
            <div className="flex items-center space-x-4">
            <span className="text-slate-400">{status.count.toLocaleString()}</span>
            <span className={`text-${color}-400 font-medium min-w-[60px] text-right`}>
            {percentage}%
            </span>
            </div>
            </div>
        );
        })}
        </div>

        <div className="mt-6 pt-6 border-t border-slate-800">
        <div className="flex justify-between text-sm">
        <span className="text-slate-400">Payment Success Rate</span>
        <span className="text-emerald-400 font-semibold">
        {((stats.invoicesByStatus[0].count / stats.totalInvoices) * 100).toFixed(1)}%
        </span>
        </div>
        </div>
        </div>

        {/* User Engagement Metrics */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
        <Zap className="text-amber-400 mr-2" size={20} />
        Engagement Metrics
        </h3>
        <div className="space-y-6">
        <div>
        <div className="flex justify-between mb-2">
        <span className="text-slate-400">Users with Vault Items</span>
        <span className="text-white font-medium">87.3%</span>
        </div>
        <div className="w-full bg-slate-950 rounded-full h-2">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '87.3%' }} />
        </div>
        </div>

        <div>
        <div className="flex justify-between mb-2">
        <span className="text-slate-400">Users with Invoices</span>
        <span className="text-white font-medium">71.5%</span>
        </div>
        <div className="w-full bg-slate-950 rounded-full h-2">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '71.5%' }} />
        </div>
        </div>

        <div>
        <div className="flex justify-between mb-2">
        <span className="text-slate-400">Converter to Signup Rate</span>
        <span className="text-white font-medium">12.8%</span>
        </div>
        <div className="w-full bg-slate-950 rounded-full h-2">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full" style={{ width: '12.8%' }} />
        </div>
        </div>

        <div>
        <div className="flex justify-between mb-2">
        <span className="text-slate-400">Weekly Active Users</span>
        <span className="text-white font-medium">71.5%</span>
        </div>
        <div className="w-full bg-slate-950 rounded-full h-2">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full" style={{ width: '71.5%' }} />
        </div>
        </div>
        </div>
        </div>
        </div>

        {/* System Health */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
        <Activity className="text-emerald-400 mr-2" size={20} />
        System Health & Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="text-center">
        <div className="text-3xl font-bold text-emerald-400 mb-1">99.8%</div>
        <p className="text-slate-400 text-sm">Uptime</p>
        </div>
        <div className="text-center">
        <div className="text-3xl font-bold text-blue-400 mb-1">1.2s</div>
        <p className="text-slate-400 text-sm">Avg Response Time</p>
        </div>
        <div className="text-center">
        <div className="text-3xl font-bold text-purple-400 mb-1">0</div>
        <p className="text-slate-400 text-sm">Data Breaches</p>
        </div>
        <div className="text-center">
        <div className="text-3xl font-bold text-amber-400 mb-1">100%</div>
        <p className="text-slate-400 text-sm">ZKE Compliance</p>
        </div>
        </div>
        </div>
        </div>
    );
};

export default AdminDashboard;
