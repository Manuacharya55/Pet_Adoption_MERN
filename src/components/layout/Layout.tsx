import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { motion } from 'motion/react';
import { PawPrint, Mail, Instagram, Twitter, Facebook } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <PawPrint size={18} />
              </div>
              <span className="font-display font-bold text-lg">
                Forever<span className="text-primary">Friend</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Connecting loving families with pets in need of a forever home. 
              We believe every pet deserves a second chance at happiness.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Find a Pet</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pet Care Tips</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Stay Connected</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
            </div>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full h-10 pl-4 pr-10 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="absolute right-1 top-1 h-8 w-8 rounded-md bg-primary text-white flex items-center justify-center hover:bg-primary/90">
                <Mail size={14} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2024 ForeverFriend. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
