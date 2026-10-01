import React, { forwardRef } from 'react';

export const Select = forwardRef(({
    label,
    error,
    helperText,
    id,
    options = [],
    placeholder = 'Select an option',
    required = false,
    disabled = false,
    icon: Icon = null,
    className = '',
    containerClassName = '',
    value,
    onChange,
    ...props
}, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
        <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
            {label && (
                <label htmlFor={selectId} className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative flex items-center">
                {Icon && (
                    <div className="absolute left-3 pointer-events-none text-slate-400">
                        <Icon className="w-5 h-5" />
                    </div>
                )}

                <select
                    ref={ref}
                    id={selectId}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:bg-slate-100 disabled:cursor-not-allowed ${Icon ? 'pl-10' : ''
                        } pr-10 ${error
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-slate-300 focus:border-brand-500'
                        } ${className}`}
                    {...props}
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map((opt) => {
                        const val = typeof opt === 'object' ? opt.value : opt;
                        const lbl = typeof opt === 'object' ? opt.label : opt;
                        return (
                            <option key={val} value={val}>
                                {lbl}
                            </option>
                        );
                    })}
                </select>

                <div className="absolute right-3 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                </div>
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

Select.displayName = 'Select';
export default Select;
