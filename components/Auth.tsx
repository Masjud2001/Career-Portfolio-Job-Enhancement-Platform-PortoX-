import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../store';
import { Button } from './Button';
import { TeamSection } from './TeamSection';
import { Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const teamSectionRef = useRef<HTMLDivElement>(null);
  const loginSectionRef = useRef<HTMLDivElement>(null);

  const scrollToTeam = () => {
    teamSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLogin = () => {
    loginSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (email.toLowerCase() !== 'abdul@gmail.com') {
      setError('Access restricted: Invalid email.');
      return;
    }

    setError('');
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      store.login(email);
      setLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="bg-indigo-600 overflow-x-hidden">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center z-10"
        >
          <div className="inline-block bg-white/10 backdrop-blur-md p-4 rounded-3xl mb-6 border border-white/20">
            <Sparkles className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-7xl font-extrabold text-white mb-6 tracking-tight">
            PortoX
          </h1>
          <p className="text-xl text-indigo-100 mb-12 max-w-lg mx-auto leading-relaxed">
            The AI-powered portfolio builder that turns your experience into a stunning showcase.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={scrollToTeam}
              className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
            >
              Let's Go <ChevronDown className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>

        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Team Section */}
      <div ref={teamSectionRef} className="min-h-screen flex flex-col items-center justify-center py-20 relative">
        <TeamSection />
        <div className="mt-12">
          <button
            onClick={scrollToLogin}
            className="text-white border border-white/30 px-6 py-3 rounded-full hover:bg-white/10 transition flex items-center gap-2"
          >
            Continue to Login <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Login Section */}
      <div ref={loginSectionRef} className="min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-zinc-100 p-8 z-10"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Welcome Back</h2>
            <p className="text-zinc-500 text-sm">
              Sign in to your PortoX account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1">Email address</label>
              <input
                type="email"
                id="email"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <Button type="submit" className="w-full py-2.5" isLoading={loading}>
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-indigo-200">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </div>
        </motion.div>

        <div className="mt-12 text-center text-indigo-200 text-sm">
          &copy; {new Date().getFullYear()} PortoX. All rights reserved.
        </div>
      </div>
    </div>
  );
};