import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingCard from '../../components/common/BookingCard';
import Tabs from '../../components/common/Tabs';
import EmptyState from '../../components/common/EmptyState';
import { CalendarCheck, ShieldCheck } from 'lucide-react';

export const ProviderBookings = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('active');

    const [bookings, setBookings] = useState([
        {
            _id: 'b-201',
            serviceName: 'Main Switchboard & MCB Repair',
            customerName: 'Anbu Selvan',
            date: new Date().toISOString(),
            time: '11:30 AM',
            address: '14, Gandhi Road, T. Nagar, Chennai',
            totalAmount: 1000,
            status: 'On The Way',
            isEmergency: false,
        },
        {
            _id: 'b-202',
            serviceName: 'Emergency Tap Burst Repair',
            customerName: 'K. Senthil',
            date: new Date(Date.now() - 86400000 * 2).toISOString(),
            time: '02:00 PM',
            address: 'Kodambakkam, Chennai',
            totalAmount: 1450,
            status: 'Completed',
            isEmergency: true,
        },
    ]);

    const filteredBookings = bookings.filter((b) => {
        if (activeTab === 'all') return true;
        if (activeTab === 'active') return b.status === 'On The Way' || b.status === 'In Progress' || b.status === 'Active';
        if (activeTab === 'upcoming') return b.status === 'Confirmed' || b.status === 'Scheduled';
        if (activeTab === 'completed') return b.status === 'Completed';
        return true;
    });

    const tabs = [
        { id: 'active', label: 'Active Jobs', count: bookings.filter((b) => ['On The Way', 'In Progress', 'Active'].includes(b.status)).length },
        { id: 'upcoming', label: 'Upcoming', count: bookings.filter((b) => ['Confirmed', 'Scheduled'].includes(b.status)).length },
        { id: 'completed', label: 'Completed Jobs', count: bookings.filter((b) => b.status === 'Completed').length },
        { id: 'all', label: 'All History', count: bookings.length },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="border-b border-slate-200 pb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Professional Job Management Desk</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Assigned Bookings & Work Management
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                    Update your live duty location, start jobs, and upload before/after evidence photos
                </p>
            </div>

            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            {filteredBookings.length === 0 ? (
                <EmptyState
                    title={`No ${activeTab} bookings`}
                    description="Approved quotes and emergency assignments will appear in this workspace."
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredBookings.map((b) => (
                        <BookingCard key={b._id} booking={b} role="provider" />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProviderBookings;
