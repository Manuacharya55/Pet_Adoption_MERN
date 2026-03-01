import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/common';
import { Menu, X, Heart, User, LogOut, LayoutDashboard, PawPrint } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { role, user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isDashboard = location.pathname.includes('/dashboard') || location.pathname.includes('/admin');

  if (isDashboard) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-4 left-0 right-0 z-50 transition-all duration-300',
        'container mx-auto px-4'
      )}
    >
      <div className={cn(
        "rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-xl shadow-lg border border-white/20" 
          : "bg-white/50 backdrop-blur-md border border-white/10"
      )}>
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
            <PawPrint size={20} />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-gray-900">
            Forever<span className="text-gray-500">Friend</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link to="/pets" className="hover:text-black transition-colors">Find a Pet</Link>
            <Link to="/categories" className="hover:text-black transition-colors">Breeds</Link>
            <Link to="/about" className="hover:text-black transition-colors">About Us</Link>
          </div>

          <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black hover:bg-gray-100 rounded-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="sm" className="bg-black text-white hover:bg-gray-800 rounded-full px-6 shadow-md">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/wishlist">
                  <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100 rounded-full">
                    <Heart size={20} />
                  </Button>
                </Link>
                
                <div className="relative group">
                  <button className="flex items-center gap-2 focus:outline-none">
                    <img src={user?.avatar} alt={user?.name} className="w-9 h-9 rounded-full border-2 border-white shadow-sm object-cover" />
                  </button>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-4 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right">
                    <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                      <p className="font-heading font-bold text-sm text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{role}</p>
                    </div>
                    <div className="p-2">
                      {role === 'user' && (
                        <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                          <User size={16} /> Profile
                        </Link>
                      )}
                      {(role === 'shopkeeper' || role === 'admin') && (
                        <Link to={role === 'admin' ? '/admin' : '/shop/dashboard'} className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                          <LayoutDashboard size={16} /> Dashboard
                        </Link>
                      )}
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        <LogOut size={16} /> Log Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 rounded-lg text-gray-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-20 left-4 right-4 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden md:hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              <Link to="/pets" className="text-lg font-medium text-gray-900" onClick={() => setMobileMenuOpen(false)}>Find a Pet</Link>
              <Link to="/categories" className="text-lg font-medium text-gray-900" onClick={() => setMobileMenuOpen(false)}>Breeds</Link>
              <div className="h-px bg-gray-100 my-2" />
              {!isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-full h-12">Log In</Button>
                  </Link>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-black text-white rounded-full h-12">Sign Up</Button>
                  </Link>
                </div>
              ) : (
                <Button variant="outline" className="w-full text-red-600 border-red-200 rounded-full h-12" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>Log Out</Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
