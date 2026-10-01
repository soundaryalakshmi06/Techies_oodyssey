import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProvidersThunk } from '../../store/slices/providerSlice';
import ProviderCard from '../../components/common/ProviderCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import { Search, ShieldCheck, MapPin, Globe } from 'lucide-react';

export const Matches = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { providers, loading, error } = useSelector((state) => state.providers);

    useEffect(() => {
        dispatch(fetchProvidersThunk());
    }, [dispatch]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="border-b border-slate-200 pb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                    <span>Real-time Provider Matching Engine</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Matching Professionals
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                    Showing available, background-verified specialists matching your request area & language
                </p>
            </div>

            {/* Matching List Content */}
            {loading ? (
                <div className="space-y-4">
                    <p className="text-xs text-brand-600 font-bold animate-pulse flex items-center gap-2">
                        <span>⚡</span> Finding matching professionals nearby…
                    </p>
                    <LoadingSkeleton type="card" count={3} />
                </div>
            ) : !providers || providers.length === 0 ? (
                <EmptyState
                    title="No matching professionals found nearby"
                    description="We couldn't find available professionals matching your current location or service criteria."
                    actionText="Search All Professionals"
                    onAction={() => navigate('/customer/providers')}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {providers.map((provider) => (
                        <ProviderCard
                            key={provider._id}
                            provider={provider}
                            onSelect={(p) => navigate(`/customer/request/new?providerId=${p._id}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Matches;
