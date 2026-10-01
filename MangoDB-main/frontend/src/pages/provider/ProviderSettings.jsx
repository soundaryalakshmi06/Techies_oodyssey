import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Checkbox from '../../components/common/Checkbox';
import Select from '../../components/common/Select';
import { showToast } from '../../store/slices/toastSlice';
import { useDispatch } from 'react-redux';
import { Settings as SettingsIcon, Bell, Globe, Save } from 'lucide-react';

export const ProviderSettings = () => {
    const dispatch = useDispatch();

    const [settings, setSettings] = useState({
        language: 'Tamil',
        smsAlerts: true,
        emergencyBroadcasts: true,
        emailReceipts: true,
    });

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(
            showToast({
                type: 'success',
                message: 'Provider desk preferences updated.',
            })
        );
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="border-b border-slate-200 pb-6 space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <SettingsIcon className="w-6 h-6 text-brand-600" /> Professional Settings
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                    Configure lead notification alerts, SMS dispatch preferences, and language defaults
                </p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                <Card className="space-y-4">
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
                        <Globe className="w-5 h-5 text-brand-600" /> Primary Customer Communication Language
                    </h3>

                    <Select
                        label="Default Customer Language Preference"
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

                <Card className="space-y-4">
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
                        <Bell className="w-5 h-5 text-brand-600" /> Lead Alerts & Emergency Broadcasts
                    </h3>

                    <div className="space-y-3">
                        <Checkbox
                            label="24/7 Priority Emergency Broadcasts"
                            description="Receive high-priority emergency notifications when a customer needs urgent service within 10km."
                            checked={settings.emergencyBroadcasts}
                            onChange={(e) => setSettings({ ...settings, emergencyBroadcasts: e.target.checked })}
                        />

                        <Checkbox
                            label="SMS Dispatch Messages"
                            description="Receive instant SMS notifications when customers accept your price quotes."
                            checked={settings.smsAlerts}
                            onChange={(e) => setSettings({ ...settings, smsAlerts: e.target.checked })}
                        />
                    </div>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" variant="primary" icon={Save}>
                        Save Settings
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProviderSettings;
