import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProviderAvailabilityThunk } from '../../store/slices/providerSlice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Select from '../../components/common/Select';
import Input from '../../components/common/Input';
import { ToggleLeft, ToggleRight, Clock, MapPin, ShieldCheck } from 'lucide-react';

export const ProviderAvailability = () => {
    const dispatch = useDispatch();
    const { isAvailable } = useSelector((state) => state.providers);

    const handleToggle = () => {
        dispatch(updateProviderAvailabilityThunk({ available: !isAvailable }));
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Header */}
            <div className="border-b border-slate-200 pb-6 space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <Clock className="w-6 h-6 text-brand-600" /> Duty Status & Operating Hours
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                    Control when customer service requests are routed to your phone
                </p>
            </div>

            <Card className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div>
                        <h3 className="font-bold text-slate-900 text-base">Online Duty Mode</h3>
                        <p className="text-xs text-slate-500">
                            When online, nearby customers can see your profile and send requests.
                        </p>
                    </div>

                    <Button
                        variant={isAvailable ? 'trust' : 'secondary'}
                        icon={isAvailable ? ToggleRight : ToggleLeft}
                        onClick={handleToggle}
                    >
                        {isAvailable ? '🟢 Active Online' : '🔴 Offline'}
                    </Button>
                </div>

                <div className="space-y-4 pt-2">
                    <h4 className="font-bold text-slate-900 text-sm">Preferred Service Radius</h4>
                    <Select
                        label="Service Coverage Area"
                        icon={MapPin}
                        options={[
                            { value: '5', label: 'Within 5 km radius' },
                            { value: '10', label: 'Within 10 km radius (Recommended)' },
                            { value: '15', label: 'Within 15 km radius' },
                            { value: '25', label: 'Entire City / Metro Region' },
                        ]}
                        value="10"
                        onChange={() => { }}
                    />
                </div>
            </Card>
        </div>
    );
};

export default ProviderAvailability;
