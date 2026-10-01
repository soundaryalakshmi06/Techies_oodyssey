import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import {
    fetchProviderProfileThunk,
    updateProviderAvailabilityThunk,
} from '../../store/slices/providerSlice';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import { formatCurrency } from '../../utils/formatters';
import {
    ToggleLeft,
    ToggleRight,
    ShieldCheck,
    ShieldAlert,
    FileText,
    CalendarCheck,
    DollarSign,
    Star,
    ArrowRight,
    Wrench,
    Clock,
} from 'lucide-react';

export const ProviderDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { profile: providerProfile, isAvailable, loading } = useSelector((state) => state.providers);

    useEffect(() => {
        dispatch(fetchProviderProfileThunk());
    }, [dispatch]);

    const handleToggleAvailability = () => {
        dispatch(updateProviderAvailabilityThunk({ available: !isAvailable }));
    };

    const verificationStatus = providerProfile?.verificationStatus || user?.verificationStatus || 'Pending';
    const isApproved = verificationStatus === 'Approved' || verificationStatus === 'Verified';

    return (
        <div className="space-y-8">
            {/* Top Banner & Availability Controls */}
            <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl border border-slate-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-brand-300 uppercase tracking-widest">
                                Service Professional Desk
                            </span>
                            <StatusBadge status={verificationStatus} />
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                            Welcome back, {user?.name || 'Professional'}! 🔧
                        </h1>

                        <p className="text-xs sm:text-sm text-slate-300">
                            {user?.category || 'Home Services'} • Tamil & English Service Area
                        </p>
                    </div>

                    {/* Availability Toggle */}
                    <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-2 shrink-0 text-center">
                        <span className="text-[11px] text-slate-400 font-bold uppercase block">
                            Current Duty Status
                        </span>
                        <Button
                            variant={isAvailable ? 'trust' : 'secondary'}
                            size="md"
                            icon={isAvailable ? ToggleRight : ToggleLeft}
                            onClick={handleToggleAvailability}
                            className="w-full justify-center text-sm font-bold"
                        >
                            {isAvailable ? '🟢 Online & Receiving Requests' : '🔴 Offline'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Verification Warning if Pending */}
            {!isApproved && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <h4 className="font-bold text-amber-950 text-sm">Account Verification In Progress</h4>
                        <p className="text-amber-800 leading-relaxed">
                            Your professional profile is currently under review by VinaiThunai Admin. Once approved, customer requests in your area will automatically appear here.
                        </p>
                        <Link to="/provider/verification" className="font-bold text-brand-600 hover:underline block pt-1">
                            Check Verification Details →
                        </Link>
                    </div>
                </div>
            )}

            {/* Overview Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="space-y-2">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                        <span>Total Earnings</span>
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-2xl font-extrabold text-slate-900">{formatCurrency(providerProfile?.earningsTotal || 2450)}</p>
                    <span className="text-[11px] text-emerald-600 font-medium">+100% Verified Payouts</span>
                </Card>

                <Card className="space-y-2">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                        <span>Pending Requests</span>
                        <FileText className="w-4 h-4 text-brand-600" />
                    </div>
                    <p className="text-2xl font-extrabold text-slate-900">3</p>
                    <span className="text-[11px] text-brand-600 font-medium">Matching your category</span>
                </Card>

                <Card className="space-y-2">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                        <span>Active Bookings</span>
                        <CalendarCheck className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-2xl font-extrabold text-slate-900">1</p>
                    <span className="text-[11px] text-blue-600 font-medium">On the way / In progress</span>
                </Card>

                <Card className="space-y-2">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                        <span>Overall Rating</span>
                        <Star className="w-4 h-4 text-amber-500" />
                    </div>
                    <p className="text-2xl font-extrabold text-slate-900">{providerProfile?.rating || 4.9} ★</p>
                    <span className="text-[11px] text-slate-400 font-medium">{providerProfile?.reviewCount || 18} Customer Reviews</span>
                </Card>
            </div>

            {/* Urgent Emergency Alert Banner if any */}
            <div className="p-5 bg-red-950/90 border border-red-600 rounded-3xl text-white flex items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-3">
                    <ShieldAlert className="w-6 h-6 text-red-400 animate-pulse shrink-0" />
                    <div>
                        <h4 className="font-bold text-sm text-white">🚨 1 Active Emergency Request Nearby</h4>
                        <p className="text-xs text-red-200">Customer needs urgent electrical switchboard repair in T. Nagar</p>
                    </div>
                </div>
                <Button
                    variant="emergency"
                    size="sm"
                    onClick={() => navigate('/provider/emergency')}
                >
                    View Emergency
                </Button>
            </div>

            {/* Main Grid: Incoming Requests & Active Bookings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                            <FileText className="w-5 h-5 text-brand-600" /> Recent Customer Requests
                        </h3>
                        <Link to="/provider/requests" className="text-xs font-semibold text-brand-600 hover:underline">
                            View All Requests
                        </Link>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-xs">Main Switchboard Rewiring</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-100 text-brand-700">New</span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2">
                            Language: Tamil • Customer recorded voice note attached. Needs inspection today.
                        </p>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                            <span className="text-slate-500">Distance: ~1.4 km</span>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => navigate('/provider/requests/req-101')}
                            >
                                Create Estimate Quote
                            </Button>
                        </div>
                    </div>
                </Card>

                <Card className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                            <CalendarCheck className="w-5 h-5 text-emerald-600" /> Active Job Appointments
                        </h3>
                        <Link to="/provider/bookings" className="text-xs font-semibold text-brand-600 hover:underline">
                            Manage Bookings
                        </Link>
                    </div>

                    <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-xs">Emergency Tap Burst Repair</span>
                            <StatusBadge status="On The Way" />
                        </div>
                        <p className="text-xs text-slate-600">Customer: Anbu Selvan • 14, Gandhi Road, T. Nagar</p>
                        <div className="flex items-center justify-between pt-2 border-t border-emerald-200 text-xs">
                            <span className="font-bold text-emerald-800">Approved: {formatCurrency(1000)}</span>
                            <Button
                                variant="trust"
                                size="sm"
                                onClick={() => navigate('/provider/bookings/b-201')}
                            >
                                Job Status & Actions
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProviderDashboard;
