import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import MobileDrawer from '../components/layout/MobileDrawer';
import Footer from '../components/layout/Footer';

export const AdminLayout = ({ children }) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
            <MobileDrawer
                isOpen={isMobileOpen}
                onClose={() => setIsMobileOpen(false)}
                role="admin"
            />

            <div className="flex grow">
                {/* Desktop Left Sidebar */}
                <Sidebar role="admin" className="hidden lg:flex" />

                {/* Main Content Area */}
                <div className="flex flex-col grow min-w-0">
                    <Header
                        onMobileMenuOpen={() => setIsMobileOpen(true)}
                        role="admin"
                    />

                    {/* Admin Banner Bar */}
                    <div className="bg-slate-900 text-slate-300 text-xs px-6 py-2 border-b border-slate-800 flex items-center justify-between">
                        <span className="font-bold flex items-center gap-1.5 text-amber-400">
                            🛡️ VinaiThunai Administrative Control Console
                        </span>
                        <span className="hidden md:inline text-slate-400">
                            System RBAC Enforced • Real-time Monitoring
                        </span>
                    </div>

                    <main className="grow p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
                        {children ?? <Outlet />}
                    </main>

                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;