import React from 'react';

export const Radio = ({
    label,
    description,
    name,
    value,
    checked,
    onChange,
    disabled = false,
    className = '',
}) => {
    const radioId = `${name}-${value}`;

    return (
        <label
            htmlFor={radioId}
            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${checked
                    ? 'border-brand-500 bg-brand-50/50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            <input
                id={radioId}
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="w-4 h-4 mt-0.5 text-brand-600 border-slate-300 focus:ring-brand-500 cursor-pointer"
            />
            <div className="text-sm">
                {label && <span className="font-semibold text-slate-800 block">{label}</span>}
                {description && <span className="text-xs text-slate-500 block mt-0.5">{description}</span>}
            </div>
        </label>
    );
};

export default Radio;
