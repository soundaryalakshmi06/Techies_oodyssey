import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import MobileDrawer from '../components/layout/MobileDrawer';
import Footer from '../components/layout/Footer';

export const ProviderLayout = ({ children }) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
            <MobileDrawer
                isOpen={isMobileOpen}
                onClose={() => setIsMobileOpen(false)}
                role="provider"
            />

            <div className="flex grow">
                {/* Desktop Left Sidebar */}
                <Sidebar role="provider" className="hidden lg:flex" />

                {/* Main Content Area */}
                <div className="flex flex-col grow min-w-0">
                    <Header
                        onMobileMenuOpen={() => setIsMobileOpen(true)}
                        role="provider"
                    />

                    <main className="grow p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
                        {children ?? <Outlet />}
                    </main>

                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default ProviderLayout;