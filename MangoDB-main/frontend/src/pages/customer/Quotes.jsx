import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import QuoteCard from '../../components/common/QuoteCard';
import EmptyState from '../../components/common/EmptyState';
import { showToast } from '../../store/slices/toastSlice';
import { FileText, ShieldCheck } from 'lucide-react';

export const Quotes = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Active state for customer quotes
    const [quotes, setQuotes] = useState([
        {
            _id: 'q-101',
            providerName: 'K. Murugan (Verified Electrician)',
            providerRating: 4.9,
            serviceName: 'Main Switchboard Wiring & Circuit Replacement',
            probableIssue: 'Burnt out circuit breaker phase terminal due to voltage fluctuation.',
            procedure: 'Replace 32A DP MCB, rewire main distribution box, test load balancing.',
            serviceCharge: 350,
            partsCost: 650,
            expectedDuration: '1.5 Hours',
            notes: 'I can arrive within 30 minutes with original Havells MCB parts.',
            status: 'Pending',
        },
    ]);

    const handleApproveQuote = async (quoteId) => {
        setQuotes((prev) =>
            prev.map((q) => (q._id === quoteId ? { ...q, status: 'Approved' } : q))
        );
        dispatch(
            showToast({
                type: 'success',
                message: 'Quote approved! Booking confirmed with provider.',
            })
        );
        navigate('/customer/bookings');
    };

    const handleRejectQuote = async (quoteId) => {
        setQuotes((prev) =>
            prev.map((q) => (q._id === quoteId ? { ...q, status: 'Rejected' } : q))
        );
        dispatch(
            showToast({
                type: 'info',
                message: 'Quote rejected.',
            })
        );
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="border-b border-slate-200 pb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                    <span>Upfront Fixed Price Guarantee</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Received Price Quotes
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                    Review diagnostic estimates submitted by verified professionals before work begins
                </p>
            </div>

            {/* Quotes List */}
            {quotes.length === 0 ? (
                <EmptyState
                    title="No quotes received yet"
                    description="Providers inspecting your requests will submit upfront cost estimates here."
                    actionText="View Active Requests"
                    onAction={() => navigate('/customer/matches')}
                />
            ) : (
                <div className="space-y-6">
                    {quotes.map((quote) => (
                        <QuoteCard
                            key={quote._id}
                            quote={quote}
                            onApprove={handleApproveQuote}
                            onReject={handleRejectQuote}
                            role="customer"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Quotes;
