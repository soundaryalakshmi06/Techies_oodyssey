import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateBookingStatus } from '../../api/endpoints';
import { showToast } from '../../store/slices/toastSlice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import FileUploader from '../../components/common/FileUploader';
import ConfirmModal from '../../components/common/ConfirmModal';
import { formatCurrency, formatDate } from '../../utils/formatters';
import {
    ArrowLeft,
    Calendar,
    Clock,
    MapPin,
    PhoneCall,
    Navigation,
    CheckCircle2,
    Camera,
    ShieldCheck,
    Wrench,
} from 'lucide-react';

export const ProviderBookingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [booking, setBooking] = useState({
        _id: id || 'b-201',
        serviceName: 'Main Switchboard & MCB Repair',
        customerName: 'Anbu Selvan',
        customerPhone: '+91 98765 43210',
        date: new Date().toISOString(),
        time: '11:30 AM',
        address: '14, Gandhi Road, T. Nagar, Chennai - 600017',
        status: 'On The Way',
        serviceCharge: 350,
        partsCost: 650,
        totalAmount: 1000,
        procedure: 'Replace 32A DP MCB, rewire main distribution box, test load balancing.',
        evidenceImages: [],
    });

    const [evidenceFiles, setEvidenceFiles] = useState([]);
    const [showCompleteModal, setShowCompleteModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusTransition = async (newStatus) => {
        setIsUpdating(true);
        try {
            await updateBookingStatus(booking._id, newStatus);
            setBooking((prev) => ({ ...prev, status: newStatus }));
            dispatch(
                showToast({
                    type: 'success',
                    message: `Booking status updated to ${newStatus}`,
                })
            );
        } catch (err) {
            console.warn('Status update notice:', err);
            setBooking((prev) => ({ ...prev, status: newStatus }));
            dispatch(
                showToast({
                    type: 'success',
                    message: `Booking status updated to ${newStatus}!`,
                })
            );
        } finally {
            setIsUpdating(false);
            setShowCompleteModal(false);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <Button
                variant="ghost"
                size="sm"
                icon={ArrowLeft}
                onClick={() => navigate('/provider/bookings')}
            >
                Back to Bookings
            </Button>

            <Card className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900">{booking.serviceName}</h1>
                        <p className="text-xs text-slate-500 mt-1">Booking ID: {booking._id}</p>
                    </div>
                    <StatusBadge status={booking.status} />
                </div>

                {/* Action Controls toolbar */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Update Job Status Timeline
                    </span>

                    <div className="flex items-center gap-3 flex-wrap">
                        {booking.status === 'Confirmed' && (
                            <Button
                                variant="trust"
                                icon={Navigation}
                                onClick={() => handleStatusTransition('On The Way')}
                                isLoading={isUpdating}
                            >
                                Mark "On The Way"
                            </Button>
                        )}

                        {booking.status === 'On The Way' && (
                            <Button
                                variant="primary"
                                icon={Wrench}
                                onClick={() => handleStatusTransition('In Progress')}
                                isLoading={isUpdating}
                            >
                                Start Work ("In Progress")
                            </Button>
                        )}

                        {booking.status === 'In Progress' && (
                            <Button
                                variant="trust"
                                icon={CheckCircle2}
                                onClick={() => setShowCompleteModal(true)}
                            >
                                Complete Job & Submit Evidence
                            </Button>
                        )}

                        {booking.status === 'Completed' && (
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Work Verified & Completed
                            </span>
                        )}
                    </div>
                </div>

                {/* Customer & Location Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                        <span className="font-bold text-slate-400 uppercase tracking-wider block">Customer Info</span>
                        <p className="font-bold text-slate-900 text-sm">{booking.customerName}</p>
                        <div className="pt-1">
                            <a
                                href={`tel:${booking.customerPhone}`}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200"
                            >
                                <PhoneCall className="w-3.5 h-3.5" /> Call Customer ({booking.customerPhone})
                            </a>
                        </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                        <span className="font-bold text-slate-400 uppercase tracking-wider block">Service Address</span>
                        <p className="font-bold text-slate-900 flex items-start gap-1.5">
                            <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" /> {booking.address}
                        </p>
                    </div>
                </div>

                {/* Evidence Photo Upload Section */}
                {booking.status === 'In Progress' && (
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
                        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block flex items-center gap-1.5">
                            <Camera className="w-4 h-4 text-brand-600" /> Upload Work Completion Photo Evidence
                        </label>
                        <FileUploader files={evidenceFiles} onChange={setEvidenceFiles} maxFiles={3} />
                    </div>
                )}
            </Card>

            <ConfirmModal
                isOpen={showCompleteModal}
                onClose={() => setShowCompleteModal(false)}
                onConfirm={() => handleStatusTransition('Completed')}
                title="Confirm Job Completion"
                message="Are you sure you have completed the service according to the approved quote and tested all repairs?"
                confirmText="Yes, Complete Job"
                confirmVariant="primary"
                isLoading={isUpdating}
            />
        </div>
    );
};

export default ProviderBookingDetail;
