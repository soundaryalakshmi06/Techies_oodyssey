import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Dropdown from '../common/Dropdown';
import Badge from '../common/Badge';
import { Menu, Bell, Search, User, LogOut, ShieldAlert, Settings, HelpCircle, ShieldCheck } from 'lucide-react';

export const Header = ({ onMobileMenuOpen, role = 'customer' }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            if (role === 'customer') {
                navigate(`/customer/providers?search=${encodeURIComponent(searchQuery.trim())}`);
            }
        }
    };

    const profileMenuItems = [
        {
            label: user?.name || 'My Profile',
            icon: User,
            onClick: () => navigate(`/${role}/profile`),
        },
        {
            label: 'Account Settings',
            icon: Settings,
            onClick: () => navigate(`/${role}/settings`),
        },
        { divider: true },
        {
            label: 'Sign Out / Logout',
            icon: LogOut,
            danger: true,
            onClick: () => {
                logout();
                navigate('/login');
            },
        },
    ];

    return (
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between gap-4">
                {/* Left: Mobile Menu Toggle + Brand Logo */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onMobileMenuOpen}
                        className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                        aria-label="Open navigation menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <Link to={`/${role}/dashboard`} className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-brand-600 text-white font-extrabold flex items-center justify-center text-lg shadow-sm shadow-brand-600/30 group-hover:scale-105 transition-transform">
                            V
                        </div>
                        <div>
                            <span className="font-extrabold text-lg text-slate-900 tracking-tight block leading-none">
                                VinaiThunai
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                                {role} portal
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Middle: Global Search Bar */}
                {role === 'customer' && (
                    <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center grow max-w-md mx-4">
                        <div className="relative w-full">
                            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search for plumber, electrician, carpenter, language..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-100/80 hover:bg-slate-100 border border-slate-200 focus:border-brand-500 focus:bg-white rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                            />
                        </div>
                    </form>
                )}

                {/* Right: Notifications, Emergency Shortcut, Profile */}
                <div className="flex items-center gap-3">
                    {/* Emergency Quick Action */}
                    {role === 'customer' && (
                        <button
                            type="button"
                            onClick={() => navigate('/customer/emergency')}
                            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-bold transition-all shadow-xs"
                        >
                            <ShieldAlert className="w-4 h-4 text-red-600 animate-pulse" />
                            <span>Emergency</span>
                        </button>
                    )}

                    {/* Notifications */}
                    <button
                        type="button"
                        onClick={() => navigate(`/${role}/notifications`)}
                        className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                        title="Notifications"
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-600 animate-ping" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-600" />
                    </button>

                    {/* User Profile Dropdown */}
                    <Dropdown
                        trigger={
                            <div className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer select-none">
                                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-sm flex items-center justify-center border border-brand-200">
                                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div className="hidden sm:block text-left pr-1">
                                    <p className="text-xs font-bold text-slate-800 truncate max-w-[120px]">
                                        {user?.name || 'Account'}
                                    </p>
                                    <p className="text-[10px] text-slate-400 capitalize">{role}</p>
                                </div>
                            </div>
                        }
                        items={profileMenuItems}
                        align="right"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
