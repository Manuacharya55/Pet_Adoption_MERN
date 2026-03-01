import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Star } from 'lucide-react';
import { Pet } from '@/data/mock';

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
        <img 
          src={pet.image} 
          alt={pet.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Top Overlay Tags */}
        <div className="absolute top-4 left-4 flex gap-2">
          {pet.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-3 py-1 bg-white/30 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20">
              {tag}
            </span>
          ))}
        </div>

        {/* Rating/Status */}
        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-white/30 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20">
          <Star size={12} className="fill-white text-white" />
          <span>4.8</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-2 pt-4 pb-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
          <span className="px-3 py-1 border border-gray-200 rounded-full text-xs font-semibold text-gray-600">
            {pet.status}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span>{pet.breed}</span>
          <span>•</span>
          <span>{pet.age}</span>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">
          {pet.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-lg font-bold text-gray-900">${pet.price} <span className="text-sm font-normal text-gray-500">/ fee</span></p>
          </div>
          
          <Link to={`/pets/${pet.id}`}>
            <button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors group-hover:scale-105 duration-300">
              Adopt Now
              <ArrowUpRight size={16} />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
