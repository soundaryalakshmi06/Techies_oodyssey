import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import StatusBadge from './StatusBadge';
import Button from './Button';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Calendar, Clock, MapPin, Navigation, FileText, Star, ShieldCheck } from 'lucide-react';

export const BookingCard = ({
    booking,
    role = 'customer', // customer | provider
    className = '',
}) => {
    const navigate = useNavigate();

    if (!booking) return null;

    const {
        _id,
        serviceName = 'Home Repair Service',
        providerName = 'Verified Professional',
        customerName = 'Customer',
        date = new Date().toISOString(),
        time = '10:00 AM',
        address = 'Customer Address',
        totalAmount = 0,
        status = 'Confirmed',
        isEmergency = false,
    } = booking;

    return (
        <Card hoverable className={`space-y-4 ${isEmergency ? 'border-red-300 bg-red-50/20' : ''} ${className}`}>
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-base">{serviceName}</h3>
                        {isEmergency && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-600 text-white uppercase tracking-wider">
                                🚨 Emergency
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                        {role === 'customer' ? `Provider: ${providerName}` : `Customer: ${customerName}`}
                    </p>
                </div>
                <StatusBadge status={status} />
            </div>

            {/* Date, Time, Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{formatDate(date)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{time}</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{address}</span>
                </div>
            </div>

            {/* Amount & Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                    <span className="text-[11px] text-slate-400 font-semibold uppercase block">Amount</span>
                    <span className="font-bold text-slate-900 text-base">{formatCurrency(totalAmount)}</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    {/* Tracking button for active bookings */}
                    {(status === 'Active' || status === 'Confirmed' || status === 'On The Way') && (
                        <Button
                            variant="trust"
                            size="sm"
                            icon={Navigation}
                            onClick={() => navigate(`/${role}/tracking/${_id}`)}
                        >
                            Track Provider
                        </Button>
                    )}

                    {/* Invoice button if completed */}
                    {status === 'Completed' && (
                        <Button
                            variant="outline"
                            size="sm"
                            icon={FileText}
                            onClick={() => navigate(`/customer/invoices/${_id}`)}
                        >
                            View Invoice
                        </Button>
                    )}

                    {/* Rate button if completed customer */}
                    {status === 'Completed' && role === 'customer' && (
                        <Button
                            variant="primary"
                            size="sm"
                            icon={Star}
                            onClick={() => navigate('/customer/reviews')}
                        >
                            Review
                        </Button>
                    )}

                    {/* View Details */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/${role}/bookings/${_id}`)}
                    >
                        Details
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default BookingCard;
