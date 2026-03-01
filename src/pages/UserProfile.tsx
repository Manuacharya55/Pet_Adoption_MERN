import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { Button, Card, Badge } from '@/components/ui/common';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Settings, LogOut } from 'lucide-react';

export default function UserProfile() {
  const { user, role } = useAuth();

  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 text-center space-y-4">
              <div className="relative inline-block">
                <img 
                  src={user?.avatar} 
                  alt={user?.name} 
                  className="w-32 h-32 rounded-full object-cover border-4 border-background shadow-lg mx-auto"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-md hover:bg-primary/90">
                  <Edit2 size={14} />
                </button>
              </div>
              <div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-muted-foreground capitalize">{role}</p>
              </div>
              
              <div className="pt-6 space-y-2 border-t border-border">
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <User size={18} /> Personal Info
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <Settings size={18} /> Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10">
                  <LogOut size={18} /> Log Out
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <Card className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Personal Information</h3>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm text-muted-foreground">Full Name</label>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                    <User size={18} className="text-muted-foreground" />
                    <span className="font-medium">{user?.name}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-muted-foreground">Email Address</label>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                    <Mail size={18} className="text-muted-foreground" />
                    <span className="font-medium">alex.johnson@example.com</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-muted-foreground">Phone Number</label>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                    <Phone size={18} className="text-muted-foreground" />
                    <span className="font-medium">+1 (555) 123-4567</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-muted-foreground">Location</label>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                    <MapPin size={18} className="text-muted-foreground" />
                    <span className="font-medium">San Francisco, CA</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Adoption History</h3>
              
              <div className="relative border-l-2 border-border ml-3 space-y-8 pl-8 py-2">
                {[
                  { status: 'Approved', date: 'Oct 24, 2023', pet: 'Luna', desc: 'Adoption application approved! Schedule pickup.' },
                  { status: 'Pending', date: 'Oct 20, 2023', pet: 'Luna', desc: 'Application submitted for review.' },
                  { status: 'Visited', date: 'Sep 15, 2023', pet: 'Milo', desc: 'Visited shelter for meet & greet.' },
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-background" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h4 className="font-bold text-lg">{item.status}</h4>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar size={14} /> {item.date}
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">{item.pet}:</span> {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
