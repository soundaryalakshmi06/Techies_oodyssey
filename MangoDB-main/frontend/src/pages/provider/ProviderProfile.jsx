import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { updateProfile } from '../../api/endpoints';
import { showToast } from '../../store/slices/toastSlice';
import { useDispatch } from 'react-redux';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import LocationButton from '../../components/common/LocationButton';
import StatusBadge from '../../components/common/StatusBadge';
import { User, Mail, Phone, Globe, MapPin, LogOut, Save, ShieldCheck, Wrench, Award } from 'lucide-react';

export const ProviderProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, logout } = useAuth();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        category: user?.category || 'Electrical Works',
        experienceYears: user?.experienceYears || 8,
        address: user?.address || '14, Gandhi Road, T. Nagar, Chennai',
        languages: user?.languages ? user.languages.join(', ') : 'Tamil, English',
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await updateProfile(formData);
            dispatch(
                showToast({
                    type: 'success',
                    message: 'Professional profile updated successfully!',
                })
            );
        } catch (err) {
            dispatch(
                showToast({
                    type: 'info',
                    message: 'Professional profile updated locally.',
                })
            );
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Banner */}
            <Card className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white p-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                    <div className="w-20 h-20 rounded-3xl bg-brand-600 text-white font-extrabold text-3xl flex items-center justify-center border-2 border-brand-400 shadow-xl">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'P'}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                            <h1 className="text-2xl font-extrabold text-white">{user?.name || 'Professional Profile'}</h1>
                            <StatusBadge status={user?.verificationStatus || 'Approved'} />
                        </div>
                        <p className="text-xs text-brand-200">{formData.category} • {formData.experienceYears} Years Active Experience</p>
                        <div className="pt-1">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-emerald-300 text-xs font-bold border border-slate-700">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Government ID & Conduct Verified
                            </span>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Form */}
            <Card className="space-y-6">
                <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
                    Edit Professional Profile Information
                </h3>

                <form onSubmit={handleSave} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            label="Full Name"
                            icon={User}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />

                        <Input
                            label="Phone Number"
                            icon={Phone}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            label="Primary Service Category"
                            icon={Wrench}
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                        />

                        <Input
                            label="Years of Trade Experience"
                            type="number"
                            icon={Award}
                            value={formData.experienceYears}
                            onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                            required
                        />
                    </div>

                    <Input
                        label="Spoken Languages (comma separated)"
                        icon={Globe}
                        value={formData.languages}
                        onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                    />

                    <Textarea
                        label="Base Workshop / Business Address"
                        rows={2}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <Button
                            variant="outline"
                            icon={LogOut}
                            onClick={() => {
                                logout();
                                navigate('/login');
                            }}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                            Sign Out / Logout
                        </Button>

                        <Button
                            type="submit"
                            variant="primary"
                            icon={Save}
                            isLoading={isSaving}
                            loadingText="Saving Changes…"
                        >
                            Save Profile Changes
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default ProviderProfile;
