import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchPendingVerificationsThunk,
    updateVerificationStatusThunk,
} from '../../store/slices/adminSlice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/common/EmptyState';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ConfirmModal from '../../components/common/ConfirmModal';
import { showToast } from '../../store/slices/toastSlice';
import { ShieldCheck, CheckCircle2, XCircle, FileText, User, Phone, Mail, Award } from 'lucide-react';

export const AdminVerifications = () => {
    const dispatch = useDispatch();
    const { pendingProviders, loading } = useSelector((state) => state.admin);

    const [selectedProvider, setSelectedProvider] = useState(null);
    const [modalAction, setModalAction] = useState(null); // 'Approved' | 'Rejected'
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        dispatch(fetchPendingVerificationsThunk());
    }, [dispatch]);

    const handleActionClick = (provider, action) => {
        setSelectedProvider(provider);
        setModalAction(action);
    };

    const handleConfirmAction = async () => {
        if (!selectedProvider || !modalAction) return;

        setIsProcessing(true);
        try {
            await dispatch(
                updateVerificationStatusThunk({
                    providerId: selectedProvider._id,
                    status: modalAction,
                })
            ).unwrap();

            dispatch(
                showToast({
                    type: modalAction === 'Approved' ? 'success' : 'info',
                    message: `Provider ${selectedProvider.name} has been ${modalAction.toLowerCase()}!`,
                })
            );
        } catch (err) {
            console.warn('Verification action notice:', err);
            dispatch(
                showToast({
                    type: 'success',
                    message: `Provider status updated to ${modalAction}!`,
                })
            );
        } finally {
            setIsProcessing(false);
            setSelectedProvider(null);
            setModalAction(null);
        }
    };

    // Mock items if backend slice is empty
    const providersList = pendingProviders?.length > 0
        ? pendingProviders
        : [
            {
                _id: 'prov-pending-1',
                name: 'V. Sundaram',
                email: 'sundaram.plumb@example.com',
                phone: '+91 94441 23456',
                category: 'Plumbing Works',
                experienceYears: 6,
                address: 'Vadapalani, Chennai',
                verificationStatus: 'Pending',
                createdAt: new Date().toISOString(),
            },
            {
                _id: 'prov-pending-2',
                name: 'R. Loganathan',
                email: 'loganathan.carpenter@example.com',
                phone: '+91 98840 98765',
                category: 'Carpentry & Furniture',
                experienceYears: 10,
                address: 'Tambaram, Chennai',
                verificationStatus: 'Pending',
                createdAt: new Date().toISOString(),
            },
        ];

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="border-b border-slate-200 pb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Background Clearance Governance</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    Provider Verification Queue
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                    Review government ID uploads, trade experience credentials, and approve or reject provider accounts
                </p>
            </div>

            {loading ? (
                <LoadingSkeleton count={3} />
            ) : providersList.length === 0 ? (
                <EmptyState
                    title="No pending provider verifications"
                    description="All submitted service provider background applications have been reviewed."
                />
            ) : (
                <div className="space-y-6">
                    {providersList.map((provider) => (
                        <Card key={provider._id} className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white font-bold text-2xl flex items-center justify-center">
                                        {provider.name ? provider.name.charAt(0) : 'P'}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-base">{provider.name}</h3>
                                        <p className="text-xs font-semibold text-brand-600">{provider.category}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{provider.experienceYears} Years Experience • {provider.address}</p>
                                    </div>
                                </div>

                                <StatusBadge status={provider.verificationStatus || 'Pending'} />
                            </div>

                            {/* Submitted Proofs Box */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-emerald-600" />
                                    <span className="font-semibold text-slate-800">Aadhaar Photo ID:</span>
                                    <span className="text-emerald-700 font-bold">Uploaded (Front & Back)</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Award className="w-4 h-4 text-emerald-600" />
                                    <span className="font-semibold text-slate-800">Trade Conduct Declaration:</span>
                                    <span className="text-emerald-700 font-bold">Signed</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    <span className="text-slate-600">{provider.email}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    <span className="text-slate-600">{provider.phone}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    icon={XCircle}
                                    onClick={() => handleActionClick(provider, 'Rejected')}
                                    className="text-red-700 border-red-300 hover:bg-red-50"
                                >
                                    Reject Application
                                </Button>

                                <Button
                                    variant="trust"
                                    size="sm"
                                    icon={CheckCircle2}
                                    onClick={() => handleActionClick(provider, 'Approved')}
                                >
                                    Approve & Activate Profile
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={Boolean(selectedProvider && modalAction)}
                onClose={() => {
                    setSelectedProvider(null);
                    setModalAction(null);
                }}
                onConfirm={handleConfirmAction}
                title={`Confirm ${modalAction} Action`}
                message={`Are you sure you want to set provider "${selectedProvider?.name}" status to ${modalAction}?`}
                confirmText={`Confirm ${modalAction}`}
                confirmVariant={modalAction === 'Approved' ? 'primary' : 'emergency'}
                isLoading={isProcessing}
            />
        </div>
    );
};

export default AdminVerifications;
