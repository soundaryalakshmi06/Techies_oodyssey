import React, { useState } from 'react';
import NotificationItem from '../../components/common/NotificationItem';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import { Bell, CheckCircle2 } from 'lucide-react';

export const ProviderNotifications = () => {
    const [notifications, setNotifications] = useState([
        {
            _id: 'pn-1',
            title: 'Quote Approved by Customer!',
            message: 'Anbu Selvan approved your quote for Main Switchboard Repair (₹1,000).',
            createdAt: new Date().toISOString(),
            isRead: false,
            link: '/provider/bookings/b-201',
            type: 'booking',
        },
        {
            _id: 'pn-2',
            title: 'New Service Request Nearby',
            message: 'New Electrical request in T. Nagar with audio note attached.',
            createdAt: new Date(Date.now() - 7200000).toISOString(),
            isRead: true,
            link: '/provider/requests',
            type: 'request',
        },
    ]);

    const handleMarkAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    };

    const handleMarkRead = (id) => {
        setNotifications((prev) =>
            prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
        );
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                        <Bell className="w-6 h-6 text-brand-600" /> Professional Notifications
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Real-time notifications for incoming customer leads, approved quotes, and emergency alerts
                    </p>
                </div>

                <Button variant="ghost" size="sm" icon={CheckCircle2} onClick={handleMarkAllRead}>
                    Mark All Read
                </Button>
            </div>

            <div className="space-y-3">
                {notifications.map((item) => (
                    <NotificationItem key={item._id} notification={item} onMarkRead={handleMarkRead} />
                ))}
            </div>
        </div>
    );
};

export default ProviderNotifications;
