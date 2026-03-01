import React, { createContext, useContext, useState } from 'react';

type UserRole = 'guest' | 'user' | 'shopkeeper' | 'admin';

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  user: { name: string; avatar: string; email: string } | null;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('guest');
  const [email, setEmail] = useState<string>('');
  
  const user = role !== 'guest' ? {
    name: role === 'admin' ? 'Admin User' : role === 'shopkeeper' ? 'Pet Shop Owner' : 'Alex Johnson',
    email: email || 'user@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
  } : null;

  const login = (email: string, newRole: UserRole) => {
    setEmail(email);
    setRole(newRole);
  };

  const logout = () => {
    setRole('guest');
    setEmail('');
  };

  return (
    <AuthContext.Provider value={{ role, setRole, isAuthenticated: role !== 'guest', user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
