import React, { forwardRef } from 'react';

export const Textarea = forwardRef(({
    label,
    error,
    helperText,
    id,
    rows = 4,
    placeholder,
    required = false,
    disabled = false,
    className = '',
    containerClassName = '',
    maxLength,
    value,
    ...props
}, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
        <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
            {label && (
                <label htmlFor={textareaId} className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                    <span>
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </span>
                    {maxLength && (
                        <span className="text-xs text-slate-400 font-normal">
                            {currentLength}/{maxLength}
                        </span>
                    )}
                </label>
            )}

            <textarea
                ref={ref}
                id={textareaId}
                rows={rows}
                disabled={disabled}
                placeholder={placeholder}
                required={required}
                maxLength={maxLength}
                value={value}
                className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:bg-slate-100 disabled:text-slate-500 ${error
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-slate-300 focus:border-brand-500'
                    } ${className}`}
                {...props}
            />

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

Textarea.displayName = 'Textarea';
export default Textarea;
