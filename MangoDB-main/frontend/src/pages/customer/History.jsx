import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookingCard from '../../components/common/BookingCard';
import EmptyState from '../../components/common/EmptyState';
import { History as HistoryIcon, ShieldCheck } from 'lucide-react';

export const History = () => {
    const navigate = useNavigate();

    const completedBookings = [
        {
            _id: 'b-202',
            serviceName: 'Emergency Tap Burst Repair',
            providerName: 'S. Ramanathan',
            date: new Date(Date.now() - 86400000 * 3).toISOString(),
            time: '02:00 PM',
            address: '14, Gandhi Road, T. Nagar, Chennai',
            totalAmount: 1450,
            status: 'Completed',
            isEmergency: true,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="border-b border-slate-200 pb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Completed Service Audit Trail</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Service History
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                    View your past home service appointments, download invoices, and leave reviews
                </p>
            </div>

            {completedBookings.length === 0 ? (
                <EmptyState
                    title="No completed services found"
                    description="Your completed home repairs and invoices will appear here."
                    actionText="Find Service Professional"
                    onAction={() => navigate('/customer/services')}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {completedBookings.map((b) => (
                        <BookingCard key={b._id} booking={b} role="customer" />
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
