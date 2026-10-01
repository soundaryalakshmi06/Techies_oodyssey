import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProviderByIdThunk } from '../../store/slices/providerSlice';
import { showToast } from '../../store/slices/toastSlice';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import StatusBadge from '../../components/common/StatusBadge';
import RatingStars from '../../components/common/RatingStars';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ErrorState from '../../components/common/ErrorState';
import { formatCurrency } from '../../utils/formatters';
import {
    ShieldCheck,
    MapPin,
    Globe,
    Award,
    Wrench,
    ArrowLeft,
    Bookmark,
    CalendarCheck,
    CheckCircle2,
} from 'lucide-react';

export const ProviderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { selectedProvider: provider, loading, error } = useSelector((state) => state.providers);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchProviderByIdThunk(id));
        }
    }, [id, dispatch]);

    const handleSaveToggle = () => {
        setIsSaved(!isSaved);
        dispatch(
            showToast({
                type: 'info',
                message: !isSaved
                    ? 'Professional saved to your shortlist (Local feature).'
                    : 'Removed from saved professionals.',
            })
        );
    };

    if (loading) return <LoadingSkeleton type="detail" />;

    if (error || !provider) {
        return (
            <ErrorState
                title="Could not find provider details"
                message={error || 'Professional profile not found or unavailable.'}
                onRetry={() => dispatch(fetchProviderByIdThunk(id))}
            />
        );
    }

    const {
        _id,
        name,
        category,
        services = [],
        experienceYears,
        priceFrom,
        languages = [],
        available,
        verificationStatus,
        rating = 4.9,
        reviewCount = 18,
        address,
    } = provider;

    const categoryName = typeof category === 'object' ? category.name : category;
    const isVerified = verificationStatus === 'Approved' || verificationStatus === 'Verified';

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Back button */}
            <Button
                variant="ghost"
                size="sm"
                icon={ArrowLeft}
                onClick={() => navigate('/customer/providers')}
            >
                Back to All Professionals
            </Button>

            {/* Main Profile Header Card */}
            <Card className="bg-gradient-to-br from-white via-white to-slate-50/60 space-y-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex items-start gap-5">
                        <div className="w-20 h-20 rounded-3xl bg-brand-600 text-white font-extrabold text-3xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-600/30">
                            {name ? name.charAt(0).toUpperCase() : 'P'}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h1 className="text-2xl font-extrabold text-slate-900">{name}</h1>
                                {isVerified && (
                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                                        <ShieldCheck className="w-4 h-4 text-emerald-600" /> Admin Verified
                                    </span>
                                )}
                            </div>

                            <p className="text-sm font-semibold text-brand-600">{categoryName || 'Home Service Expert'}</p>

                            <div className="flex items-center gap-3 flex-wrap text-xs text-slate-600">
                                <RatingStars rating={rating} reviewCount={reviewCount} showValue size="md" />
                                {address && (
                                    <span className="flex items-center gap-1 text-slate-500">
                                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {address}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                        <StatusBadge status={available ? 'Available' : 'Offline'} />
                        <div className="text-left md:text-right">
                            <span className="text-[11px] text-slate-400 uppercase font-semibold block">Starting Rate</span>
                            <span className="text-2xl font-extrabold text-emerald-700">{formatCurrency(priceFrom)}</span>
                        </div>
                    </div>
                </div>

                {/* Primary Action Row */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <Button
                            variant={isSaved ? 'secondary' : 'outline'}
                            size="sm"
                            icon={Bookmark}
                            onClick={handleSaveToggle}
                        >
                            {isSaved ? 'Saved to List' : 'Save Professional'}
                        </Button>
                    </div>

                    <Button
                        variant="primary"
                        size="lg"
                        icon={CalendarCheck}
                        onClick={() => navigate(`/customer/request/new?providerId=${_id}`)}
                        className="shadow-md shadow-brand-600/30"
                    >
                        Request Service Now
                    </Button>
                </div>
            </Card>

            {/* Detail Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left 2 Cols: Experience & Services */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="space-y-4">
                        <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3 flex items-center gap-2">
                            <Wrench className="w-5 h-5 text-brand-600" /> Services & Expertise
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed">
                            Specialized home service professional providing transparent pricing and native language communication.
                        </p>

                        {services && services.length > 0 && (
                            <div className="space-y-2">
                                <span className="text-xs font-bold text-slate-700 block">Specific Services Offered:</span>
                                <div className="flex flex-wrap gap-2">
                                    {services.map((srv, idx) => (
                                        <span key={idx} className="bg-brand-50 text-brand-700 border border-brand-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" /> {srv}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* Verification & Trust Specs */}
                    <Card className="space-y-4">
                        <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-emerald-600" /> Background & Trust Specs
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                                <span className="text-slate-500 font-medium">Government ID Check</span>
                                <p className="font-bold text-slate-800 flex items-center gap-1 text-emerald-700">
                                    ✓ Verified by Admin
                                </p>
                            </div>

                            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                                <span className="text-slate-500 font-medium">Experience Level</span>
                                <p className="font-bold text-slate-800">{experienceYears} Years Active</p>
                            </div>

                            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                                <span className="text-slate-500 font-medium">Quote Policy</span>
                                <p className="font-bold text-slate-800">Fixed upfront estimate prior to repair</p>
                            </div>

                            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                                <span className="text-slate-500 font-medium">Evidence Commitment</span>
                                <p className="font-bold text-slate-800">Before & After Photo Proof</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right 1 Col: Languages & Quick Info */}
                <div className="space-y-6">
                    <Card className="space-y-4">
                        <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-brand-600" /> Languages Spoken
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            {languages.map((lang, idx) => (
                                <Badge key={idx} variant="brand" size="md">
                                    {lang}
                                </Badge>
                            ))}
                        </div>

                        <p className="text-[11px] text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                            You can send voice notes or speak directly with {name} in these languages.
                        </p>
                    </Card>

                    <Card className="bg-brand-900 text-white space-y-4">
                        <h4 className="font-bold text-base text-white">Ready to hire {name}?</h4>
                        <p className="text-xs text-brand-200 leading-relaxed">
                            Describe your issue, attach photos or audio notes, and receive a formal estimate.
                        </p>
                        <Button
                            variant="trust"
                            fullWidth
                            onClick={() => navigate(`/customer/request/new?providerId=${_id}`)}
                        >
                            Request Quote Now
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProviderDetail;
