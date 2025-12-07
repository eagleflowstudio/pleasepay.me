import React from 'react';
import { ShieldCheck, Wallet, BrainCircuit, Menu, X, LogOut, FileText, ArrowRightLeft, BarChart3 } from 'lucide-react';
import { AppView, User } from '../types';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  user: User | null;
  onConnect: () => void;
  onLogout: () => void;
  isAdmin?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, user, onConnect, onLogout, isAdmin = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavItem = ({ view, label, icon: Icon }: { view: AppView; label: string; icon: any }) => (
    <button
    onClick={() => {
      setView(view);
      setIsMobileMenuOpen(false);
    }}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      currentView === view
      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
      : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`}
    >
    <Icon size={18} />
    <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
    {/* Logo */}
    <div className="flex-shrink-0 flex items-center space-x-2 cursor-pointer" onClick={() => setView(AppView.HOME)}>
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
    <ShieldCheck className="text-white" size={20} />
    </div>
    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
    PleasePay.Me
    </span>
    </div>

    {/* Desktop Nav */}
    <div className="hidden md:flex items-center space-x-2">
    <NavItem view={AppView.HOME} label="Home" icon={ShieldCheck} />
    <NavItem view={AppView.CONVERTER} label="Converter" icon={ArrowRightLeft} />
    {user && (
      <>
      <NavItem view={AppView.VAULT} label="Vault" icon={Wallet} />
      <NavItem view={AppView.INVOICES} label="Invoices" icon={FileText} />
      </>
    )}
    {user && isAdmin && (
      <NavItem view={AppView.ADMIN} label="Admin" icon={BarChart3} />
    )}
    </div>

    {/* Auth Button */}
    <div className="hidden md:flex items-center">
    {user ? (
      <div className="flex items-center space-x-4">
      <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
      {user.username}
      </span>
      <button
      onClick={onLogout}
      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
      title="Logout"
      >
      <LogOut size={18} />
      </button>
      </div>
    ) : (
      <button
      onClick={onConnect}
      className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-700 transition-all hover:border-blue-500/50"
      >
      <ShieldCheck size={18} />
      <span>Sign Up Free</span>
      </button>
    )}
    </div>

    {/* Mobile menu button */}
    <div className="md:hidden">
    <button
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    className="text-slate-400 hover:text-white p-2"
    >
    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
    </div>
    </div>
    </div>

    {/* Mobile Menu */}
    {isMobileMenuOpen && (
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2">
      <NavItem view={AppView.HOME} label="Home" icon={ShieldCheck} />
      <NavItem view={AppView.CONVERTER} label="Converter" icon={ArrowRightLeft} />
      {user && (
        <>
        <NavItem view={AppView.VAULT} label="Vault" icon={Wallet} />
        <NavItem view={AppView.INVOICES} label="Invoices" icon={FileText} />
        </>
      )}
      {user && isAdmin && (
        <NavItem view={AppView.ADMIN} label="Admin" icon={BarChart3} />
      )}
      {!user ? (
        <button
        onClick={() => {
          onConnect();
          setIsMobileMenuOpen(false);
        }}
        className="w-full flex items-center justify-center space-x-2 bg-slate-800 text-white px-4 py-3 rounded-lg mt-4"
        >
        <span>Sign Up Free</span>
        </button>
      ) : (
        <button
        onClick={() => {
          onLogout();
          setIsMobileMenuOpen(false);
        }}
        className="w-full text-left text-red-400 px-4 py-2 hover:bg-red-400/10 rounded-lg transition-colors"
        >
        Logout
        </button>
      )}
      </div>
    )}
    </nav>
  );
};

export default Navbar;
