import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createEmergencyRequest } from '../../api/endpoints';
import { showToast } from '../../store/slices/toastSlice';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import LocationButton from '../../components/common/LocationButton';
import VoiceRecorder from '../../components/common/VoiceRecorder';
import FileUploader from '../../components/common/FileUploader';
import ConfirmModal from '../../components/common/ConfirmModal';
import Card from '../../components/common/Card';
import { ShieldAlert, Zap, Wrench, Key, AlertTriangle, PhoneCall, Send, ShieldCheck } from 'lucide-react';

export const Emergency = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [category, setCategory] = useState('Electrical');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState(null);
    const [images, setImages] = useState([]);
    const [audioNote, setAudioNote] = useState(null);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = [
        { id: 'Electrical', label: 'Electrical Outage / Fire Hazard', icon: Zap },
        { id: 'Plumbing', label: 'Water Leak / Burst Pipe', icon: Wrench },
        { id: 'Locksmith', label: 'Door Lockout / Security Key', icon: Key },
        { id: 'Other', label: 'Other Urgent Emergency', icon: ShieldAlert },
    ];

    const handleLocationFound = (coords) => {
        setLocation({
            type: 'Point',
            coordinates: [coords.longitude, coords.latitude],
        });
    };

    const handleConfirmSubmit = async () => {
        setIsSubmitting(true);
        try {
            const payload = {
                category,
                description: description || '🚨 24/7 Immediate Emergency Service Requested',
                address,
                location,
                isEmergency: true,
            };

            const res = await createEmergencyRequest(payload);
            dispatch(
                showToast({
                    type: 'success',
                    message: '🚨 Emergency alert broadcast to all nearby verified professionals!',
                })
            );
            navigate(`/customer/emergency/${res.requestId || 'emg-301'}`);
        } catch (err) {
            console.error('Emergency request failed', err);
            dispatch(
                showToast({
                    type: 'error',
                    message: err.message || 'Failed to send emergency request.',
                })
            );
        } finally {
            setIsSubmitting(false);
            setShowConfirmModal(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Banner */}
            <div className="bg-gradient-to-r from-red-900 via-red-800 to-slate-950 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-2xl border border-red-700/60 relative overflow-hidden">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-red-600 text-white font-extrabold text-2xl flex items-center justify-center animate-bounce shadow-lg">
                        🚨
                    </div>
                    <div>
                        <span className="text-xs font-bold text-red-300 uppercase tracking-widest block">
                            24/7 Priority Emergency Hotline
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Need Immediate Assistance?</h1>
                    </div>
                </div>

                <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
                    Emergency requests bypass normal queuing and instantly alert all active verified technicians within a 10km radius.
                </p>

                <div className="flex items-center gap-4 text-xs font-bold pt-2 border-t border-red-800/80">
                    <span className="flex items-center gap-1.5 text-white">
                        <PhoneCall className="w-4 h-4 text-red-400" /> Helpline: 1800-425-VT-CARE
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-300">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" /> Priority Response
                    </span>
                </div>
            </div>

            {/* Warning Box */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-amber-950 text-sm">Use For Real Emergencies Only</h4>
                    <p className="mt-0.5 leading-relaxed text-amber-800">
                        Please use this feature only for severe hazards like active water bursts, short circuit sparking, or door lockouts requiring immediate dispatch.
                    </p>
                </div>
            </div>

            {/* Form Card */}
            <Card className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                        Select Emergency Category
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isSelected = category === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setCategory(cat.id)}
                                    className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${isSelected
                                            ? 'bg-red-50 border-red-500 text-red-900 font-bold shadow-sm ring-2 ring-red-500/20'
                                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${isSelected ? 'text-red-600' : 'text-slate-400'}`} />
                                    <span className="text-xs">{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <Textarea
                    label="Emergency Problem Description"
                    placeholder="Briefly state what happened (e.g., Main wire sparking near fuse box)"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <Textarea
                    label="Your Exact Address"
                    placeholder="Building name, flat number, street name"
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                        GPS Location Broadcast (Recommended for Fast Arrival)
                    </span>
                    <LocationButton onLocationFound={handleLocationFound} />
                </div>

                {/* Media & Voice */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                        Attach Hazard Photo (Optional)
                    </label>
                    <FileUploader files={images} onChange={setImages} maxFiles={2} />
                </div>

                <VoiceRecorder
                    audioBlob={audioNote?.blob}
                    audioUrl={audioNote?.url}
                    onAudioChange={setAudioNote}
                />

                <div className="pt-4 border-t border-slate-100">
                    <Button
                        variant="emergency"
                        fullWidth
                        size="lg"
                        icon={Send}
                        onClick={() => setShowConfirmModal(true)}
                        className="py-3.5 text-base"
                    >
                        Send 24/7 Emergency Alert Now
                    </Button>
                </div>
            </Card>

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleConfirmSubmit}
                title="Confirm 24/7 Emergency Broadcast"
                message={`Are you sure you want to broadcast an urgent ${category} emergency request to all available technicians nearby?`}
                confirmText="Yes, Send Emergency Alert"
                confirmVariant="emergency"
                isLoading={isSubmitting}
            />
        </div>
    );
};

export default Emergency;
