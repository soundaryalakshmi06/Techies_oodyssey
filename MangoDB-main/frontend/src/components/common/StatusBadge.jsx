import React from 'react';
import Badge from './Badge';
import { CheckCircle2, XCircle, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

export const StatusBadge = ({ status, className = '' }) => {
    if (!status) return null;

    const normalized = String(status).toLowerCase();

    if (normalized === 'approved' || normalized === 'verified') {
        return (
            <Badge variant="trust" icon={ShieldCheck} className={className}>
                {status}
            </Badge>
        );
    }

    if (normalized === 'rejected' || normalized === 'cancelled') {
        return (
            <Badge variant="danger" icon={XCircle} className={className}>
                {status}
            </Badge>
        );
    }

    if (normalized === 'pending' || normalized === 'requested' || normalized === 'awaiting') {
        return (
            <Badge variant="warning" icon={Clock} className={className}>
                {status}
            </Badge>
        );
    }

    if (normalized === 'completed' || normalized === 'resolved') {
        return (
            <Badge variant="trust" icon={CheckCircle2} className={className}>
                {status}
            </Badge>
        );
    }

    if (normalized === 'active' || normalized === 'confirmed' || normalized === 'in_progress') {
        return (
            <Badge variant="brand" icon={CheckCircle2} className={className}>
                {status}
            </Badge>
        );
    }

    if (normalized === 'available' || normalized === 'online') {
        return (
            <Badge variant="trust" className={className}>
                ● Available
            </Badge>
        );
    }

    if (normalized === 'offline' || normalized === 'unavailable') {
        return (
            <Badge variant="gray" className={className}>
                ○ Offline
            </Badge>
        );
    }

    return (
        <Badge variant="gray" className={className}>
            {status}
        </Badge>
    );
};

export default StatusBadge;
