import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/common/EmptyState';
import { showToast } from '../../store/slices/toastSlice';
import { ShieldAlert, PhoneCall, Navigation, Clock, CheckCircle2, XCircle } from 'lucide-react';

export const ProviderEmergency = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [emergencies, setEmergencies] = useState([
        {
            _id: 'emg-301',
            category: 'Electrical Outage / Sparking',
            description: 'Main breaker box sparking violently near phase terminal. Need urgent emergency technician.',
            address: '14, Gandhi Road, T. Nagar, Chennai',
            customerName: 'Anbu Selvan',
            customerPhone: '+91 98765 43210',
            distanceKm: 0.8,
            status: 'Broadcast Active',
            createdAt: new Date().toISOString(),
        },
    ]);

    const handleAcceptEmergency = (id) => {
        setEmergencies((prev) =>
            prev.map((e) => (e._id === id ? { ...e, status: 'Accepted & Dispatched' } : e))
        );
        dispatch(
            showToast({
                type: 'success',
                message: '🚨 Emergency accepted! Customer has been notified of your immediate arrival.',
            })
        );
        navigate(`/provider/bookings/${id}`);
    };

    const handleDeclineEmergency = (id) => {
        setEmergencies((prev) => prev.filter((e) => e._id !== id));
        dispatch(
            showToast({
                type: 'info',
                message: 'Emergency request passed to next available professional.',
            })
        );
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-red-950 via-red-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl border border-red-700">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-red-600 text-white font-extrabold text-2xl flex items-center justify-center animate-pulse">
                        🚨
                    </div>
                    <div>
                        <span className="text-xs font-bold text-red-300 uppercase tracking-widest block">
                            24/7 Priority Emergency Alert Desk
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Active Emergency Requests</h1>
                    </div>
                </div>

                <p className="text-xs sm:text-sm text-red-200">
                    Emergency broadcasts require immediate response. Accept to confirm instant dispatch and share your live GPS location with customer.
                </p>
            </div>

            {emergencies.length === 0 ? (
                <EmptyState
                    title="No active emergency broadcasts nearby"
                    description="Emergency alerts within 10km will instantly notify you when customers request 24/7 priority help."
                />
            ) : (
                <div className="space-y-6">
                    {emergencies.map((emg) => (
                        <Card key={emg._id} className="border-red-200 space-y-6 bg-red-50/30">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-red-100 pb-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-extrabold text-red-900 text-lg">{emg.category}</h3>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white uppercase animate-pulse">
                                            Urgent
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">Customer: {emg.customerName} • {emg.address}</p>
                                </div>
                                <span className="text-xs font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full border border-red-200">
                                    ~{emg.distanceKm} km away
                                </span>
                            </div>

                            <div className="p-4 bg-white rounded-2xl border border-red-100 space-y-2">
                                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                                    Customer Emergency Description:
                                </span>
                                <p className="text-xs text-slate-800 leading-relaxed">{emg.description}</p>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-red-100">
                                <Button
                                    variant="outline"
                                    size="md"
                                    icon={XCircle}
                                    onClick={() => handleDeclineEmergency(emg._id)}
                                    className="text-red-700 border-red-300 hover:bg-red-50"
                                >
                                    Decline Alert
                                </Button>

                                <Button
                                    variant="emergency"
                                    size="lg"
                                    icon={CheckCircle2}
                                    onClick={() => handleAcceptEmergency(emg._id)}
                                >
                                    Accept & Dispatch Now
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProviderEmergency;
