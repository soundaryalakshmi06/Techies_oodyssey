import React from 'react';
import Card from '../../components/common/Card';
import RatingStars from '../../components/common/RatingStars';
import { Star, ShieldCheck, ThumbsUp } from 'lucide-react';

export const ProviderReviews = () => {
    const reviews = [
        {
            id: 'r-1',
            customerName: 'Anbu Selvan',
            serviceName: 'Main Switchboard & MCB Repair',
            rating: 5,
            comment: 'Murugan arrived within 20 minutes with genuine replacement parts. Explained everything in Tamil clearly before starting. High quality work!',
            date: '2 days ago',
        },
        {
            id: 'r-2',
            customerName: 'S. Ramanathan',
            serviceName: 'Ceiling Fan Wiring',
            rating: 5,
            comment: 'Very polite, professional, and transparent pricing. No hidden costs.',
            date: '1 week ago',
        },
    ];

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="border-b border-slate-200 pb-6 space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <Star className="w-6 h-6 text-amber-500 fill-amber-500" /> Customer Ratings & Reviews
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                    Verified reviews submitted by home care customers across Tamil Nadu
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {reviews.map((rev) => (
                    <Card key={rev.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                    {rev.customerName}
                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                </h4>
                                <p className="text-xs text-brand-600 font-semibold">{rev.serviceName}</p>
                            </div>
                            <span className="text-xs text-slate-400">{rev.date}</span>
                        </div>

                        <RatingStars rating={rev.rating} size="sm" showValue />

                        <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                            "{rev.comment}"
                        </p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ProviderReviews;
