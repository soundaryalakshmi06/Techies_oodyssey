import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { ArrowLeft, Printer, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const InvoiceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const invoice = {
        invoiceId: id ? `INV-${id}` : 'INV-b-202',
        bookingId: id || 'b-202',
        date: new Date().toISOString(),
        customerName: user?.name || 'Customer',
        customerAddress: user?.address || '14, Gandhi Road, T. Nagar, Chennai',
        providerName: 'S. Ramanathan',
        providerCategory: 'Plumbing Repair',
        serviceName: 'Emergency Tap Burst & Main Valve Replacement',
        serviceCharge: 450,
        partsCost: 1000,
        totalAmount: 1450,
        paymentStatus: 'Paid via Digital Verification',
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto font-sans">
            <div className="flex items-center justify-between no-print">
                <Button
                    variant="ghost"
                    size="sm"
                    icon={ArrowLeft}
                    onClick={() => navigate('/customer/bookings')}
                >
                    Back to Bookings
                </Button>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" icon={Printer} onClick={handlePrint}>
                        Print / Save PDF
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        icon={Star}
                        onClick={() => navigate('/customer/reviews')}
                    >
                        Rate Professional
                    </Button>
                </div>
            </div>

            {/* Official Printable Invoice Card */}
            <Card className="bg-white p-8 sm:p-10 space-y-8 border border-slate-200 shadow-xl rounded-3xl print:border-none print:shadow-none">
                {/* Brand Header */}
                <div className="flex items-start justify-between border-b border-slate-200 pb-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl bg-brand-600 text-white font-extrabold flex items-center justify-center text-lg">
                                V
                            </div>
                            <span className="font-extrabold text-xl text-slate-900 tracking-tight">VinaiThunai</span>
                        </div>
                        <p className="text-xs text-slate-500">Your Home. Your Language. Your Trusted Professional.</p>
                        <p className="text-[11px] text-slate-400">Tamil Nadu Home Services Platform</p>
                    </div>

                    <div className="text-right space-y-1">
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                            OFFICIAL INVOICE
                        </span>
                        <p className="text-xs font-extrabold text-slate-800 pt-1">{invoice.invoiceId}</p>
                        <p className="text-[11px] text-slate-400">Date: {formatDate(invoice.date)}</p>
                    </div>
                </div>

                {/* Customer & Provider Meta */}
                <div className="grid grid-cols-2 gap-6 text-xs border-b border-slate-200 pb-6">
                    <div className="space-y-1">
                        <span className="font-bold text-slate-400 uppercase tracking-wider block">Billed To (Customer):</span>
                        <p className="font-bold text-slate-900 text-sm">{invoice.customerName}</p>
                        <p className="text-slate-600">{invoice.customerAddress}</p>
                    </div>

                    <div className="space-y-1 text-right">
                        <span className="font-bold text-slate-400 uppercase tracking-wider block">Service Provider:</span>
                        <p className="font-bold text-slate-900 text-sm flex items-center justify-end gap-1">
                            {invoice.providerName} <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        </p>
                        <p className="text-slate-600">{invoice.providerCategory}</p>
                    </div>
                </div>

                {/* Itemized Table */}
                <div className="space-y-3">
                    <span className="font-bold text-slate-900 text-sm block">Service Line Items</span>
                    <table className="w-full text-xs text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                                <th className="py-2.5 px-3 font-bold">Description</th>
                                <th className="py-2.5 px-3 font-bold text-right">Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-800">
                            <tr>
                                <td className="py-3 px-3">
                                    <span className="font-semibold block">{invoice.serviceName}</span>
                                    <span className="text-slate-500 text-[11px]">Standard inspection & labor charges</span>
                                </td>
                                <td className="py-3 px-3 text-right font-semibold">{formatCurrency(invoice.serviceCharge)}</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-3">
                                    <span className="font-semibold block">Replacement Parts & Materials</span>
                                    <span className="text-slate-500 text-[11px]">Approved heavy-duty brass valve fitting</span>
                                </td>
                                <td className="py-3 px-3 text-right font-semibold">{formatCurrency(invoice.partsCost)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Total calculation */}
                <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-base font-extrabold text-slate-900 pt-2 border-t border-slate-800">
                        <span>Final Paid Total</span>
                        <span className="text-emerald-700 text-xl">{formatCurrency(invoice.totalAmount)}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 pt-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Status: {invoice.paymentStatus}</span>
                    </div>
                </div>

                {/* Footer Guarantee Notice */}
                <div className="pt-6 border-t border-slate-100 text-[11px] text-slate-400 text-center space-y-1">
                    <p>Thank you for choosing VinaiThunai Home Care Services.</p>
                    <p>For support inquiries, contact helpline 1800-425-VT-CARE or email support@vinaithunai.com</p>
                </div>
            </Card>
        </div>
    );
};

export default InvoiceDetail;
