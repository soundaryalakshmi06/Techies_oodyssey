import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import { FileText, Globe, Calendar, MapPin, Mic, Camera, ArrowRight } from 'lucide-react';

export const ProviderRequests = () => {
    const navigate = useNavigate();

    const [requests, setRequests] = useState([
        {
            _id: 'req-101',
            category: 'Electrical Works',
            serviceName: 'Main Switchboard & MCB Repair',
            description: 'Main distribution box tripping continuously. Need urgent diagnostic inspection and replacement.',
            language: 'Tamil',
            preferredDate: new Date().toISOString().split('T')[0],
            preferredTime: '11:00 AM',
            address: 'T. Nagar, Chennai',
            images: [],
            hasAudioNote: true,
            audioUrl: '',
            distanceKm: 1.4,
            createdAt: new Date().toISOString(),
        },
        {
            _id: 'req-102',
            category: 'Electrical Works',
            serviceName: 'Ceiling Fan & Light Wiring Installation',
            description: 'New apartment ceiling fan hook wiring and 3 LED spotlight points connection.',
            language: 'English',
            preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            preferredTime: '03:00 PM',
            address: 'Kodambakkam, Chennai',
            images: [],
            hasAudioNote: false,
            distanceKm: 3.2,
            createdAt: new Date().toISOString(),
        },
    ]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="border-b border-slate-200 pb-6 space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <FileText className="w-6 h-6 text-brand-600" /> Incoming Customer Requests
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                    Service requests matching your category and location. Listen to audio notes and submit transparent price estimates.
                </p>
            </div>

            {requests.length === 0 ? (
                <EmptyState
                    title="No incoming requests right now"
                    description="Make sure your duty status is set to 'Online' to receive nearby customer requests."
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {requests.map((req) => (
                        <Card key={req._id} hoverable className="space-y-4 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                                            {req.category}
                                        </span>
                                        <h3 className="font-bold text-slate-900 text-base mt-1">{req.serviceName}</h3>
                                    </div>
                                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full shrink-0">
                                        ~{req.distanceKm} km away
                                    </span>
                                </div>

                                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl">
                                    {req.description}
                                </p>

                                <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                                    <span className="flex items-center gap-1 font-medium text-slate-700">
                                        <Globe className="w-3.5 h-3.5 text-brand-600" /> Language: {req.language}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> {req.preferredDate} ({req.preferredTime})
                                    </span>
                                </div>

                                {req.hasAudioNote && (
                                    <div className="p-2.5 bg-brand-50/60 rounded-xl border border-brand-200/80 flex items-center justify-between text-xs text-brand-900">
                                        <span className="flex items-center gap-1.5 font-bold">
                                            <Mic className="w-4 h-4 text-brand-600" /> Customer Voice Note Attached
                                        </span>
                                        <span className="text-[11px] text-brand-700">Audio ready</span>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate(`/provider/requests/${req._id}`)}
                                >
                                    View Details
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    icon={ArrowRight}
                                    onClick={() => navigate(`/provider/requests/${req._id}/quote`)}
                                >
                                    Create Price Quote
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProviderRequests;
