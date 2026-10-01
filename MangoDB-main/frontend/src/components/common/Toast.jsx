import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '../../store/slices/toastSlice';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastItem = ({ toast, onDismiss }) => {
    const { id, type, title, message, duration } = toast;

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onDismiss(id);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [id, duration, onDismiss]);

    const config = {
        success: {
            bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
            icon: CheckCircle2,
            iconColor: 'text-emerald-600',
        },
        error: {
            bg: 'bg-red-50 border-red-200 text-red-900',
            icon: AlertCircle,
            iconColor: 'text-red-600',
        },
        warning: {
            bg: 'bg-amber-50 border-amber-200 text-amber-900',
            icon: AlertTriangle,
            iconColor: 'text-amber-600',
        },
        info: {
            bg: 'bg-brand-50 border-brand-200 text-brand-900',
            icon: Info,
            iconColor: 'text-brand-600',
        },
    }[type || 'info'];

    const Icon = config.icon;

    return (
        <div
            className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg ${config.bg} max-w-sm w-full transition-all duration-300 animate-slideDown`}
            role="alert"
        >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconColor}`} />
            <div className="grow pr-2">
                {title && <h4 className="text-sm font-bold">{title}</h4>}
                {message && <p className="text-xs opacity-90 mt-0.5">{message}</p>}
            </div>
            <button
                type="button"
                onClick={() => onDismiss(id)}
                className="p-1 rounded-lg hover:bg-black/5 opacity-60 hover:opacity-100 transition-opacity"
                aria-label="Dismiss toast"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export const Toast = () => {
    const dispatch = useDispatch();
    const toasts = useSelector((state) => state.toast.toasts);

    if (!toasts || toasts.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
            {toasts.map((toast) => (
                <div key={toast.id} className="pointer-events-auto">
                    <ToastItem toast={toast} onDismiss={(id) => dispatch(removeToast(id))} />
                </div>
            ))}
        </div>
    );
};

export default Toast;
