import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesThunk } from '../../store/slices/categorySlice';
import ServiceCard from '../../components/common/ServiceCard';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import { Search, ShieldAlert, Sparkles } from 'lucide-react';

export const Services = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector((state) => state.categories);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchCategoriesThunk());
    }, [dispatch]);

    const filteredCategories = (categories || []).filter(
        (cat) =>
            cat.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                        <span>Tamil Nadu Service Categories</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Find a Service Category
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Choose a service to find background-verified local specialists
                    </p>
                </div>

                <Button
                    variant="emergency"
                    icon={ShieldAlert}
                    onClick={() => navigate('/customer/emergency')}
                >
                    24/7 Emergency Service
                </Button>
            </div>

            {/* Search Input */}
            <div className="max-w-md">
                <Input
                    placeholder="Search categories (plumbing, electrical, AC...)"
                    icon={Search}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Categories Grid */}
            {loading ? (
                <LoadingSkeleton type="card" count={6} />
            ) : error ? (
                <ErrorState
                    title="Could not load categories"
                    message={error}
                    onRetry={() => dispatch(fetchCategoriesThunk())}
                />
            ) : filteredCategories.length === 0 ? (
                <EmptyState
                    title="No categories found"
                    description={`No service category matched "${searchTerm}". Try clearing your search.`}
                    actionText="Clear Search"
                    onAction={() => setSearchTerm('')}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCategories.map((cat) => (
                        <ServiceCard
                            key={cat._id}
                            category={cat}
                            onClick={() => navigate(`/customer/providers?category=${encodeURIComponent(cat.name)}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Services;
