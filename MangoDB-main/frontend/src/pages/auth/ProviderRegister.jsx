import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { getCategories } from '../../api/endpoints';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import Checkbox from '../../components/common/Checkbox';
import Button from '../../components/common/Button';
import LocationButton from '../../components/common/LocationButton';
import {
    validateEmail,
    validatePhone,
    validatePassword,
    validateRequired,
} from '../../utils/validators';
import { ShieldCheck, User, Mail, Phone, Lock, Eye, EyeOff, Wrench, Award, DollarSign, Globe, AlertCircle } from 'lucide-react';

export const ProviderRegister = () => {
    const navigate = useNavigate();
    const { register, loading, error, clearError } = useAuth();

    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        category: '',
        servicesText: '', // comma separated services
        experienceYears: 3,
        priceFrom: 350,
        languages: ['Tamil', 'English'],
        address: '',
        location: null,
        terms: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchCats = async () => {
            setCategoriesLoading(true);
            try {
                const data = await getCategories();
                const cats = Array.isArray(data) ? data : (data.categories || data.data || []);
                setCategories(cats);
                if (cats.length > 0) {
                    setFormData((prev) => ({ ...prev, category: cats[0]._id || cats[0].name }));
                }
            } catch (err) {
                console.warn('Could not load categories for provider registration', err);
            } finally {
                setCategoriesLoading(false);
            }
        };
        fetchCats();
    }, []);

    const languageList = ['Tamil', 'English', 'Telugu', 'Hindi', 'Kannada', 'Malayalam'];

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const handleLanguageToggle = (lang) => {
        const current = formData.languages;
        const updated = current.includes(lang)
            ? current.filter((l) => l !== lang)
            : [...current, lang];
        setFormData((prev) => ({ ...prev, languages: updated }));
    };

    const handleLocationFound = (coords) => {
        setFormData((prev) => ({
            ...prev,
            location: {
                type: 'Point',
                coordinates: [coords.longitude, coords.latitude],
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();

        const nameErr = validateRequired(formData.name, 'Full Name');
        const emailErr = validateEmail(formData.email);
        const phoneErr = validatePhone(formData.phone);
        const passErr = validatePassword(formData.password);
        const catErr = validateRequired(formData.category, 'Primary Category');
        const servicesErr = validateRequired(formData.servicesText, 'Services Offered');
        const termsErr = !formData.terms ? 'You must accept the terms to proceed.' : '';

        if (nameErr || emailErr || phoneErr || passErr || catErr || servicesErr || termsErr) {
            setErrors({
                name: nameErr,
                email: emailErr,
                phone: phoneErr,
                password: passErr,
                category: catErr,
                servicesText: servicesErr,
                terms: termsErr,
            });
            return;
        }

        const servicesArray = formData.servicesText
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);

        setErrors({});
        const payload = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            password: formData.password,
            role: 'provider',
            category: formData.category,
            services: servicesArray,
            experienceYears: Number(formData.experienceYears) || 0,
            priceFrom: Number(formData.priceFrom) || 0,
            languages: formData.languages,
            address: formData.address.trim(),
            location: formData.location,
        };

        const result = await register(payload);

        if (register.fulfilled.match(result)) {
            navigate('/provider/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
            <div className="w-full max-w-2xl space-y-6 my-8">
                {/* Brand Header */}
                <div className="text-center space-y-2">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-2xl shadow-lg">
                            V
                        </div>
                        <span className="font-extrabold text-2xl text-white tracking-tight">VinaiThunai</span>
                    </Link>
                    <h2 className="text-2xl font-extrabold text-white pt-2">Service Professional Registration</h2>
                    <p className="text-xs text-slate-300">
                        Join Tamil Nadu’s trusted network of verified home service specialists
                    </p>
                </div>

                {/* Notice Banner */}
                <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-emerald-200 text-xs flex items-start gap-3 shadow-lg">
                    <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-white text-sm">Admin Verification Process</h4>
                        <p className="mt-0.5 text-emerald-300/90 leading-relaxed">
                            Your profile will be reviewed by our administrator before receiving customer requests. Ensure accurate phone number and experience details.
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 space-y-6">
                    {error && (
                        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl flex items-center gap-2">
                            <span>⚠️</span>
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Full Name"
                                placeholder="e.g. K. Murugan"
                                icon={User}
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                error={errors.name}
                                required
                            />

                            <Input
                                label="Phone Number"
                                placeholder="e.g. 9876543210"
                                icon={Phone}
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                error={errors.phone}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="you@example.com"
                                icon={Mail}
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                error={errors.email}
                                required
                            />

                            <Input
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="At least 6 characters"
                                icon={Lock}
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                error={errors.password}
                                required
                                rightElement={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-slate-400 hover:text-slate-600 focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                }
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Select
                                label="Primary Category"
                                icon={Wrench}
                                options={categories.map((c) => ({
                                    value: c._id || c.name,
                                    label: c.name,
                                }))}
                                value={formData.category}
                                onChange={(e) => handleChange('category', e.target.value)}
                                error={errors.category}
                                required
                            />

                            <Input
                                label="Specific Services (comma separated)"
                                placeholder="e.g. Pipe leak, Tap replacement, Tank cleaning"
                                icon={Wrench}
                                value={formData.servicesText}
                                onChange={(e) => handleChange('servicesText', e.target.value)}
                                error={errors.servicesText}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Experience (Years)"
                                type="number"
                                min="0"
                                max="50"
                                icon={Award}
                                value={formData.experienceYears}
                                onChange={(e) => handleChange('experienceYears', e.target.value)}
                                required
                            />

                            <Input
                                label="Starting Price (₹ INR)"
                                type="number"
                                min="0"
                                icon={DollarSign}
                                value={formData.priceFrom}
                                onChange={(e) => handleChange('priceFrom', e.target.value)}
                                required
                            />
                        </div>

                        {/* Languages Multi Check */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                                Languages You Speak with Customers
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {languageList.map((lang) => {
                                    const isChecked = formData.languages.includes(lang);
                                    return (
                                        <button
                                            key={lang}
                                            type="button"
                                            onClick={() => handleLanguageToggle(lang)}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${isChecked
                                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                                                }`}
                                        >
                                            {lang} {isChecked && '✓'}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <Textarea
                            label="Service Address / Operating City"
                            placeholder="Full shop or home address"
                            rows={2}
                            value={formData.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                        />

                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                                GPS Location Coordinates (Optional)
                            </span>
                            <LocationButton onLocationFound={handleLocationFound} />
                        </div>

                        <Checkbox
                            label="I certify all details are true and agree to VinaiThunai Professional Code of Conduct"
                            checked={formData.terms}
                            onChange={(e) => handleChange('terms', e.target.checked)}
                            error={errors.terms}
                            required
                        />

                        <Button
                            type="submit"
                            variant="trust"
                            fullWidth
                            isLoading={loading}
                            loadingText="Submitting Registration…"
                            className="mt-2 py-3"
                        >
                            Submit Professional Registration
                        </Button>
                    </form>

                    <div className="pt-4 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-500">
                            Already registered?{' '}
                            <Link to="/login" className="font-bold text-brand-600 hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderRegister;
