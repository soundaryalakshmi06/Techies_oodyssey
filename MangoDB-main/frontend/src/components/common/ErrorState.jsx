import React from 'react';
import Button from './Button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorState = ({
    title = 'Unable to load data',
    message = 'An error occurred while connecting to the server. Please check your connection and try again.',
    onRetry,
    secondaryActionText,
    onSecondaryAction,
    className = '',
}) => {
    return (
        <div className={`flex flex-col items-center justify-center p-10 text-center bg-red-50/50 rounded-2xl border border-red-200 shadow-sm ${className}`}>
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
                <AlertCircle className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600 max-w-md mt-1 mb-6 leading-relaxed">
                {message}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
                {onRetry && (
                    <Button variant="danger" onClick={onRetry} icon={RefreshCw}>
                        Try Again / Retry
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

export default ErrorState;
