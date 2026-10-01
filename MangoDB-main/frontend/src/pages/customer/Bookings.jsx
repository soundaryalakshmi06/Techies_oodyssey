import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingCard from '../../components/common/BookingCard';
import Tabs from '../../components/common/Tabs';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import { CalendarCheck, ShieldCheck, Plus } from 'lucide-react';

export const Bookings = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');

    const sampleBookings = [
        {
            _id: 'b-201',
            serviceName: 'Main Switchboard & MCB Repair',
            providerName: 'K. Murugan',
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
            providerName: 'S. Ramanathan',
            date: new Date(Date.now() - 86400000).toISOString(),
            time: '02:00 PM',
            address: '14, Gandhi Road, T. Nagar, Chennai',
            totalAmount: 1450,
            status: 'Completed',
            isEmergency: true,
        },
    ];

    const filteredBookings = sampleBookings.filter((b) => {
        if (activeTab === 'all') return true;
        if (activeTab === 'upcoming') return b.status === 'Confirmed' || b.status === 'Scheduled';
        if (activeTab === 'active') return b.status === 'On The Way' || b.status === 'In Progress' || b.status === 'Active';
        if (activeTab === 'completed') return b.status === 'Completed';
        if (activeTab === 'cancelled') return b.status === 'Cancelled';
        return true;
    });

    const tabs = [
        { id: 'all', label: 'All Bookings', count: sampleBookings.length },
        { id: 'active', label: 'Active / Live', count: sampleBookings.filter((b) => ['On The Way', 'In Progress', 'Active'].includes(b.status)).length },
        { id: 'upcoming', label: 'Upcoming', count: sampleBookings.filter((b) => ['Confirmed', 'Scheduled'].includes(b.status)).length },
        { id: 'completed', label: 'Completed', count: sampleBookings.filter((b) => b.status === 'Completed').length },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Digital Booking History & Live Status</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        My Service Bookings
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Track active service arrivals, view invoices, and manage past appointments
                    </p>
                </div>

                <Button
                    variant="primary"
                    icon={Plus}
                    onClick={() => navigate('/customer/request/new')}
                >
                    New Service Request
                </Button>
            </div>

            {/* Tabs */}
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            {/* Bookings Grid */}
            {filteredBookings.length === 0 ? (
                <EmptyState
                    title={`No ${activeTab} bookings found`}
                    description="Your requested and approved service appointments will be listed here."
                    actionText="Find Service Professional"
                    onAction={() => navigate('/customer/services')}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredBookings.map((booking) => (
                        <BookingCard key={booking._id} booking={booking} role="customer" />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Bookings;
