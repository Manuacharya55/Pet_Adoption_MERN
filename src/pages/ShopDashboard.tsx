import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { STATS, MOCK_PETS } from '@/data/mock';
import { Card, Button, Badge } from '@/components/ui/common';
import { 
  LayoutDashboard, Package, Users, Settings, Plus, 
  Search, Bell, MoreVertical, PawPrint, TrendingUp 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CHART_DATA = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 30 },
  { name: 'Mar', value: 20 },
  { name: 'Apr', value: 27 },
  { name: 'May', value: 18 },
  { name: 'Jun', value: 23 },
  { name: 'Jul', value: 34 },
];

export default function ShopDashboard() {
  return (
    <div className="min-h-screen bg-secondary/10 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden lg:flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <PawPrint size={18} />
            </div>
            <span className="font-display font-bold text-lg">
              Forever<span className="text-primary">Friend</span>
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-3 bg-primary/10 text-primary">
            <LayoutDashboard size={20} /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Package size={20} /> My Pets
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Users size={20} /> Adoptions
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Settings size={20} /> Settings
          </Button>
        </nav>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              PO
            </div>
            <div className="overflow-hidden">
              <p className="font-medium truncate">Pet Owner</p>
              <p className="text-xs text-muted-foreground truncate">shop@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10 px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold font-display">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 rounded-lg border border-input bg-secondary/20 focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <Link to="/">
              <Button size="sm">View Site</Button>
            </Link>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <stat.icon size={24} />
                    </div>
                    <Badge variant="secondary" className="text-green-600 bg-green-100 dark:bg-green-900/30">
                      {stat.change}
                    </Badge>
                  </div>
                  <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-muted-foreground text-sm">{stat.title}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart */}
            <Card className="lg:col-span-2 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Adoption Requests</h3>
                <Button variant="outline" size="sm">Last 7 Days</Button>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={CHART_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                      itemStyle={{ color: 'var(--foreground)' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary)' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Recent Pets</h3>
                <Button variant="ghost" size="sm" className="text-primary">View All</Button>
              </div>
              <div className="space-y-4">
                {MOCK_PETS.slice(0, 4).map((pet) => (
                  <div key={pet.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                    <img src={pet.image} alt={pet.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{pet.name}</h4>
                      <p className="text-xs text-muted-foreground">{pet.breed}</p>
                    </div>
                    <Badge variant={pet.status === 'Available' ? 'default' : 'secondary'} className="text-xs">
                      {pet.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6" variant="outline">
                <Plus size={16} className="mr-2" /> Add New Pet
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
