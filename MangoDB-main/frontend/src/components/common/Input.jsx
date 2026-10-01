import React, { forwardRef } from 'react';

export const Input = forwardRef(({
    label,
    error,
    helperText,
    id,
    type = 'text',
    placeholder,
    required = false,
    disabled = false,
    icon: Icon = null,
    rightElement = null,
    className = '',
    containerClassName = '',
    ...props
}, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
        <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
            {label && (
                <label htmlFor={inputId} className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                    <span>
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </span>
                </label>
            )}

            <div className="relative flex items-center">
                {Icon && (
                    <div className="absolute left-3 pointer-events-none text-slate-400">
                        <Icon className="w-5 h-5" />
                    </div>
                )}

                <input
                    ref={ref}
                    id={inputId}
                    type={type}
                    disabled={disabled}
                    placeholder={placeholder}
                    required={required}
                    className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:bg-slate-100 disabled:text-slate-500 ${Icon ? 'pl-10' : ''
                        } ${rightElement ? 'pr-10' : ''} ${error
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-slate-300 focus:border-brand-500'
                        } ${className}`}
                    {...props}
                />

                {rightElement && (
                    <div className="absolute right-3 flex items-center">
                        {rightElement}
                    </div>
                )}
            </div>

            {error ? (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-0.5">
                    <span>⚠️</span> {error}
                </p>
            ) : helperText ? (
                <p className="text-xs text-slate-500 mt-0.5">{helperText}</p>
            ) : null}
        </div>
    );
});

Input.displayName = 'Input';
export default Input;
