import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import { ArrowLeft, ShieldAlert, PhoneCall, Navigation, Clock, ShieldCheck } from 'lucide-react';

export const EmergencyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const emergencyData = {
        requestId: id || 'emg-301',
        category: 'Electrical Outage / Sparking',
        status: 'Provider Accepted',
        acceptedProvider: {
            name: 'K. Murugan',
            phone: '+91 98765 43210',
            rating: 4.9,
            distanceKm: 0.8,
            estimatedMinutes: 7,
        },
        createdAt: new Date().toISOString(),
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <Button
                variant="ghost"
                size="sm"
                icon={ArrowLeft}
                onClick={() => navigate('/customer/dashboard')}
            >
                Back to Dashboard
            </Button>

            {/* Status Banner */}
            <div className="bg-red-900 text-white p-6 rounded-3xl space-y-4 shadow-xl border border-red-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShieldAlert className="w-6 h-6 text-red-400 animate-pulse" />
                        <h1 className="text-xl font-extrabold">24/7 Emergency Dispatch Active</h1>
                    </div>
                    <StatusBadge status={emergencyData.status} />
                </div>

                <p className="text-xs text-red-200">
                    Emergency alert for {emergencyData.category} (Request ID: {emergencyData.requestId})
                </p>

                <div className="p-4 bg-slate-900/90 rounded-2xl border border-red-800 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-bold text-white">
                        <Clock className="w-4 h-4 text-emerald-400" /> Technician ETA: ~{emergencyData.acceptedProvider.estimatedMinutes} Mins
                    </span>
                    <span className="text-red-300 font-semibold">{emergencyData.acceptedProvider.distanceKm} km away</span>
                </div>
            </div>

            {/* Provider Contact Card */}
            <Card className="space-y-4">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" /> Responding Technician
                </h3>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white font-extrabold text-xl flex items-center justify-center">
                            {emergencyData.acceptedProvider.name.charAt(0)}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">
                                {emergencyData.acceptedProvider.name}
                            </h4>
                            <p className="text-xs text-slate-500">
                                ⭐ {emergencyData.acceptedProvider.rating} Rating • Background Verified
                            </p>
                        </div>
                    </div>

                    <a
                        href={`tel:${emergencyData.acceptedProvider.phone}`}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-colors"
                    >
                        <PhoneCall className="w-4 h-4" /> Call Technician Now
                    </a>
                </div>
            </Card>
        </div>
    );
};

export default EmergencyDetail;
