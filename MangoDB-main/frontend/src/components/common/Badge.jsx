import React from 'react';

export const Badge = ({
    children,
    variant = 'brand', // brand, trust, warning, danger, gray, outline
    size = 'md', // sm, md
    className = '',
    icon: Icon = null,
}) => {
    const variantClasses = {
        brand: 'bg-brand-100 text-brand-800 border-brand-200',
        trust: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        warning: 'bg-amber-100 text-amber-800 border-amber-200',
        danger: 'bg-red-100 text-red-800 border-red-200',
        gray: 'bg-slate-100 text-slate-700 border-slate-200',
        outline: 'bg-transparent border-slate-300 text-slate-700',
    };

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs font-medium border',
        md: 'px-2.5 py-1 text-xs font-semibold border',
    };

    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        >
            {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
            <span>{children}</span>
        </span>
    );
};

export default Badge;
