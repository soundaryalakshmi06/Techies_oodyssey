import React, { useState } from 'react';
import NotificationItem from '../../components/common/NotificationItem';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import { Bell, CheckCircle2 } from 'lucide-react';

export const Notifications = () => {
    const [notifications, setNotifications] = useState([
        {
            _id: 'n-1',
            title: 'New Quote Received',
            message: 'K. Murugan submitted a diagnostic estimate of ₹1,000 for your Switchboard Repair.',
            createdAt: new Date().toISOString(),
            isRead: false,
            link: '/customer/quotes',
            type: 'quote',
        },
        {
            _id: 'n-2',
            title: 'Booking Confirmed',
            message: 'Your service appointment with S. Ramanathan is confirmed for 02:00 PM.',
            createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
            isRead: true,
            link: '/customer/bookings',
            type: 'booking',
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

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                        <Bell className="w-6 h-6 text-brand-600" /> Notifications
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Real-time updates regarding service quotes, bookings, and provider arrivals
                    </p>
                </div>

                {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" icon={CheckCircle2} onClick={handleMarkAllRead}>
                        Mark All Read
                    </Button>
                )}
            </div>

            {notifications.length === 0 ? (
                <EmptyState
                    title="No notifications"
                    description="You will receive real-time alerts when providers submit quotes or accept bookings."
                />
            ) : (
                <div className="space-y-3">
                    {notifications.map((item) => (
                        <NotificationItem
                            key={item._id}
                            notification={item}
                            onMarkRead={handleMarkRead}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;
