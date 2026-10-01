import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import RatingStars from '../../components/common/RatingStars';
import {
    ArrowLeft,
    Navigation,
    PhoneCall,
    MessageSquare,
    ShieldCheck,
    MapPin,
    Clock,
} from 'lucide-react';

export const Tracking = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const trackingData = {
        bookingId: id || 'b-201',
        providerName: 'K. Murugan',
        providerPhone: '+91 98765 43210',
        category: 'Electrical Works',
        status: 'On The Way',
        distanceKm: 1.4,
        estimatedMinutes: 12,
        providerCoords: { lat: 13.0418, lng: 80.2341 },
        customerCoords: { lat: 13.0382, lng: 80.2415 },
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <Button
                variant="ghost"
                size="sm"
                icon={ArrowLeft}
                onClick={() => navigate('/customer/bookings')}
            >
                Back to Bookings
            </Button>

            {/* Header Info */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                        <Navigation className="w-6 h-6 text-brand-600 animate-pulse" /> Live Provider Tracking
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">Real-time GPS tracking for booking #{trackingData.bookingId}</p>
                </div>
                <StatusBadge status={trackingData.status} />
            </div>

            {/* Map Display Box (Clean Component Placeholder) */}
            <div className="relative bg-slate-900 rounded-3xl h-80 sm:h-96 overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between p-6 text-white">
                {/* Decorative Grid Lines representing map */}
                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

                {/* Top Map Banner */}
                <div className="relative z-10 flex items-center justify-between">
                    <div className="bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700/60 flex items-center gap-2 text-xs font-bold">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        <span>ETA: ~{trackingData.estimatedMinutes} Mins</span>
                    </div>

                    <div className="bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700/60 flex items-center gap-2 text-xs font-bold text-brand-300">
                        <MapPin className="w-4 h-4 text-brand-400" />
                        <span>Distance: {trackingData.distanceKm} km away</span>
                    </div>
                </div>

                {/* Center Visual Mock Pin */}
                <div className="relative z-10 self-center text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-brand-600/30 border-2 border-brand-400 flex items-center justify-center mx-auto animate-ping">
                        <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                            🚗
                        </div>
                    </div>
                    <span className="text-xs font-bold bg-slate-800/90 px-3 py-1 rounded-full border border-slate-700">
                        {trackingData.providerName} is moving towards your location
                    </span>
                </div>

                {/* Bottom Coordinates Bar */}
                <div className="relative z-10 bg-slate-800/80 backdrop-blur-md p-3 rounded-2xl border border-slate-700/60 text-[11px] text-slate-300 flex items-center justify-between">
                    <span>Provider GPS: {trackingData.providerCoords.lat}, {trackingData.providerCoords.lng}</span>
                    <span className="text-emerald-400 font-semibold">● Active GPS Stream</span>
                </div>
            </div>

            {/* Provider Details Card */}
            <Card className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
                            {trackingData.providerName.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                                {trackingData.providerName}
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            </h3>
                            <p className="text-xs font-semibold text-brand-600">{trackingData.category}</p>
                            <RatingStars rating={4.9} showValue size="sm" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <a
                            href={`tel:${trackingData.providerPhone}`}
                            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-colors"
                        >
                            <PhoneCall className="w-4 h-4" /> Call Provider
                        </a>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Tracking;
