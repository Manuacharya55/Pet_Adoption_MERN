import React from 'react';
import { motion } from 'motion/react';
import { MOCK_PETS } from '@/data/mock';
import { Button, Badge } from '@/components/ui/common';
import { MapPin, Heart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  // Mock wishlist data - in a real app this would come from context/store
  const wishlistPets = MOCK_PETS.slice(0, 2); 

  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Your Wishlist</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Keep track of the pets you love.
          </p>
        </div>

        {wishlistPets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistPets.map((pet, idx) => (
              <motion.div
                key={pet.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link to={`/pets/${pet.id}`}>
                  <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={pet.image} 
                        alt={pet.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        <button className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <Badge variant="glass" className="bg-black/60 border-transparent backdrop-blur-md">
                          {pet.gender}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{pet.name}</h3>
                        <span className="text-primary font-bold">${pet.price}</span>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-4">{pet.breed} • {pet.age}</p>
                      
                      <div className="mt-auto pt-4 border-t border-border flex items-center text-muted-foreground text-sm">
                        <MapPin size={14} className="mr-1" />
                        {pet.location}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-6">Start browsing to find your new best friend.</p>
            <Link to="/pets">
              <Button>Browse Pets</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
