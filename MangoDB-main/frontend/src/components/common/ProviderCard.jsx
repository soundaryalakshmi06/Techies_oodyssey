import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import Badge from './Badge';
import StatusBadge from './StatusBadge';
import RatingStars from './RatingStars';
import Button from './Button';
import { formatCurrency, formatDistance } from '../../utils/formatters';
import { ShieldCheck, MapPin, Globe, Briefcase, Award } from 'lucide-react';

export const ProviderCard = ({
    provider,
    onSelect,
    className = '',
}) => {
    const navigate = useNavigate();

    if (!provider) return null;

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
        rating = 4.8,
        reviewCount = 12,
        address,
        distanceMeters,
        distanceKm,
    } = provider;

    const categoryName = typeof category === 'object' ? category.name : category;
    const distanceStr = formatDistance(distanceMeters, distanceKm);
    const isVerified = verificationStatus === 'Approved' || verificationStatus === 'Verified';

    return (
        <Card hoverable className={`flex flex-col justify-between h-full ${className}`}>
            <div className="space-y-4">
                {/* Header: Photo / Initials + Name + Verification + Availability */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 font-bold text-lg flex items-center justify-center shrink-0 border border-brand-200 shadow-inner">
                            {name ? name.charAt(0).toUpperCase() : 'P'}
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <h3 className="font-bold text-slate-900 text-base">{name}</h3>
                                {isVerified && (
                                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" title="Verified Professional" />
                                )}
                            </div>
                            <p className="text-xs font-semibold text-brand-600">{categoryName || 'Home Services'}</p>
                        </div>
                    </div>
                    <StatusBadge status={available ? 'Available' : 'Offline'} />
                </div>

                {/* Rating + Distance */}
                <div className="flex items-center justify-between gap-2 text-xs pt-1 border-t border-slate-100">
                    <RatingStars rating={rating} reviewCount={reviewCount} showValue size="sm" />
                    {distanceStr && (
                        <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                            <MapPin className="w-3 h-3 text-slate-500" /> {distanceStr}
                        </span>
                    )}
                </div>

                {/* Details: Experience, Price, Languages */}
                <div className="space-y-2 text-xs text-slate-600">
                    {experienceYears !== undefined && (
                        <div className="flex items-center gap-2">
                            <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{experienceYears} years experience</span>
                        </div>
                    )}

                    {priceFrom !== undefined && (
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-800">Starting from:</span>
                            <span className="font-bold text-emerald-700 text-sm">{formatCurrency(priceFrom)}</span>
                        </div>
                    )}

                    {languages && languages.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap pt-1">
                            <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            {languages.map((lang, idx) => (
                                <Badge key={idx} variant="gray" size="sm">
                                    {lang}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {services && services.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap pt-1">
                            {services.slice(0, 3).map((srv, idx) => (
                                <span key={idx} className="bg-brand-50 text-brand-700 px-2 py-0.5 rounded text-[11px] font-medium">
                                    {srv}
                                </span>
                            ))}
                            {services.length > 3 && (
                                <span className="text-[11px] text-slate-400 font-medium">
                                    +{services.length - 3} more
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Card Footer Actions */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => navigate(`/customer/providers/${_id}`)}
                >
                    View Profile
                </Button>
                <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => {
                        if (onSelect) onSelect(provider);
                        else navigate(`/customer/request/new?providerId=${_id}`);
                    }}
                >
                    Request Service
                </Button>
            </div>
        </Card>
    );
};

export default ProviderCard;
