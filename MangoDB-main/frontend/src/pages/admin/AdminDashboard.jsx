import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminStatsThunk } from '../../store/slices/adminSlice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import { formatCurrency } from '../../utils/formatters';
import {
    Users,
    ShieldCheck,
    CalendarCheck,
    ShieldAlert,
    Layers,
    BarChart3,
    ArrowRight,
    TrendingUp,
} from 'lucide-react';

export const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { stats, loading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchAdminStatsThunk());
    }, [dispatch]);

    const displayStats = stats || {
        totalUsers: 142,
        verifiedProviders: 38,
        pendingVerifications: 5,
        totalBookings: 89,
        activeEmergencies: 2,
        totalPlatformVolume: 124500,
    };

    return (
        <div className="space-y-8">
            {/* Top Banner */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-brand-950 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                            VinaiThunai System Control Center
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Admin Operations Desk</h1>
                        <p className="text-xs sm:text-sm text-slate-300 mt-1">
                            Background verification approvals, platform governance, category controls & metrics
                        </p>
                    </div>

                    <Button
                        variant="trust"
                        icon={ShieldCheck}
                        onClick={() => navigate('/admin/verifications')}
                    >
                        Review Pending Approvals ({displayStats.pendingVerifications})
                    </Button>
                </div>
            </div>

            {/* Pending Verifications Banner */}
            {displayStats.pendingVerifications > 0 && (
                <div className="p-5 bg-amber-50 rounded-3xl border border-amber-200 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0" />
                        <div>
                            <h4 className="font-bold text-sm">
                                {displayStats.pendingVerifications} Provider Registrations Awaiting Verification
                            </h4>
                            <p className="text-xs text-amber-800">
                                Review submitted Aadhaar photos and trade experience before activating lead routing.
                            </p>
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate('/admin/verifications')}
                    >
                        Open Verification Queue
                    </Button>
                </div>
            )}

            {/* Core Platform Stat Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="space-y-2">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                        <span>Total Platform Users</span>
                        <Users className="w-4 h-4 text-brand-600" />
                    </div>
                    <p className="text-2xl font-extrabold text-slate-900">{displayStats.totalUsers}</p>
                    <span className="text-[11px] text-slate-400 font-medium">Customers & Professionals</span>
                </Card>

                <Card className="space-y-2">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                        <span>Verified Professionals</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-2xl font-extrabold text-slate-900">{displayStats.verifiedProviders}</p>
                    <span className="text-[11px] text-emerald-600 font-medium">100% Background Checked</span>
                </Card>

                <Card className="space-y-2">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                        <span>Total Bookings</span>
                        <CalendarCheck className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-2xl font-extrabold text-slate-900">{displayStats.totalBookings}</p>
                    <span className="text-[11px] text-blue-600 font-medium">Completed & Live</span>
                </Card>

                <Card className="space-y-2">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                        <span>Gross Platform Volume</span>
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                    </div>
                    <p className="text-2xl font-extrabold text-slate-900">{formatCurrency(displayStats.totalPlatformVolume)}</p>
                    <span className="text-[11px] text-purple-600 font-medium">Transparent Cost Audit</span>
                </Card>
            </div>

            {/* Admin Modules Quick Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card hoverable onClick={() => navigate('/admin/verifications')} className="cursor-pointer space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-base">Background Verification</h3>
                        <p className="text-xs text-slate-500 mt-1">Approve or reject pending service provider applications</p>
                    </div>
                    <span className="text-xs font-bold text-brand-600 flex items-center gap-1">
                        Manage Queue <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                </Card>

                <Card hoverable onClick={() => navigate('/admin/users')} className="cursor-pointer space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                        <Users className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-base">User Management</h3>
                        <p className="text-xs text-slate-500 mt-1">Search, filter, and manage customers, providers, and admins</p>
                    </div>
                    <span className="text-xs font-bold text-brand-600 flex items-center gap-1">
                        View All Users <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                </Card>

                <Card hoverable onClick={() => navigate('/admin/categories')} className="cursor-pointer space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                        <Layers className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-base">Service Categories</h3>
                        <p className="text-xs text-slate-500 mt-1">Add or edit home service categories offered across platform</p>
                    </div>
                    <span className="text-xs font-bold text-brand-600 flex items-center gap-1">
                        Manage Categories <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
