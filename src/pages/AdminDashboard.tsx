import React from 'react';
import ShopDashboard from './ShopDashboard';

// Admin dashboard reuses the shop dashboard layout for now but with different data context in a real app
// For this prototype, we'll just export the same component or a slightly modified one.
// To keep it simple and DRY, let's just alias it for now, or create a wrapper.

export default function AdminDashboard() {
    return <ShopDashboard />;
}
