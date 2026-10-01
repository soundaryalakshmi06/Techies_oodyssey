import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {
    LayoutDashboard,
    Search,
    FileText,
    CalendarCheck,
    ShieldAlert,
    Bookmark,
    Bell,
    History,
    Receipt,
    User,
    Settings,
    HelpCircle,
    LogOut,
    Wrench,
    ToggleLeft,
    DollarSign,
    Star,
    ShieldCheck,
    Users,
    UserCheck,
    Briefcase,
    Layers,
    Activity,
    BarChart3,
} from 'lucide-react';

export const Sidebar = ({ role = 'customer', className = '' }) => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const customerNavItems = [
        { label: 'Dashboard', path: '/customer/dashboard', icon: LayoutDashboard },
        { label: 'Find Service', path: '/customer/services', icon: Search },
        { label: 'My Requests', path: '/customer/matches', icon: FileText },
        { label: 'My Bookings', path: '/customer/bookings', icon: CalendarCheck },
        { label: 'Emergency', path: '/customer/emergency', icon: ShieldAlert, badge: '24/7' },
        { label: 'Saved Professionals', path: '/customer/saved', icon: Bookmark },
        { label: 'Notifications', path: '/customer/notifications', icon: Bell },
        { label: 'Service History', path: '/customer/history', icon: History },
        { label: 'Invoices', path: '/customer/invoices/latest', icon: Receipt },
        { label: 'Profile', path: '/customer/profile', icon: User },
        { label: 'Settings', path: '/customer/settings', icon: Settings },
    ];

    const providerNavItems = [
        { label: 'Dashboard', path: '/provider/dashboard', icon: LayoutDashboard },
        { label: 'Requests', path: '/provider/requests', icon: FileText },
        { label: 'Emergency Requests', path: '/provider/emergency', icon: ShieldAlert, badge: '🚨' },
        { label: 'Bookings', path: '/provider/bookings', icon: CalendarCheck },
        { label: 'Services Offered', path: '/provider/services', icon: Wrench },
        { label: 'Availability', path: '/provider/availability', icon: ToggleLeft },
        { label: 'Earnings', path: '/provider/earnings', icon: DollarSign },
        { label: 'Reviews', path: '/provider/reviews', icon: Star },
        { label: 'Profile', path: '/provider/profile', icon: User },
        { label: 'Verification', path: '/provider/verification', icon: ShieldCheck },
        { label: 'Notifications', path: '/provider/notifications', icon: Bell },
        { label: 'Settings', path: '/provider/settings', icon: Settings },
    ];

    const adminNavItems = [
        { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Users', path: '/admin/users', icon: Users },
        { label: 'Customers', path: '/admin/customers', icon: UserCheck },
        { label: 'Providers', path: '/admin/providers', icon: Briefcase },
        { label: 'Categories', path: '/admin/categories', icon: Layers },
        { label: 'Services', path: '/admin/services', icon: Wrench },
        { label: 'Bookings', path: '/admin/bookings', icon: CalendarCheck },
        { label: 'Reviews', path: '/admin/reviews', icon: Star },
        { label: 'Activity Log', path: '/admin/activity', icon: Activity },
        { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
        { label: 'Settings', path: '/admin/settings', icon: Settings },
    ];

    const navItems = role === 'admin' ? adminNavItems : role === 'provider' ? providerNavItems : customerNavItems;

    return (
        <aside className={`w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r border-slate-800 ${className}`}>
            <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
                {/* Brand Header */}
                <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-brand-600/30">
                        V
                    </div>
                    <div>
                        <h1 className="font-extrabold text-white text-lg tracking-tight leading-none">VinaiThunai</h1>
                        <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-wider">
                            {role === 'admin' ? '🛡️ Admin Console' : role === 'provider' ? '🔧 Provider Desk' : '🏠 Home Care'}
                        </p>
                    </div>
                </div>

                {/* User Card */}
                <div className="p-4 mx-3 my-3 bg-slate-800/60 rounded-xl border border-slate-700/50 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-500 text-white font-bold text-sm flex items-center justify-center shrink-0">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-xs font-bold text-white truncate">{user?.name || 'Logged User'}</p>
                        <p className="text-[10px] text-slate-400 truncate">{user?.email || 'user@vinaithunai.com'}</p>
                    </div>
                </div>

                {/* Nav Links List */}
                <nav className="px-3 py-2 space-y-1 grow">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isEmergency = item.label.includes('Emergency');

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${isActive
                                        ? isEmergency
                                            ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                                            : 'bg-brand-600 text-white shadow-md shadow-brand-600/30 font-bold'
                                        : isEmergency
                                            ? 'text-red-400 hover:bg-red-950/40 hover:text-red-300'
                                            : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-100'
                                    }`
                                }
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                                    <span>{item.label}</span>
                                </div>
                                {item.badge && (
                                    <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded-md bg-white/20 text-white">
                                        {item.badge}
                                    </span>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            {/* Footer / Logout */}
            <div className="p-3 border-t border-slate-800/80 bg-slate-950/50">
                <button
                    type="button"
                    onClick={() => {
                        logout();
                        navigate('/login');
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors"
                >
                    <LogOut className="w-4 h-4 shrink-0" />
                    <span>Sign Out / Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
