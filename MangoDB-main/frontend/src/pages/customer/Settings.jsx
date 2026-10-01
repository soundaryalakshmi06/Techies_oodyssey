import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Checkbox from '../../components/common/Checkbox';
import Select from '../../components/common/Select';
import { showToast } from '../../store/slices/toastSlice';
import { useDispatch } from 'react-redux';
import { Settings as SettingsIcon, Bell, Globe, Shield, Save } from 'lucide-react';

export const Settings = () => {
    const dispatch = useDispatch();

    const [settings, setSettings] = useState({
        language: 'Tamil',
        smsNotifications: true,
        emailNotifications: true,
        emergencyAlerts: true,
        locationSharing: true,
    });

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(
            showToast({
                type: 'success',
                message: 'Account preferences updated successfully.',
            })
        );
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Header */}
            <div className="border-b border-slate-200 pb-6 space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <SettingsIcon className="w-6 h-6 text-brand-600" /> Account Settings
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                    Manage language defaults, notification alerts, and privacy preferences
                </p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {/* Language Preferences */}
                <Card className="space-y-4">
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
                        <Globe className="w-5 h-5 text-brand-600" /> Language Preferences
                    </h3>

                    <Select
                        label="Default System & Voice Language"
                        options={[
                            { value: 'Tamil', label: 'Tamil (தமிழ்)' },
                            { value: 'English', label: 'English' },
                            { value: 'Telugu', label: 'Telugu (తెలుగు)' },
                            { value: 'Hindi', label: 'Hindi (हिंदी)' },
                            { value: 'Kannada', label: 'Kannada' },
                            { value: 'Malayalam', label: 'Malayalam' },
                        ]}
                        value={settings.language}
                        onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                    />
                </Card>

                {/* Notifications */}
                <Card className="space-y-4">
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
                        <Bell className="w-5 h-5 text-brand-600" /> Notifications & Alerts
                    </h3>

                    <div className="space-y-3">
                        <Checkbox
                            label="Emergency Alerts"
                            description="Receive instant alerts for 24/7 priority emergency responses."
                            checked={settings.emergencyAlerts}
                            onChange={(e) => setSettings({ ...settings, emergencyAlerts: e.target.checked })}
                        />

                        <Checkbox
                            label="SMS Notification Messages"
                            description="Receive SMS updates when quotes are submitted or provider arrives."
                            checked={settings.smsNotifications}
                            onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                        />

                        <Checkbox
                            label="Email Receipts & Invoices"
                            description="Automatically receive digital invoices via email after job completion."
                            checked={settings.emailNotifications}
                            onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                        />
                    </div>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button type="submit" variant="primary" icon={Save}>
                        Save Preferences
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Settings;
