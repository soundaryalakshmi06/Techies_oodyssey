import React from 'react';
import Button from './Button';
import { SearchX, Inbox, RefreshCw } from 'lucide-react';

export const EmptyState = ({
    title = 'No records found',
    description = 'There are no items matching your criteria at this time.',
    icon: Icon = Inbox,
    actionText,
    onAction,
    secondaryActionText,
    onSecondaryAction,
    className = '',
}) => {
    return (
        <div className={`flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-200/80 shadow-sm ${className}`}>
            <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                <Icon className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500 max-w-md mt-1 mb-6 leading-relaxed">
                {description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
                {actionText && onAction && (
                    <Button variant="primary" onClick={onAction}>
                        {actionText}
                    </Button>
                )}
                {secondaryActionText && onSecondaryAction && (
                    <Button variant="outline" onClick={onSecondaryAction}>
                        {secondaryActionText}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default EmptyState;
