import { 
  Dog, Cat, Bird, Fish, Rabbit, ShieldCheck, Heart, 
  Activity, Users, Store, Settings, LogOut, LayoutDashboard,
  Search, Bell, Menu, X, ChevronRight, Filter, MapPin
} from 'lucide-react';

export type Pet = {
  id: string;
  name: string;
  breed: string;
  type: 'Dog' | 'Cat' | 'Bird' | 'Exotic';
  age: string;
  gender: 'Male' | 'Female';
  price: number;
  location: string;
  image: string;
  description: string;
  status: 'Available' | 'Pending' | 'Adopted';
  tags: string[];
  shopId: string;
};

export type Shop = {
  id: string;
  name: string;
  owner: string;
  location: string;
  rating: number;
  petsCount: number;
};

export const MOCK_PETS: Pet[] = [
  {
    id: '1',
    name: 'Luna',
    breed: 'Golden Retriever',
    type: 'Dog',
    age: '2 years',
    gender: 'Female',
    price: 350,
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=1000',
    description: 'Luna is a gentle soul who loves long walks and belly rubs. She is great with kids and other dogs.',
    status: 'Available',
    tags: ['Vaccinated', 'Friendly', 'Trained'],
    shopId: 's1'
  },
  {
    id: '2',
    name: 'Milo',
    breed: 'Scottish Fold',
    type: 'Cat',
    age: '1 year',
    gender: 'Male',
    price: 200,
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1000',
    description: 'Milo is a playful kitten who loves to chase laser pointers. He is very affectionate.',
    status: 'Available',
    tags: ['Indoor', 'Playful'],
    shopId: 's1'
  },
  {
    id: '3',
    name: 'Charlie',
    breed: 'French Bulldog',
    type: 'Dog',
    age: '3 years',
    gender: 'Male',
    price: 500,
    location: 'Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=1000',
    description: 'Charlie is a bundle of energy. He loves to play fetch and is very social.',
    status: 'Pending',
    tags: ['Vaccinated', 'Energetic'],
    shopId: 's2'
  },
  {
    id: '4',
    name: 'Bella',
    breed: 'Siamese',
    type: 'Cat',
    age: '2 years',
    gender: 'Female',
    price: 250,
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=1000',
    description: 'Bella is a vocal and loving cat. She enjoys being the center of attention.',
    status: 'Available',
    tags: ['Hypoallergenic', 'Vocal'],
    shopId: 's2'
  },
  {
    id: '5',
    name: 'Rio',
    breed: 'Macaw',
    type: 'Bird',
    age: '5 years',
    gender: 'Male',
    price: 800,
    location: 'Miami, FL',
    image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&q=80&w=1000',
    description: 'Rio is a colorful macaw with a big personality. He can say a few words!',
    status: 'Available',
    tags: ['Talkative', 'Exotic'],
    shopId: 's3'
  }
];

export const CATEGORIES = [
  { name: 'Dogs', icon: Dog, count: 120, image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=500' },
  { name: 'Cats', icon: Cat, count: 85, image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=500' },
  { name: 'Birds', icon: Bird, count: 40, image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&q=80&w=500' },
  { name: 'Exotic', icon: Fish, count: 25, image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&q=80&w=500' },
];

export const STATS = [
  { title: 'Total Pets', value: '2,345', change: '+12%', icon: Dog },
  { title: 'Adoptions', value: '1,203', change: '+8%', icon: Heart },
  { title: 'Active Shops', value: '45', change: '+2%', icon: Store },
  { title: 'Happy Families', value: '3,500', change: '+15%', icon: Users },
];
