import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCircle2, Clock, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const NotificationItem = ({
    notification,
    onMarkRead,
    className = '',
}) => {
    const navigate = useNavigate();

    if (!notification) return null;

    const {
        _id,
        title = 'Notification',
        message = '',
        createdAt = new Date().toISOString(),
        isRead = false,
        link = '',
        type = 'info',
    } = notification;

    const getIcon = () => {
        switch (type) {
            case 'quote':
                return <FileText className="w-5 h-5 text-brand-600" />;
            case 'booking':
                return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
            case 'emergency':
                return <AlertTriangle className="w-5 h-5 text-red-600" />;
            default:
                return <Bell className="w-5 h-5 text-slate-500" />;
        }
    };

    const handleClick = () => {
        if (onMarkRead && !_id.toString().startsWith('temp')) {
            onMarkRead(_id);
        }
        if (link) {
            navigate(link);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${isRead
                    ? 'bg-white border-slate-200/80 hover:bg-slate-50'
                    : 'bg-brand-50/40 border-brand-200 hover:bg-brand-50/70 shadow-sm'
                } ${className}`}
        >
            <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-100 shrink-0">
                {getIcon()}
            </div>

            <div className="grow pr-2">
                <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-sm ${isRead ? 'font-semibold text-slate-800' : 'font-bold text-slate-900'}`}>
                        {title}
                    </h4>
                    {!isRead && (
                        <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0" title="Unread" />
                    )}
                </div>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{message}</p>

                <div className="flex items-center justify-between mt-2 pt-1">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> {formatDate(createdAt)}
                    </span>

                    {link && (
                        <span className="text-[11px] font-semibold text-brand-600 flex items-center gap-1 hover:underline">
                            View <ArrowRight className="w-3 h-3" />
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationItem;
