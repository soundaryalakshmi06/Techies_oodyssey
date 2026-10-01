import React from 'react';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { DollarSign, TrendingUp, CalendarCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ProviderEarnings = () => {
    const earningsData = {
        totalEarnings: 3900,
        completedJobsCount: 3,
        pendingPayout: 1000,
        history: [
            {
                id: 'p-1',
                bookingId: 'b-202',
                serviceName: 'Emergency Tap Burst Repair',
                customerName: 'K. Senthil',
                amount: 1450,
                date: new Date(Date.now() - 86400000 * 2).toISOString(),
                status: 'Settled',
            },
            {
                id: 'p-2',
                bookingId: 'b-200',
                serviceName: 'Ceiling Fan Wiring',
                customerName: 'M. Revathi',
                amount: 1450,
                date: new Date(Date.now() - 86400000 * 5).toISOString(),
                status: 'Settled',
            },
            {
                id: 'p-3',
                bookingId: 'b-201',
                serviceName: 'Main Switchboard Repair',
                customerName: 'Anbu Selvan',
                amount: 1000,
                date: new Date().toISOString(),
                status: 'Pending Verification',
            },
        ],
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="border-b border-slate-200 pb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Direct Bank Settlement Engine</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-emerald-600" /> Earnings & Payout History
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                    Track completed job revenue, settled payouts, and direct customer transactions
                </p>
            </div>

            {/* Summary Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="space-y-1 bg-gradient-to-br from-emerald-900 to-slate-900 text-white border-none shadow-lg">
                    <span className="text-xs text-emerald-300 font-semibold block">Total Revenue Earned</span>
                    <p className="text-3xl font-extrabold text-white">{formatCurrency(earningsData.totalEarnings)}</p>
                    <span className="text-[11px] text-emerald-400 font-medium">100% Upfront Transparent Quotes</span>
                </Card>

                <Card className="space-y-1">
                    <span className="text-xs text-slate-500 font-semibold block">Completed Paid Jobs</span>
                    <p className="text-3xl font-extrabold text-slate-900">{earningsData.completedJobsCount}</p>
                    <span className="text-[11px] text-brand-600 font-medium">Verified Customer Audit</span>
                </Card>

                <Card className="space-y-1">
                    <span className="text-xs text-slate-500 font-semibold block">Pending Payout Batch</span>
                    <p className="text-3xl font-extrabold text-emerald-700">{formatCurrency(earningsData.pendingPayout)}</p>
                    <span className="text-[11px] text-slate-400 font-medium">Auto-settling today</span>
                </Card>
            </div>

            {/* Payout History Table */}
            <Card className="space-y-4">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
                    Completed Job Transactions
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                                <th className="py-3 px-3 font-bold">Booking ID</th>
                                <th className="py-3 px-3 font-bold">Service & Customer</th>
                                <th className="py-3 px-3 font-bold">Date</th>
                                <th className="py-3 px-3 font-bold text-right">Amount</th>
                                <th className="py-3 px-3 font-bold text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-800">
                            {earningsData.history.map((row) => (
                                <tr key={row.id}>
                                    <td className="py-3.5 px-3 font-bold text-slate-900">{row.bookingId}</td>
                                    <td className="py-3.5 px-3">
                                        <span className="font-semibold block text-slate-900">{row.serviceName}</span>
                                        <span className="text-slate-500 text-[11px]">Customer: {row.customerName}</span>
                                    </td>
                                    <td className="py-3.5 px-3 text-slate-500">{formatDate(row.date)}</td>
                                    <td className="py-3.5 px-3 text-right font-extrabold text-emerald-700">
                                        {formatCurrency(row.amount)}
                                    </td>
                                    <td className="py-3.5 px-3 text-right">
                                        <StatusBadge status={row.status === 'Settled' ? 'Completed' : 'Pending'} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ProviderEarnings;
