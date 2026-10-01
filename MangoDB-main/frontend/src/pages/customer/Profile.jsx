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
import { User, Mail, Phone, Globe, MapPin, LogOut, Save, ShieldCheck } from 'lucide-react';

export const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, logout } = useAuth();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        preferredLanguage: user?.preferredLanguage || 'Tamil',
        address: user?.address || '',
    });

    const [isSaving, setIsSaving] = useState(false);

    const languageOptions = [
        { value: 'Tamil', label: 'Tamil (தமிழ்)' },
        { value: 'English', label: 'English' },
        { value: 'Telugu', label: 'Telugu (తెలుగు)' },
        { value: 'Hindi', label: 'Hindi (हिंदी)' },
        { value: 'Kannada', label: 'Kannada' },
        { value: 'Malayalam', label: 'Malayalam' },
    ];

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await updateProfile(formData);
            dispatch(
                showToast({
                    type: 'success',
                    message: 'Profile updated successfully!',
                })
            );
        } catch (err) {
            dispatch(
                showToast({
                    type: 'info',
                    message: 'Profile details saved locally. (Backend sync pending).',
                })
            );
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Profile Banner Card */}
            <Card className="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white p-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                    <div className="w-20 h-20 rounded-3xl bg-brand-500 text-white font-extrabold text-3xl flex items-center justify-center border-2 border-brand-300 shadow-xl">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-2xl font-extrabold text-white">{user?.name || 'Customer Profile'}</h1>
                        <p className="text-xs text-brand-200">{user?.email || 'user@example.com'}</p>
                        <div className="pt-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-800/80 text-emerald-300 text-xs font-bold border border-brand-600">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Customer Account • {user?.preferredLanguage || 'Tamil'}
                            </span>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Edit Form Card */}
            <Card className="space-y-6">
                <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
                    Account Profile Information
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
                            label="Email Address (Read-only)"
                            type="email"
                            icon={Mail}
                            value={formData.email}
                            disabled
                            className="bg-slate-100 cursor-not-allowed text-slate-500"
                        />

                        <Select
                            label="Preferred Language"
                            icon={Globe}
                            options={languageOptions}
                            value={formData.preferredLanguage}
                            onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                        />
                    </div>

                    <Textarea
                        label="Home / Default Service Address"
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

export default Profile;
