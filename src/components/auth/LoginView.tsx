import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  Languages, 
  CheckCircle2, 
  UserPlus, 
  HelpCircle,
  Activity,
  Award
} from 'lucide-react';
import { useCareConnect } from '../../context/CareConnectContext';

export const LoginView: React.FC = () => {
  const { login, loginAsDemo, language, setLanguage, setShowQuantexDeck } = useCareConnect();
  
  const [email, setEmail] = useState('priya.sharma@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Auth sub-views
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  
  // Registration form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regPassConfirm, setRegPassConfirm] = useState('');

  // Forgot password form state
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPass !== regPassConfirm) {
      alert("Passwords do not match!");
      return;
    }
    login(regEmail, regPass);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setAuthMode('login');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      {/* Top Banner with Demo Badge & Quantex'26 Slide Deck Link */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-600/30">
            <Heart className="w-5 h-5 fill-white text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-900 text-lg tracking-tight">CareConnect</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                Quantex’26 Prototype
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Your Recovery. Our Priority.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Vernacular Dialect Picker */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
            <Languages className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded ${language === 'en' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'text-slate-600'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('tanglish')}
              className={`px-2 py-0.5 rounded ${language === 'tanglish' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'text-slate-600'}`}
            >
              Tanglish
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-2 py-0.5 rounded ${language === 'ta' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'text-slate-600'}`}
            >
              தமிழ்
            </button>
          </div>

          {/* Quantex 26 Presentation Button */}
          <button
            onClick={() => setShowQuantexDeck(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-semibold transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span>10-Slide Deck</span>
          </button>
        </div>
      </header>

      {/* Main Login Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Form Area (7 cols on lg, full on mobile) */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
            
            {/* View 1: Login */}
            {authMode === 'login' && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Patient Recovery Portal</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Welcome Back
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Continue your recovery journey with confidence.
                  </p>
                </div>

                {/* Judge Demo Quick Access Banner */}
                <div className="bg-gradient-to-r from-indigo-50 via-teal-50/50 to-indigo-50 border border-indigo-200/70 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block">
                      Quantex’26 Jury Evaluation
                    </span>
                    <p className="text-xs text-slate-700 font-medium">
                      One-click instant login with sample post-discharge cardiac patient data.
                    </p>
                  </div>
                  <button
                    onClick={loginAsDemo}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer"
                  >
                    <span>Explore Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700">Password</label>
                      <button
                        type="button"
                        onClick={() => setAuthMode('forgot')}
                        className="text-xs font-semibold text-indigo-600 hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Remember this device</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Footer Switcher */}
                <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
                  Don’t have an account yet?{' '}
                  <button
                    onClick={() => setAuthMode('register')}
                    className="font-bold text-indigo-600 hover:underline"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            )}

            {/* View 2: Registration */}
            {authMode === 'register' && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create CareConnect Account</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Begin monitoring your medications and post-discharge recovery.
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                      <input
                        type="password"
                        value={regPass}
                        onChange={(e) => setRegPass(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password</label>
                      <input
                        type="password"
                        value={regPassConfirm}
                        onChange={(e) => setRegPassConfirm(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs tracking-wide shadow-md transition-all mt-2"
                  >
                    Complete Registration
                  </button>
                </form>

                <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
                  Already registered?{' '}
                  <button
                    onClick={() => setAuthMode('login')}
                    className="font-bold text-indigo-600 hover:underline"
                  >
                    Back to Sign In
                  </button>
                </div>
              </div>
            )}

            {/* View 3: Forgot Password */}
            {authMode === 'forgot' && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Reset Password</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter your registered email address and we will dispatch recovery instructions.
                  </p>
                </div>

                {resetSent ? (
                  <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-teal-600 mx-auto" />
                    <p className="text-xs font-bold text-teal-900">Recovery Instructions Sent!</p>
                    <p className="text-[11px] text-teal-700">Check your inbox for password reset instructions.</p>
                  </div>
                ) : (
                  <form onSubmit={handleForgotSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Registered Email</label>
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="priya.sharma@example.com"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs tracking-wide shadow-md transition-all"
                    >
                      Send Reset Link
                    </button>
                  </form>
                )}

                <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setAuthMode('login')}
                    className="font-bold text-indigo-600 hover:underline"
                  >
                    Back to Sign In
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Healthcare Visual Showcase (Desktop Layout) */}
          <div className="hidden lg:col-span-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-300 px-2 py-0.5 rounded bg-white/10 border border-white/10">
                  Quantex’26 Project Showcase
                </span>
              </div>

              <h3 className="text-2xl font-black tracking-tight leading-snug">
                Zero-Friction Post-Discharge Care
              </h3>
              <p className="text-xs text-indigo-200 leading-relaxed">
                Empowering patients and caregivers with AI-powered medication reconciliation, 3-minute vernacular voice escalation in Tanglish, and verified herb–drug safety checking.
              </p>
            </div>

            {/* Visual Image Card */}
            <div className="relative z-10 my-4 rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/40">
              <img 
                src="/src/assets/images/mobile_vernacular_reminder_1792312875794.jpg" 
                alt="CareConnect Mobile Preview" 
                className="w-full h-56 object-cover object-top"
              />
              <div className="p-3 bg-slate-950/90 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-teal-400 font-bold block">Acoustic Escalation Active</span>
                  <span className="font-medium text-white text-xs">“Time aaiduchu, tablet podunga!”</span>
                </div>
                <span className="text-[10px] px-2 py-1 rounded bg-indigo-500/30 text-indigo-300 font-mono">
                  3-Min Voice Engine
                </span>
              </div>
            </div>

            {/* 3 Pillars */}
            <div className="relative z-10 grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-teal-300 block">OCR Parsing</span>
                <span className="text-slate-300">Discharge extraction</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-amber-300 block">Pill Photo</span>
                <span className="text-slate-300">Patient-grounded</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-indigo-300 block">Safety Engine</span>
                <span className="text-slate-300">Herb-drug checking</span>
              </div>
            </div>

            {/* Background ambient lighting */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-slate-500 border-t border-slate-200 bg-white">
        CareConnect · Team NEURALNOVA · Sri Sairam Engineering College · Quantex’26
      </footer>
    </div>
  );
};
