import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import RatingStars from '../../components/common/RatingStars';
import { formatCurrency, formatDate } from '../../utils/formatters';
import {
    ArrowLeft,
    Calendar,
    Clock,
    MapPin,
    ShieldCheck,
    Navigation,
    FileText,
    Star,
    CheckCircle2,
    Wrench,
} from 'lucide-react';

export const BookingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock booking data matching contract
    const booking = {
        _id: id || 'b-201',
        serviceName: 'Main Switchboard & MCB Repair',
        category: 'Electrical Works',
        providerName: 'K. Murugan',
        providerPhone: '+91 98765 43210',
        providerRating: 4.9,
        date: new Date().toISOString(),
        time: '11:30 AM',
        address: '14, Gandhi Road, T. Nagar, Chennai - 600017',
        status: 'On The Way',
        serviceCharge: 350,
        partsCost: 650,
        totalAmount: 1000,
        isEmergency: false,
        procedure: 'Replace 32A DP MCB, rewire main distribution box, test load balancing.',
    };

    const statusTimeline = [
        { title: 'Request Created', done: true, time: '10:00 AM' },
        { title: 'Quote Approved', done: true, time: '10:30 AM' },
        { title: 'Provider On The Way', done: true, time: '11:00 AM', current: true },
        { title: 'Work In Progress', done: false },
        { title: 'Job Completed & Verified', done: false },
    ];

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <Button
                variant="ghost"
                size="sm"
                icon={ArrowLeft}
                onClick={() => navigate('/customer/bookings')}
            >
                Back to Bookings
            </Button>

            {/* Main Header Card */}
            <Card className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-extrabold text-slate-900">{booking.serviceName}</h1>
                            {booking.isEmergency && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white uppercase">
                                    🚨 Emergency
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Booking ID: {booking._id}</p>
                    </div>
                    <StatusBadge status={booking.status} />
                </div>

                {/* Action Toolbar */}
                <div className="flex items-center gap-3 flex-wrap">
                    {(booking.status === 'On The Way' || booking.status === 'Active' || booking.status === 'In Progress') && (
                        <Button
                            variant="trust"
                            icon={Navigation}
                            onClick={() => navigate(`/customer/tracking/${booking._id}`)}
                        >
                            Track Provider Location
                        </Button>
                    )}

                    {booking.status === 'Completed' && (
                        <>
                            <Button
                                variant="outline"
                                icon={FileText}
                                onClick={() => navigate(`/customer/invoices/${booking._id}`)}
                            >
                                View Invoice
                            </Button>
                            <Button
                                variant="primary"
                                icon={Star}
                                onClick={() => navigate('/customer/reviews')}
                            >
                                Leave Review
                            </Button>
                        </>
                    )}
                </div>

                {/* Provider Details & Schedule Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Provider Profile Box */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            Assigned Professional
                        </span>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white font-bold text-xl flex items-center justify-center">
                                {booking.providerName.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                    {booking.providerName}
                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                </h4>
                                <RatingStars rating={booking.providerRating} showValue size="sm" />
                                <p className="text-xs text-slate-500 mt-0.5">{booking.providerPhone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Schedule & Address Box */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-700">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            Appointment Info
                        </span>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span>{formatDate(booking.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                            <span>{booking.address}</span>
                        </div>
                    </div>
                </div>

                {/* Price & Procedure Breakdown */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 text-xs">
                    <span className="font-bold text-slate-900 block text-sm">Approved Work Breakdown</span>
                    <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">{booking.procedure}</p>

                    <div className="space-y-1.5 pt-2">
                        <div className="flex justify-between text-slate-600">
                            <span>Inspection & Service Charge</span>
                            <span className="font-semibold text-slate-800">{formatCurrency(booking.serviceCharge)}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                            <span>Required Parts & Materials</span>
                            <span className="font-semibold text-slate-800">{formatCurrency(booking.partsCost)}</span>
                        </div>
                        <div className="flex justify-between items-center text-base font-bold text-slate-900 border-t border-slate-200 pt-2.5">
                            <span>Approved Total</span>
                            <span className="text-emerald-700 text-lg">{formatCurrency(booking.totalAmount)}</span>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                        Service Progress Timeline
                    </span>
                    <div className="space-y-3">
                        {statusTimeline.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-xs">
                                <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${item.done
                                            ? 'bg-emerald-600 text-white'
                                            : item.current
                                                ? 'bg-brand-600 text-white animate-pulse'
                                                : 'bg-slate-200 text-slate-400'
                                        }`}
                                >
                                    {item.done ? '✓' : idx + 1}
                                </div>
                                <div className="grow flex items-center justify-between">
                                    <span className={item.done || item.current ? 'font-bold text-slate-900' : 'text-slate-400'}>
                                        {item.title}
                                    </span>
                                    {item.time && <span className="text-slate-400">{item.time}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default BookingDetail;
