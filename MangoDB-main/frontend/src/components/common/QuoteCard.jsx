import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import ConfirmModal from './ConfirmModal';
import RatingStars from './RatingStars';
import StatusBadge from './StatusBadge';
import { formatCurrency } from '../../utils/formatters';
import { ShieldCheck, Clock, FileText, CheckCircle2, XCircle } from 'lucide-react';

export const QuoteCard = ({
    quote,
    onApprove,
    onReject,
    role = 'customer',
    className = '',
}) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!quote) return null;

    const {
        _id,
        providerName = 'Verified Professional',
        providerRating = 4.9,
        serviceName = 'General Service',
        probableIssue = 'Inspected on-site issue.',
        procedure = 'Standard diagnostic and repair sequence.',
        serviceCharge = 0,
        partsCost = 0,
        expectedDuration = '1 - 2 hours',
        notes = '',
        status = 'Pending',
    } = quote;

    const totalAmount = (Number(serviceCharge) || 0) + (Number(partsCost) || 0);

    const handleConfirmApprove = async () => {
        setIsSubmitting(true);
        try {
            if (onApprove) await onApprove(_id);
        } finally {
            setIsSubmitting(false);
            setShowConfirmModal(false);
        }
    };

    return (
        <Card className={`space-y-4 border-brand-200 bg-gradient-to-b from-white to-brand-50/20 ${className}`}>
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                    <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-900 text-base">{providerName}</h3>
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <RatingStars rating={providerRating} showValue size="sm" />
                        <span>• {serviceName}</span>
                    </div>
                </div>
                <StatusBadge status={status} />
            </div>

            {/* Assessment & Procedure */}
            <div className="space-y-2 text-xs text-slate-700">
                <div>
                    <span className="font-bold text-slate-900 block">Probable Issue Identified:</span>
                    <p className="bg-slate-100/80 p-2.5 rounded-lg text-slate-700 mt-1">{probableIssue}</p>
                </div>
                <div>
                    <span className="font-bold text-slate-900 block">Recommended Procedure:</span>
                    <p className="bg-slate-100/80 p-2.5 rounded-lg text-slate-700 mt-1">{procedure}</p>
                </div>
                {notes && (
                    <div>
                        <span className="font-bold text-slate-900 block">Provider Notes:</span>
                        <p className="text-slate-600 italic mt-0.5">{notes}</p>
                    </div>
                )}
            </div>

            {/* Price Breakdown */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                    <span>Service Charge / Inspection</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(serviceCharge)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                    <span>Required Parts & Materials</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(partsCost)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-100 pt-2">
                    <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> Expected Duration:
                    </span>
                    <span className="font-medium text-slate-700">{expectedDuration}</span>
                </div>
                <div className="flex justify-between items-center text-base font-bold text-slate-900 border-t border-slate-200 pt-2.5">
                    <span>Total Estimate</span>
                    <span className="text-emerald-700 text-lg">{formatCurrency(totalAmount)}</span>
                </div>
            </div>

            {/* Customer Action Buttons */}
            {role === 'customer' && status === 'Pending' && (
                <div className="flex items-center justify-end gap-3 pt-2">
                    {onReject && (
                        <Button
                            variant="outline"
                            size="sm"
                            icon={XCircle}
                            onClick={() => onReject(_id)}
                        >
                            Reject Quote
                        </Button>
                    )}
                    <Button
                        variant="trust"
                        size="sm"
                        icon={CheckCircle2}
                        onClick={() => setShowConfirmModal(true)}
                    >
                        Approve & Book
                    </Button>
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleConfirmApprove}
                title="Approve Estimate & Book Service"
                message={`Are you sure you want to approve this quote of ${formatCurrency(totalAmount)} from ${providerName}?`}
                confirmText="Yes, Approve Quote"
                confirmVariant="trust"
                isLoading={isSubmitting}
            />
        </Card>
    );
};

export default QuoteCard;
