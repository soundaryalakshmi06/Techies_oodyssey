import React from 'react';

export const LoadingSkeleton = ({
    type = 'card', // card, table, detail, list
    count = 3,
    className = '',
}) => {
    const PulseBox = ({ h = 'h-4', w = 'w-full', rounded = 'rounded-md', extra = '' }) => (
        <div className={`bg-slate-200 animate-pulse ${h} ${w} ${rounded} ${extra}`} />
    );

    if (type === 'card') {
        return (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-4">
                            <PulseBox h="h-14" w="w-14" rounded="rounded-full" />
                            <div className="grow space-y-2">
                                <PulseBox h="h-5" w="w-3/4" />
                                <PulseBox h="h-4" w="w-1/2" />
                            </div>
                        </div>
                        <PulseBox h="h-4" w="w-full" />
                        <PulseBox h="h-4" w="w-5/6" />
                        <div className="pt-2 flex justify-between items-center border-t border-slate-100">
                            <PulseBox h="h-6" w="w-24" />
                            <PulseBox h="h-9" w="w-28" rounded="rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (type === 'table') {
        return (
            <div className={`bg-white rounded-2xl border border-slate-200 overflow-hidden ${className}`}>
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between">
                    <PulseBox h="h-6" w="w-48" />
                    <PulseBox h="h-6" w="w-24" />
                </div>
                <div className="divide-y divide-slate-100 p-4 space-y-4">
                    {Array.from({ length: count }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3 w-1/3">
                                <PulseBox h="h-10" w="w-10" rounded="rounded-full" />
                                <PulseBox h="h-4" w="w-3/4" />
                            </div>
                            <PulseBox h="h-4" w="w-1/6" />
                            <PulseBox h="h-4" w="w-1/6" />
                            <PulseBox h="h-8" w="w-24" rounded="rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (type === 'detail') {
        return (
            <div className={`bg-white p-8 rounded-2xl border border-slate-200 space-y-6 ${className}`}>
                <div className="flex items-center gap-6">
                    <PulseBox h="h-24" w="w-24" rounded="rounded-2xl" />
                    <div className="grow space-y-3">
                        <PulseBox h="h-8" w="w-2/3" />
                        <PulseBox h="h-5" w="w-1/3" />
                        <PulseBox h="h-4" w="w-1/2" />
                    </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-slate-100">
                    <PulseBox h="h-4" w="w-full" />
                    <PulseBox h="h-4" w="w-full" />
                    <PulseBox h="h-4" w="w-4/5" />
                </div>
            </div>
        );
    }

    return (
        <div className={`space-y-3 ${className}`}>
            {Array.from({ length: count }).map((_, i) => (
                <PulseBox key={i} h="h-12" w="w-full" rounded="rounded-xl" />
            ))}
        </div>
    );
};

export default LoadingSkeleton;
