import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProvidersThunk } from '../../store/slices/providerSlice';
import { fetchCategoriesThunk } from '../../store/slices/categorySlice';
import ProviderCard from '../../components/common/ProviderCard';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import { Search, Filter, RotateCcw, ShieldCheck } from 'lucide-react';

export const Providers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const { providers, loading, error } = useSelector((state) => state.providers);
    const { categories } = useSelector((state) => state.categories);

    // Filter state synchronized with URL params
    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || '',
        language: searchParams.get('language') || '',
        available: searchParams.get('available') || '',
        sort: searchParams.get('sort') || 'rating', // rating | priceLow | priceHigh | experience
    });

    useEffect(() => {
        dispatch(fetchCategoriesThunk());
    }, [dispatch]);

    useEffect(() => {
        // Clean params for dispatch
        const queryParams = {};
        if (filters.search) queryParams.search = filters.search;
        if (filters.category) queryParams.category = filters.category;
        if (filters.language) queryParams.language = filters.language;
        if (filters.available) queryParams.available = filters.available;
        if (filters.sort) queryParams.sort = filters.sort;

        setSearchParams(queryParams);
        dispatch(fetchProvidersThunk(queryParams));
    }, [filters, dispatch, setSearchParams]);

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleClearFilters = () => {
        setFilters({
            search: '',
            category: '',
            language: '',
            available: '',
            sort: 'rating',
        });
    };

    const categoryOptions = [
        { value: '', label: 'All Categories' },
        ...(categories || []).map((c) => ({ value: c.name, label: c.name })),
    ];

    const languageOptions = [
        { value: '', label: 'All Languages' },
        { value: 'Tamil', label: 'Tamil (தமிழ்)' },
        { value: 'English', label: 'English' },
        { value: 'Telugu', label: 'Telugu' },
        { value: 'Hindi', label: 'Hindi' },
        { value: 'Kannada', label: 'Kannada' },
        { value: 'Malayalam', label: 'Malayalam' },
    ];

    const sortOptions = [
        { value: 'rating', label: 'Highest Rated' },
        { value: 'experience', label: 'Most Experienced' },
        { value: 'priceLow', label: 'Price: Low to High' },
        { value: 'priceHigh', label: 'Price: High to Low' },
    ];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>100% Admin Background Verified</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Find Service Professionals
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Browse verified local specialists, check transparent starting prices, and request service
                    </p>
                </div>
            </div>

            {/* Search & Filter Toolbar */}
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    <Filter className="w-4 h-4 text-brand-600" /> Filter & Search Professionals
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    <Input
                        placeholder="Search plumber, electrician..."
                        icon={Search}
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                    />

                    <Select
                        options={categoryOptions}
                        value={filters.category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                    />

                    <Select
                        options={languageOptions}
                        value={filters.language}
                        onChange={(e) => handleFilterChange('language', e.target.value)}
                    />

                    <Select
                        options={[
                            { value: '', label: 'All Status' },
                            { value: 'true', label: 'Available Now' },
                        ]}
                        value={filters.available}
                        onChange={(e) => handleFilterChange('available', e.target.value)}
                    />

                    <Select
                        options={sortOptions}
                        value={filters.sort}
                        onChange={(e) => handleFilterChange('sort', e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-slate-500 font-medium">
                        Showing {providers ? providers.length : 0} verified professionals
                    </span>

                    {(filters.search || filters.category || filters.language || filters.available || filters.sort !== 'rating') && (
                        <Button variant="ghost" size="sm" icon={RotateCcw} onClick={handleClearFilters}>
                            Reset Filters
                        </Button>
                    )}
                </div>
            </div>

            {/* Results Content */}
            {loading ? (
                <LoadingSkeleton type="card" count={6} />
            ) : error ? (
                <ErrorState
                    title="Unable to load professionals"
                    message={error}
                    onRetry={() => dispatch(fetchProvidersThunk(filters))}
                />
            ) : !providers || providers.length === 0 ? (
                <EmptyState
                    title="No verified professionals found"
                    description="We couldn't find any provider matching your filter criteria. Try expanding your search or clearing filters."
                    actionText="Clear All Filters"
                    onAction={handleClearFilters}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {providers.map((provider) => (
                        <ProviderCard key={provider._id} provider={provider} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Providers;
