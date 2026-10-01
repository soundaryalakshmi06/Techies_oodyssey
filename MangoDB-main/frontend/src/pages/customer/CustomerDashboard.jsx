import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { fetchCategoriesThunk } from '../../store/slices/categorySlice';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import ServiceCard from '../../components/common/ServiceCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import {
    Search,
    ShieldAlert,
    Wrench,
    Zap,
    CalendarCheck,
    Bell,
    ArrowRight,
    ShieldCheck,
    Star,
    Clock,
    Sparkles,
} from 'lucide-react';

export const CustomerDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { categories, loading: categoriesLoading } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategoriesThunk());
    }, [dispatch]);

    const defaultCategories = [
        { _id: 'c1', name: 'Plumbing Repair', description: 'Leaks, taps, drainage, pipe fitting', slug: 'plumbing' },
        { _id: 'c2', name: 'Electrical Works', description: 'Wiring, short circuit, lights, switches', slug: 'electrical' },
        { _id: 'c3', name: 'Carpentry & Furniture', description: 'Doorlocks, hinges, furniture repair', slug: 'carpentry' },
        { _id: 'c4', name: 'AC & Appliance', description: 'AC service, fridge, washing machine', slug: 'appliance' },
    ];

    const categoryList = categories && categories.length > 0 ? categories : defaultCategories;

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
                <div className="relative z-10 space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-700/80 border border-brand-500/30 text-brand-200 text-xs font-semibold">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Language Preference: {user?.preferredLanguage || 'Tamil'}</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                        Welcome back, {user?.name || 'Customer'}! 👋
                    </h1>

                    <p className="text-sm text-slate-300 leading-relaxed">
                        Need home repairs today? Find background-verified local specialists who speak your language.
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                        <Button
                            variant="primary"
                            icon={Search}
                            onClick={() => navigate('/customer/services')}
                            className="shadow-lg shadow-brand-600/30"
                        >
                            Find a Service Professional
                        </Button>
                        <Button
                            variant="emergency"
                            icon={ShieldAlert}
                            onClick={() => navigate('/customer/emergency')}
                        >
                            24/7 Emergency Help
                        </Button>
                    </div>
                </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <button
                    type="button"
                    onClick={() => navigate('/customer/providers?category=Plumbing')}
                    className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-brand-500 hover:shadow-md transition-all text-left group"
                >
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Wrench className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">Plumber</h4>
                    <p className="text-xs text-slate-500">Tap, leaks & pipes</p>
                </button>

                <button
                    type="button"
                    onClick={() => navigate('/customer/providers?category=Electrical')}
                    className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-brand-500 hover:shadow-md transition-all text-left group"
                >
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">Electrician</h4>
                    <p className="text-xs text-slate-500">Power & wiring</p>
                </button>

                <button
                    type="button"
                    onClick={() => navigate('/customer/emergency')}
                    className="p-4 bg-red-50 rounded-2xl border border-red-200 shadow-sm hover:bg-red-100 transition-all text-left group"
                >
                    <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center mb-2 group-hover:scale-110 transition-transform animate-pulse">
                        <ShieldAlert className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-red-900 text-sm">Emergency</h4>
                    <p className="text-xs text-red-700 font-medium">Immediate help</p>
                </button>

                <button
                    type="button"
                    onClick={() => navigate('/customer/bookings')}
                    className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-brand-500 hover:shadow-md transition-all text-left group"
                >
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <CalendarCheck className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">My Bookings</h4>
                    <p className="text-xs text-slate-500">Track active jobs</p>
                </button>
            </div>

            {/* Categories Grid */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Explore Categories</h2>
                        <p className="text-xs text-slate-500">Select a category to view verified specialists nearby</p>
                    </div>
                    <Link to="/customer/services" className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1">
                        View All <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                {categoriesLoading ? (
                    <LoadingSkeleton type="card" count={4} />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categoryList.slice(0, 4).map((cat) => (
                            <ServiceCard
                                key={cat._id}
                                category={cat}
                                onClick={() => navigate(`/customer/providers?category=${encodeURIComponent(cat.name)}`)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Pending Backend Info Box for Active Bookings / Requests */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Service Requests Section */}
                <Card className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                            <Clock className="w-5 h-5 text-brand-600" /> Recent Service Requests
                        </h3>
                        <Link to="/customer/matches" className="text-xs font-semibold text-brand-600 hover:underline">
                            View All
                        </Link>
                    </div>
                    <EmptyState
                        title="No active service requests"
                        description="You haven't submitted any service requests yet. Start by finding a professional."
                        actionText="Request a Service"
                        onAction={() => navigate('/customer/request/new')}
                    />
                </Card>

                {/* Upcoming Bookings Section */}
                <Card className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                            <CalendarCheck className="w-5 h-5 text-emerald-600" /> Upcoming Bookings
                        </h3>
                        <Link to="/customer/bookings" className="text-xs font-semibold text-brand-600 hover:underline">
                            Manage Bookings
                        </Link>
                    </div>
                    <EmptyState
                        title="No upcoming bookings scheduled"
                        description="Approved provider estimates will appear here as confirmed bookings."
                        actionText="Find Service Professional"
                        onAction={() => navigate('/customer/services')}
                    />
                </Card>
            </div>
        </div>
    );
};

export default CustomerDashboard;
