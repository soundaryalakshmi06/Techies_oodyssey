import React from 'react';
import Spinner from './Spinner';

export const Button = ({
    children,
    variant = 'primary', // primary, secondary, outline, danger, ghost, trust, emergency
    size = 'md', // sm, md, lg
    isLoading = false,
    loadingText = 'Loading...',
    disabled = false,
    fullWidth = false,
    type = 'button',
    onClick,
    className = '',
    icon: Icon = null,
    iconPosition = 'left',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const variantStyles = {
        primary: 'bg-brand-600 hover:bg-brand-700 text-white focus:ring-brand-500 shadow-sm shadow-brand-600/20',
        secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 focus:ring-slate-400',
        outline: 'border border-slate-300 hover:bg-slate-50 text-slate-700 focus:ring-brand-500',
        danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm shadow-red-600/20',
        ghost: 'hover:bg-slate-100 text-slate-700 focus:ring-slate-400',
        trust: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm shadow-emerald-600/20',
        emergency: 'bg-emergency-600 hover:bg-emergency-700 text-white focus:ring-emergency-500 shadow-md shadow-emergency-600/30 font-semibold tracking-wide animate-pulse-slow',
    };

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-xs gap-1.5',
        md: 'px-4 py-2.5 text-sm gap-2',
        lg: 'px-6 py-3.5 text-base gap-2.5',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            onClick={onClick}
            className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size]} ${widthStyle} ${className}`}
            {...props}
        >
            {isLoading ? (
                <>
                    <Spinner size="sm" className="text-current" />
                    <span>{loadingText}</span>
                </>
            ) : (
                <>
                    {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
                    <span>{children}</span>
                    {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
                </>
            )}
        </button>
    );
};

export default Button;
