import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import {
    ArrowLeft,
    Wrench,
    Globe,
    Calendar,
    Clock,
    MapPin,
    Mic,
    Camera,
    FileText,
    Send,
} from 'lucide-react';

export const ProviderRequestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const request = {
        _id: id || 'req-101',
        category: 'Electrical Works',
        serviceName: 'Main Switchboard & MCB Repair',
        description: 'Main distribution box tripping continuously. Need urgent diagnostic inspection and replacement of burnt 32A MCB.',
        language: 'Tamil',
        preferredDate: new Date().toISOString().split('T')[0],
        preferredTime: '11:00 AM',
        address: '14, Gandhi Road, T. Nagar, Chennai - 600017',
        images: [],
        hasAudioNote: true,
        audioUrl: '',
        customerName: 'Anbu Selvan',
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <Button
                variant="ghost"
                size="sm"
                icon={ArrowLeft}
                onClick={() => navigate('/provider/requests')}
            >
                Back to Requests
            </Button>

            {/* Main Request Card */}
            <Card className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
                            {request.category}
                        </span>
                        <h1 className="text-2xl font-extrabold text-slate-900 mt-1">{request.serviceName}</h1>
                        <p className="text-xs text-slate-500 mt-0.5">Request ID: {request._id} • Customer: {request.customerName}</p>
                    </div>

                    <Button
                        variant="trust"
                        icon={Send}
                        onClick={() => navigate(`/provider/requests/${request._id}/quote`)}
                    >
                        Create Price Quote
                    </Button>
                </div>

                {/* Customer Problem Description */}
                <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                        Customer Problem Description
                    </span>
                    <p className="text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200 leading-relaxed font-normal">
                        {request.description}
                    </p>
                </div>

                {/* Language & Schedule */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                        <span className="text-slate-400 font-semibold block">Customer Language</span>
                        <span className="font-bold text-brand-600 flex items-center gap-1">
                            <Globe className="w-4 h-4" /> {request.language}
                        </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                        <span className="text-slate-400 font-semibold block">Preferred Date</span>
                        <span className="font-bold text-slate-800 flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-slate-400" /> {request.preferredDate}
                        </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                        <span className="text-slate-400 font-semibold block">Preferred Time</span>
                        <span className="font-bold text-slate-800 flex items-center gap-1">
                            <Clock className="w-4 h-4 text-slate-400" /> {request.preferredTime}
                        </span>
                    </div>
                </div>

                {/* Address */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-1">
                    <span className="text-slate-400 font-semibold block">Service Location Address</span>
                    <p className="font-bold text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-brand-600 shrink-0" /> {request.address}
                    </p>
                </div>

                {/* Customer Audio Note Player */}
                {request.hasAudioNote && (
                    <div className="p-4 bg-brand-50/70 border border-brand-200 rounded-2xl space-y-2">
                        <span className="text-xs font-bold text-brand-900 flex items-center gap-2">
                            <Mic className="w-4 h-4 text-brand-600" /> Customer Voice Description (Audio Note)
                        </span>
                        <p className="text-[11px] text-brand-800">
                            Customer recorded a voice explanation in {request.language}. Click play to listen.
                        </p>
                        <div className="pt-1">
                            <audio controls className="w-full h-10 rounded-xl" />
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ProviderRequestDetail;
