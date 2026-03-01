import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Layout } from '@/components/layout/Layout';
import LandingPage from '@/pages/LandingPage';
import PetsPage from '@/pages/PetsPage';
import PetDetailsPage from '@/pages/PetDetailsPage';
import CategoriesPage from '@/pages/CategoriesPage';
import UserProfile from '@/pages/UserProfile';
import ShopDashboard from '@/pages/ShopDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import WishlistPage from '@/pages/WishlistPage';
import LoginPage from '@/pages/LoginPage';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
  const { role } = useAuth();
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/pets" element={<PetsPage />} />
              <Route path="/pets/:id" element={<PetDetailsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              
              {/* Protected User Routes */}
              <Route path="/profile" element={
                <ProtectedRoute allowedRoles={['user', 'shopkeeper', 'admin']}>
                  <UserProfile />
                </ProtectedRoute>
              } />
              <Route path="/wishlist" element={
                <ProtectedRoute allowedRoles={['user', 'shopkeeper', 'admin']}>
                  <WishlistPage />
                </ProtectedRoute>
              } />
            </Route>

            {/* Dashboard Routes (No Main Layout) */}
            <Route path="/shop/dashboard" element={
              <ProtectedRoute allowedRoles={['shopkeeper', 'admin']}>
                <ShopDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
