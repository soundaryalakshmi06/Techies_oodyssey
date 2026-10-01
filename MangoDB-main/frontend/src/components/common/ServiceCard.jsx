import React from 'react';
import Card from './Card';
import { Wrench, Zap, Hammer, ShieldAlert, Sparkles, Home, ArrowRight } from 'lucide-react';

const iconMap = {
    plumbing: Wrench,
    electrical: Zap,
    carpentry: Hammer,
    emergency: ShieldAlert,
    cleaning: Sparkles,
    appliance: Home,
};

export const ServiceCard = ({
    category,
    onClick,
    className = '',
}) => {
    if (!category) return null;

    const { name, description, icon, slug } = category;
    const key = (slug || name || '').toLowerCase();
    const IconComponent = iconMap[key] || Wrench;

    return (
        <Card
            hoverable
            onClick={onClick}
            className={`group flex flex-col justify-between h-full bg-gradient-to-br from-white to-slate-50/50 ${className}`}
        >
            <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 group-hover:bg-brand-600 group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                    <IconComponent className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-600 transition-colors">
                        {name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {description || 'Verified local experts ready to serve.'}
                    </p>
                </div>
            </div>

            <div className="pt-4 mt-2 flex items-center text-xs font-semibold text-brand-600 group-hover:translate-x-1 transition-transform">
                <span>Find Professionals</span>
                <ArrowRight className="w-4 h-4 ml-1" />
            </div>
        </Card>
    );
};

export default ServiceCard;
