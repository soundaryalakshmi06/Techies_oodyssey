import React from 'react';

export const Tabs = ({
    tabs = [],
    activeTab,
    onChange,
    className = '',
}) => {
    return (
        <div className={`border-b border-slate-200 overflow-x-auto no-scrollbar ${className}`}>
            <nav className="flex space-x-6 min-w-max" aria-label="Tabs">
                {tabs.map((tab) => {
                    const id = typeof tab === 'object' ? tab.id : tab;
                    const label = typeof tab === 'object' ? tab.label : tab;
                    const count = typeof tab === 'object' ? tab.count : undefined;
                    const isActive = activeTab === id;

                    return (
                        <button
                            key={id}
                            type="button"
                            onClick={() => onChange(id)}
                            className={`py-3 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${isActive
                                    ? 'border-brand-600 text-brand-600 font-semibold'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <span>{label}</span>
                            {count !== undefined && (
                                <span
                                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isActive
                                            ? 'bg-brand-100 text-brand-700'
                                            : 'bg-slate-100 text-slate-600'
                                        }`}
                                >
                                    {count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default Tabs;
