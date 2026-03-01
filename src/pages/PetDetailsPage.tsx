import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MOCK_PETS } from '@/data/mock';
import { Button, Badge } from '@/components/ui/common';
import { MapPin, Heart, Share2, ArrowLeft, CheckCircle, ShieldCheck, Clock } from 'lucide-react';

export default function PetDetailsPage() {
  const { id } = useParams();
  const pet = MOCK_PETS.find(p => p.id === id);

  if (!pet) {
    return <div className="pt-32 text-center">Pet not found</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Image */}
      <div className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden">
        <img 
          src={pet.image} 
          alt={pet.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute top-24 left-4 lg:left-12 z-10">
          <Link to="/pets">
            <Button variant="glass" size="sm" className="gap-2">
              <ArrowLeft size={16} /> Back to Pets
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-3xl p-8 shadow-xl border border-border"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">{pet.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin size={16} /> {pet.location}</span>
                    <span>•</span>
                    <span>{pet.breed}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 size={20} />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200">
                    <Heart size={20} />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {pet.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="px-4 py-1.5 text-sm">
                    {tag}
                  </Badge>
                ))}
                <Badge variant="outline" className="px-4 py-1.5 text-sm border-primary text-primary">
                  {pet.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Age', value: pet.age },
                  { label: 'Gender', value: pet.gender },
                  { label: 'Type', value: pet.type },
                  { label: 'Weight', value: '12 kg' }, // Mock data
                ].map((stat) => (
                  <div key={stat.label} className="bg-secondary/50 p-4 rounded-2xl text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
                    <p className="font-semibold text-lg">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold">About {pet.name}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {pet.description}
                  <br /><br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </motion.div>

            {/* Health & History */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-3xl p-8 shadow-sm border border-border"
            >
              <h3 className="text-2xl font-bold mb-6">Health & Medical History</h3>
              <div className="space-y-4">
                {[
                  { label: 'Vaccinations Up to Date', icon: CheckCircle, color: 'text-green-500' },
                  { label: 'Spayed / Neutered', icon: CheckCircle, color: 'text-green-500' },
                  { label: 'Microchipped', icon: CheckCircle, color: 'text-green-500' },
                  { label: 'Regular Vet Checkups', icon: Clock, color: 'text-blue-500' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30">
                    <item.icon className={item.color} size={24} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-3xl p-6 shadow-xl border border-border sticky top-24"
            >
              <div className="text-center mb-6">
                <p className="text-muted-foreground mb-1">Adoption Fee</p>
                <h2 className="text-4xl font-display font-bold text-primary">${pet.price}</h2>
              </div>

              <Button size="lg" className="w-full mb-4 text-lg h-14">
                Adopt {pet.name}
              </Button>
              <Button variant="outline" size="lg" className="w-full mb-6">
                Ask a Question
              </Button>

              <div className="border-t border-border pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <ShieldCheck className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Verified Shelter</h4>
                    <p className="text-xs text-muted-foreground">Paws & Claws Center</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  100% of adoption fees go directly to the care of our animals.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
