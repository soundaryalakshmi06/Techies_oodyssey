import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProviderCard from '../../components/common/ProviderCard';
import EmptyState from '../../components/common/EmptyState';
import { Bookmark, ShieldCheck } from 'lucide-react';

export const SavedProviders = () => {
    const navigate = useNavigate();

    const [savedList, setSavedList] = useState([
        {
            _id: 'prov-1',
            name: 'K. Murugan',
            category: 'Electrical Works',
            services: ['Main Wiring', 'MCB Tripping', 'Switchboard Repair'],
            experienceYears: 8,
            priceFrom: 350,
            languages: ['Tamil', 'English'],
            available: true,
            verificationStatus: 'Approved',
            rating: 4.9,
            reviewCount: 24,
            address: 'T. Nagar, Chennai',
        },
    ]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="border-b border-slate-200 pb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold">
                    <Bookmark className="w-3.5 h-3.5 text-brand-600" />
                    <span>My Shortlisted Specialists</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Saved Professionals
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                    Quickly re-hire or request quotes from your preferred verified technicians
                </p>
            </div>

            {savedList.length === 0 ? (
                <EmptyState
                    title="No saved professionals yet"
                    description="Click 'Save Professional' on any specialist profile to shortlist them here."
                    actionText="Find Professionals"
                    onAction={() => navigate('/customer/providers')}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedList.map((p) => (
                        <ProviderCard key={p._id} provider={p} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedProviders;
