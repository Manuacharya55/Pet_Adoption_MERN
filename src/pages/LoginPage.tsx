import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/common';
import { PawPrint, Check, Copy, ArrowRight, Lock, Mail } from 'lucide-react';

const CREDENTIALS = [
  { role: 'user', email: 'user@example.com', pass: 'user123', label: 'Pet Adopter' },
  { role: 'shopkeeper', email: 'shop@example.com', pass: 'shop123', label: 'Shop Owner' },
  { role: 'admin', email: 'admin@example.com', pass: 'admin123', label: 'Platform Admin' },
] as const;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<typeof CREDENTIALS[number]>(CREDENTIALS[0]);
  const [email, setEmail] = useState(CREDENTIALS[0].email);
  const [password, setPassword] = useState(CREDENTIALS[0].pass);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (cred: typeof CREDENTIALS[number]) => {
    setSelectedRole(cred);
    setEmail(cred.email);
    setPassword(cred.pass);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      login(email, selectedRole.role);
      setIsLoading(false);
      
      if (selectedRole.role === 'admin') navigate('/admin');
      else if (selectedRole.role === 'shopkeeper') navigate('/shop/dashboard');
      else navigate('/pets');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left Side - Visual */}
      <div className="hidden md:flex w-1/2 bg-gray-50 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522276498395-f4f68f7f8a9d?auto=format&fit=crop&q=80&w=2000" 
            alt="Login Background" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </div>
        
        <div className="relative z-10 text-white max-w-lg">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
            <PawPrint size={32} className="text-white" />
          </div>
          <h1 className="text-5xl font-heading font-bold mb-6 leading-tight">
            Welcome back to <br/>ForeverFriend.
          </h1>
          <p className="text-lg text-white/90 leading-relaxed">
            Join thousands of happy families who have found their perfect companion through our platform.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-heading font-bold text-gray-900">Sign in to your account</h2>
            <p className="text-gray-500 mt-2">Select a role to auto-fill credentials for testing.</p>
          </div>

          {/* Role Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {CREDENTIALS.map((cred) => (
              <button
                key={cred.role}
                onClick={() => handleRoleSelect(cred)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedRole.role === cred.role
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cred.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-gray-50 focus:bg-white"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-gray-50 focus:bg-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base rounded-xl bg-black hover:bg-gray-800 text-white shadow-xl shadow-black/10"
              isLoading={isLoading}
            >
              Sign In <ArrowRight size={18} className="ml-2" />
            </Button>
          </form>

          <div className="pt-6 border-t border-gray-100">
            <p className="text-xs text-center text-gray-400 uppercase tracking-wider font-semibold mb-4">
              Demo Credentials
            </p>
            <div className="grid grid-cols-1 gap-3">
              <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">U</div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">User</p>
                    <p className="text-gray-500 text-xs">user123</p>
                  </div>
                </div>
                <code className="text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-500">user@example.com</code>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">S</div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">Shop</p>
                    <p className="text-gray-500 text-xs">shop123</p>
                  </div>
                </div>
                <code className="text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-500">shop@example.com</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
