import React, { forwardRef } from 'react';

export const Checkbox = forwardRef(({
    label,
    description,
    error,
    id,
    checked,
    onChange,
    disabled = false,
    required = false,
    className = '',
    ...props
}, ref) => {
    const checkboxId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
        <div className={`flex items-start gap-3 ${className}`}>
            <div className="flex items-center h-5 mt-0.5">
                <input
                    ref={ref}
                    id={checkboxId}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                    {...props}
                />
            </div>
            {(label || description) && (
                <div className="text-sm">
                    {label && (
                        <label htmlFor={checkboxId} className="font-medium text-slate-800 cursor-pointer select-none">
                            {label}
                            {required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                    )}
                    {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
                    {error && <p className="text-xs text-red-600 font-medium mt-0.5">{error}</p>}
                </div>
            )}
        </div>
    );
});

Checkbox.displayName = 'Checkbox';
export default Checkbox;
