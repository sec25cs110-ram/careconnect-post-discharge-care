import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Pill, 
  Clock, 
  Activity, 
  ShieldAlert, 
  Users, 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Search, 
  Heart, 
  Languages, 
  Sparkles, 
  Award, 
  Menu, 
  X,
  ChevronDown,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useCareConnect } from '../../context/CareConnectContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    logout, 
    unreadNotificationCount,
    language,
    setLanguage,
    showQuantexDeck,
    setShowQuantexDeck,
    demoFastForwardMode,
    setDemoFastForwardMode,
    toastMessage
  } = useCareConnect();

  const [searchQuery, setSearchQuery] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'discharge', label: 'Discharge Summary', icon: FileText },
    { id: 'medicines', label: 'My Medicines', icon: Pill },
    { id: 'reminders', label: 'Medicine Reminders', icon: Clock },
    { id: 'recovery', label: 'Recovery Tracker', icon: Activity },
    { id: 'safety', label: 'Herb–Drug Safety', icon: ShieldAlert },
    { id: 'caregivers', label: 'Caregiver Support', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotificationCount },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const currentDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-indigo-500/50 flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-600/30">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 text-base tracking-tight">CareConnect</span>
                <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  Demo Patient: Priya S.
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden md:block">Your Recovery. Our Priority.</p>
            </div>
          </div>
        </div>

        {/* Center: Search Field */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicines, symptoms, or herbal remedies..."
              className="w-full pl-10 pr-4 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Right Actions: Greeting, Lang, Deck Switcher & Profile */}
        <div className="flex items-center gap-2.5">
          {/* Date & Greeting */}
          <div className="hidden xl:block text-right text-xs pr-2 border-r border-slate-200">
            <span className="font-bold text-slate-900 block leading-tight">Good morning, {currentUser.name.split(' ')[0]}!</span>
            <span className="text-[11px] text-slate-500">{currentDateStr}</span>
          </div>

          {/* Quantex 26 Slide Deck Switcher */}
          <button
            onClick={() => setShowQuantexDeck(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-semibold transition-all cursor-pointer shadow-xs"
            title="Open official 10-Slide Quantex'26 Presentation Deck"
          >
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Presentation Deck</span>
            <span className="sm:hidden">Deck</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-md text-[11px] transition-all ${
                language === 'en' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('tanglish')}
              className={`px-2 py-1 rounded-md text-[11px] transition-all ${
                language === 'tanglish' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tanglish Conversational Audio Mode"
            >
              Tanglish
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-2 py-1 rounded-md text-[11px] transition-all ${
                language === 'ta' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Notifications Bell */}
          <button
            onClick={() => setActiveTab('notifications')}
            className="relative p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
            title="View Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 pl-2 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-teal-400 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {currentUser.name.charAt(0)}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="font-bold text-slate-900">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                  <span className="mt-1 inline-block text-[9px] px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 font-mono font-medium">
                    MRN: {currentUser.mrn}
                  </span>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Medical Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('settings');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-500" />
                    <span>Settings & Preferences</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace with Desktop Sidebar & Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Left Sidebar (11 Navigation Items) */}
        <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col justify-between p-4 shrink-0 overflow-y-auto">
          <div className="space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Recovery Navigation
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white text-indigo-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Sidebar Box: Demo Status & Logout */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            {/* Demo Fast-Forward Indicator */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-[11px] text-slate-600">
              <div className="flex items-center justify-between font-bold text-slate-800 mb-1">
                <span className="flex items-center gap-1.5 text-indigo-700">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  Demo Reminder Timer
                </span>
                <span className="text-[10px] text-teal-700 font-mono">
                  {demoFastForwardMode ? "10s Speed" : "3m Standard"}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 leading-snug">
                {demoFastForwardMode 
                  ? "Judge speed active: Countdown fires voice prompt in 10s." 
                  : "Normal 3-minute waiting period active."}
              </p>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden flex">
            <div className="w-72 bg-white h-full p-4 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                  <span className="font-bold text-sm text-slate-900">CareConnect Menu</span>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                          isActive
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500 text-white font-bold">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 space-y-2">
                <button
                  onClick={() => {
                    setShowQuantexDeck(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-xl text-xs font-bold"
                >
                  Quantex’26 10-Slide Deck
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowLogoutConfirm(true);
                  }}
                  className="w-full py-2 text-rose-600 text-xs font-bold"
                >
                  Sign Out
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
          </div>
        )}

        {/* Primary Page Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (5 core shortcuts) */}
      <nav className="lg:hidden bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around z-30">
        {[
          { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
          { id: 'medicines', label: 'Medicines', icon: Pill },
          { id: 'reminders', label: 'Reminders', icon: Clock },
          { id: 'safety', label: 'Safety', icon: ShieldAlert },
          { id: 'recovery', label: 'Recovery', icon: Activity },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors ${
                isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Sign Out of CareConnect?</h3>
                <p className="text-xs text-slate-500">Your current recovery session will be saved locally.</p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  logout();
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-colors"
              >
                Confirm Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
