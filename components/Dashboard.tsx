import React, { useState, useRef, useEffect } from 'react';
import { store } from '../store';
import { User, PortfolioConfig, LayoutType, ColorTheme, FontTheme } from '../types';
import { Button } from './Button';
import { parsingService } from '../services/parsingService';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, Plus, Sparkles, LogOut, ArrowRight, Trash2, UploadCloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { PortfolioTemplates } from './PortfolioTemplates';
import { PortfolioExamples } from './PortfolioExamples';
import { ObjectivesSummaries } from './ObjectivesSummaries';
import { CareerAdvice } from './CareerAdvice';
import { Tools } from './Tools';

export const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [portfolios, setPortfolios] = useState<PortfolioConfig[]>([]);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const u = store.getUser();
    if (!u) {
      navigate('/login');
      return;
    }
    setUser(u);
    setPortfolios(store.getUserPortfolios(u.id));
  }, [navigate]);

  const handleLogout = () => {
    store.logout();
    navigate('/login');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsGenerating(true);
    try {
      // 1. Local "Server-side" Parsing
      const data = await parsingService.parseResumeFile(file);

      // 2. Randomize Theme
      const layouts: LayoutType[] = ['minimal', 'grid', 'timeline'];
      const colors: ColorTheme[] = ['indigo', 'emerald', 'rose', 'slate', 'amber'];
      const fonts: FontTheme[] = ['sans', 'serif', 'mono'];

      const randomTheme = {
        layout: layouts[Math.floor(Math.random() * layouts.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        font: fonts[Math.floor(Math.random() * fonts.length)],
      };

      // 3. Save to DB (Local Store)
      const newPortfolio: PortfolioConfig = {
        id: Math.random().toString(36).substring(2, 9),
        userId: user.id,
        createdAt: new Date().toISOString(),
        data,
        theme: randomTheme
      };

      store.savePortfolio(newPortfolio);
      setPortfolios(store.getUserPortfolios(user.id));

      // 4. Redirect to Live URL
      navigate(`/p/${newPortfolio.id}`);

    } catch (err) {
      console.error(err);
      alert("Failed to parse the file. Please try a cleaner PDF or DOCX.");
    } finally {
      setIsGenerating(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const navLinks = [
    { name: 'Portfolio Templates', id: 'templates' },
    { name: 'Portfolio Examples', id: 'examples' },
    { name: 'Objectives & Summaries', id: 'objectives' },
    { name: 'Career Advice', id: 'advice' },
    { name: 'Tools', id: 'tools' },
    { name: 'Help', id: 'help' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-slate-50">
      {/* Navbar */}
      <nav className="border-b border-white/50 bg-white/70 backdrop-blur-md sticky top-0 z-20 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('dashboard')}>
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-md shadow-indigo-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">PortoX</span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => setActiveSection(link.id)}
                className={`text-sm font-medium transition-colors ${activeSection === link.id ? 'text-indigo-600 font-bold' : 'text-slate-600 hover:text-indigo-600'}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-sm font-semibold text-slate-700">{user?.name}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Free Plan</span>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full w-10 h-10 p-0 flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeSection === 'dashboard' && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

            {/* Create Section (Sidebar) */}
            <div className="xl:col-span-1 space-y-6">
              <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-white p-8 sticky top-28">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-900">Create New</h2>
                  <div className="p-2 bg-indigo-50 rounded-full text-indigo-600">
                    <Plus className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                  Upload your resume (PDF/DOCX) to instantly generate a professional, hosted portfolio website tailored to your profile.
                </p>

                <div
                  className={`group border-2 border-dashed border-indigo-100 rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer bg-slate-50 ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:border-indigo-400 hover:bg-indigo-50/50 hover:shadow-inner'}`}
                  onClick={() => !isGenerating && fileInputRef.current?.click()}
                >
                  <div className="bg-white p-4 rounded-full shadow-md mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8 text-indigo-500" />
                  </div>
                  <p className="text-base font-semibold text-slate-900 mb-1">
                    {isGenerating ? "Parsing & Generating..." : "Upload Resume"}
                  </p>
                  <p className="text-xs text-slate-400">PDF, DOCX, or TXT (Max 5MB)</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileUpload}
                    disabled={isGenerating}
                  />
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Stats</h4>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Portfolios Created</span>
                    <span className="font-bold text-indigo-600">{portfolios.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* List Section (Main Content) */}
            <div className="xl:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-1">Your Portfolios</h2>
                  <p className="text-slate-500">Manage and customize your generated websites.</p>
                </div>
              </div>

              {portfolios.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center border border-white shadow-xl shadow-slate-100/50">
                  <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <Sparkles className="w-10 h-10 text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">No portfolios yet</h3>
                  <p className="text-slate-500 max-w-md mx-auto mb-8">
                    Ready to impress? Upload your resume on the left to create your first stunning portfolio website in seconds.
                  </p>
                  <Button onClick={() => fileInputRef.current?.click()} className="px-8 py-3 rounded-full shadow-lg shadow-indigo-200">
                    Get Started Now
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence>
                    {portfolios.map((p) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        layout
                        className="group bg-white rounded-2xl border border-white shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between h-[300px] relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500 group-hover:rotate-12"></div>

                        <div className="relative">
                          <div className="flex justify-between items-start mb-4">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200`}>
                              {p.theme.layout}
                            </span>
                            <div className={`w-3 h-3 rounded-full bg-${p.theme.color}-500 shadow-sm ring-2 ring-white`}></div>
                          </div>

                          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl mb-4 shadow-lg shadow-indigo-200">
                            {p.data.name.charAt(0)}
                          </div>

                          <h3 className="font-bold text-xl text-slate-900 truncate mb-1">{p.data.name}</h3>
                          <p className="text-sm text-slate-500 truncate font-medium">{p.data.title || "No Title"}</p>
                        </div>

                        <div className="relative pt-6 border-t border-slate-100 mt-auto">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold text-slate-400">Created</span>
                            <span className="text-xs font-bold text-slate-600">
                              {new Date(p.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <Link
                            to={`/p/${p.id}`}
                            className="flex items-center justify-center w-full py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-200 active:scale-95 duration-200"
                          >
                            View Live Site <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

          </div>
        )}
        {activeSection === 'templates' && <PortfolioTemplates />}
        {activeSection === 'examples' && <PortfolioExamples />}
        {activeSection === 'objectives' && <ObjectivesSummaries />}
        {activeSection === 'advice' && <CareerAdvice />}
        {activeSection === 'tools' && <Tools />}
        {activeSection === 'help' && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Help Center</h2>
            <p className="text-slate-500 mb-8">Need assistance? Reach out to support@portox.ai</p>
          </div>
        )}
      </main>
    </div>
  );
};