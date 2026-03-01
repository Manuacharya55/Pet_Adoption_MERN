import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MOCK_PETS } from '@/data/mock';
import { Button } from '@/components/ui/common';
import { PetCard } from '@/components/ui/PetCard';
import { Search, Filter } from 'lucide-react';

export default function PetsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredPets = MOCK_PETS.filter(pet => {
    const matchesType = filter === 'All' || pet.type === filter;
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase()) || 
                          pet.breed.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Find Your Companion</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Browse through our list of adorable pets waiting for a loving home.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {['All', 'Dog', 'Cat', 'Bird', 'Exotic'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  filter === type 
                    ? 'bg-black text-white shadow-lg shadow-black/10' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or breed..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPets.map((pet, idx) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <PetCard pet={pet} />
            </motion.div>
          ))}
        </div>

        {filteredPets.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">No pets found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
            <Button 
              variant="outline" 
              className="mt-6 rounded-full border-gray-300 hover:bg-gray-50 text-gray-900"
              onClick={() => { setFilter('All'); setSearch(''); }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
