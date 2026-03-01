import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CATEGORIES } from '@/data/mock';
import { ChevronRight } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Browse Categories</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover pets by type and find the perfect match for your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to="/pets" className="group block relative h-80 rounded-3xl overflow-hidden shadow-lg">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <cat.icon size={20} />
                      </div>
                      <h2 className="text-3xl font-bold text-white">{cat.name}</h2>
                    </div>
                    <p className="text-white/70">{cat.count} Pets Available</p>
                  </div>
                  
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <ChevronRight size={24} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
