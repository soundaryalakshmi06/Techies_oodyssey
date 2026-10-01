import React, { useState, useRef, useEffect } from 'react';

export const Dropdown = ({
    trigger,
    items = [],
    align = 'right',
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const alignClass = align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left';

    return (
        <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer inline-block">
                {trigger}
            </div>

            {isOpen && (
                <div
                    className={`absolute ${alignClass} mt-2 w-56 rounded-xl bg-white shadow-lg border border-slate-100 ring-1 ring-black/5 z-40 py-1.5 focus:outline-none animate-fadeIn`}
                    role="menu"
                >
                    {items.map((item, index) => {
                        if (item.divider) {
                            return <div key={index} className="my-1 border-t border-slate-100" />;
                        }

                        const Icon = item.icon;

                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);
                                    if (item.onClick) item.onClick();
                                }}
                                className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors text-left ${item.danger
                                        ? 'text-red-600 hover:bg-red-50'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                                role="menuitem"
                            >
                                {Icon && <Icon className="w-4 h-4 shrink-0" />}
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
