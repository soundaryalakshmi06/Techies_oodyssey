import React from 'react';
import useAuth from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import { ShieldCheck, FileCheck, Award, AlertCircle, CheckCircle2 } from 'lucide-react';

export const ProviderVerification = () => {
    const { user } = useAuth();
    const status = user?.verificationStatus || 'Approved';
    const isApproved = status === 'Approved' || status === 'Verified';

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Header */}
            <div className="border-b border-slate-200 pb-6 space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" /> Admin Background Verification
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                    VinaiThunai verifies government identity proof and trade credentials for customer safety
                </p>
            </div>

            {/* Status Hero Card */}
            <Card className="p-8 space-y-4 bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                        Verification Duty Status
                    </span>
                    <StatusBadge status={status} />
                </div>

                <div className="space-y-1">
                    <h2 className="text-2xl font-extrabold text-white">
                        {isApproved ? 'Account Background Approved' : 'Verification In Review'}
                    </h2>
                    <p className="text-xs text-slate-300">
                        {isApproved
                            ? 'Your profile has passed background conduct checks and is active for customer job leads.'
                            : 'Our compliance team is verifying your government ID and trade certification.'}
                    </p>
                </div>
            </Card>

            {/* Submitted Documents Checklist */}
            <Card className="space-y-4">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
                    Submitted Verification Proofs
                </h3>

                <div className="space-y-3">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                            <FileCheck className="w-5 h-5 text-emerald-600" />
                            <div>
                                <span className="font-bold text-slate-900 block">Government Photo ID (Aadhaar / Driving License)</span>
                                <span className="text-slate-500">Uploaded during registration</span>
                            </div>
                        </div>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">✓ Verified</span>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                            <Award className="w-5 h-5 text-emerald-600" />
                            <div>
                                <span className="font-bold text-slate-900 block">Trade Experience & Skill Certificate</span>
                                <span className="text-slate-500">8 Years Active Service Record</span>
                            </div>
                        </div>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">✓ Verified</span>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProviderVerification;
