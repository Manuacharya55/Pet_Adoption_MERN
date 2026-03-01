import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/common';
import { MOCK_PETS, CATEGORIES } from '@/data/mock';
import { PetCard } from '@/components/ui/PetCard';
import { ChevronRight, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Clean Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 bg-white inline-block mb-6">
                  ✨ The #1 Pet Adoption Platform
                </span>
                <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                  Find your new <br />
                  <span className="text-gray-400 italic font-serif">best friend.</span>
                </h1>
                <p className="text-xl text-gray-500 max-w-lg mt-6 leading-relaxed">
                  Connect with thousands of pets waiting for a loving home. 
                  Simple, transparent, and trusted by families everywhere.
                </p>
                
                <div className="flex flex-wrap gap-4 mt-8">
                  <Link to="/pets">
                    <Button size="lg" className="rounded-full h-14 px-8 text-lg bg-black hover:bg-gray-800 text-white shadow-xl shadow-black/10">
                      Start Browsing
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-gray-200 hover:bg-gray-50">
                      How it works
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-8 mt-12">
                  <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">2,000+ Adoptions</p>
                    <p className="text-sm text-gray-500">this month alone</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6 mt-12">
                    <img 
                      src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600" 
                      className="rounded-[2rem] w-full h-64 object-cover shadow-2xl"
                      alt="Dog"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600" 
                      className="rounded-[2rem] w-full h-80 object-cover shadow-2xl"
                      alt="Cat"
                    />
                  </div>
                  <div className="space-y-6">
                    <img 
                      src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=600" 
                      className="rounded-[2rem] w-full h-80 object-cover shadow-2xl"
                      alt="Puppy"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600" 
                      className="rounded-[2rem] w-full h-64 object-cover shadow-2xl"
                      alt="Dog"
                    />
                  </div>
                </div>
              </motion.div>
              
              {/* Abstract blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-50 to-orange-50 rounded-full blur-3xl -z-10 opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Strip */}
      <section className="py-12 border-y border-gray-100 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center overflow-x-auto gap-8 no-scrollbar pb-4 md:pb-0">
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="flex items-center gap-4 group cursor-pointer min-w-fit">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 group-hover:bg-black transition-colors flex items-center justify-center text-gray-900 group-hover:text-white">
                  <cat.icon size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <p className="text-sm text-gray-500">{cat.count} listings</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pets Grid */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Newest Arrivals</h2>
              <p className="text-gray-500 text-lg">Meet the latest pets looking for a forever home.</p>
            </div>
            <Link to="/pets">
              <Button variant="ghost" className="text-lg font-medium hover:bg-transparent hover:text-primary p-0 flex items-center gap-2">
                View all pets <ArrowRight size={20} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_PETS.slice(0, 3).map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-black rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-white">Ready to change a life?</h2>
              <p className="text-xl text-gray-400">
                Adopting a pet is one of the most rewarding experiences. 
                Start your journey today.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/pets">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100 rounded-full h-14 px-10 text-lg">
                    Find a Pet
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
        </div>
      </section>
    </div>
  );
}
