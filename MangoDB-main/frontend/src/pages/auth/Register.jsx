import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
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
import { User, Mail, Phone, Lock, Eye, EyeOff, MapPin, Globe, ShieldCheck } from 'lucide-react';

export const Register = () => {
    const navigate = useNavigate();
    const { register, loading, error, clearError } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        preferredLanguage: 'Tamil',
        address: '',
        location: null, // { type: 'Point', coordinates: [lng, lat] }
        terms: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const languageOptions = [
        { value: 'Tamil', label: 'Tamil (தமிழ்)' },
        { value: 'English', label: 'English' },
        { value: 'Telugu', label: 'Telugu (తెలుగు)' },
        { value: 'Hindi', label: 'Hindi (हिंदी)' },
        { value: 'Kannada', label: 'Kannada (ಕನ್ನಡ)' },
        { value: 'Malayalam', label: 'Malayalam (മലയാളം)' },
    ];

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
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
        const confirmErr =
            formData.password !== formData.confirmPassword
                ? 'Passwords do not match.'
                : '';
        const termsErr = !formData.terms ? 'You must accept the terms to proceed.' : '';

        if (nameErr || emailErr || phoneErr || passErr || confirmErr || termsErr) {
            setErrors({
                name: nameErr,
                email: emailErr,
                phone: phoneErr,
                password: passErr,
                confirmPassword: confirmErr,
                terms: termsErr,
            });
            return;
        }

        setErrors({});
        const payload = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            password: formData.password,
            role: 'customer',
            preferredLanguage: formData.preferredLanguage,
            address: formData.address.trim(),
            location: formData.location,
        };

        const result = await register(payload);

        if (register.fulfilled.match(result)) {
            navigate('/customer/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 sm:p-6 font-sans relative">
            <div className="w-full max-w-xl space-y-6 my-8">
                {/* Brand Header */}
                <div className="text-center space-y-2">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white font-extrabold flex items-center justify-center text-2xl shadow-lg">
                            V
                        </div>
                        <span className="font-extrabold text-2xl text-white tracking-tight">VinaiThunai</span>
                    </Link>
                    <h2 className="text-xl font-bold text-slate-100 pt-2">Create Customer Account</h2>
                    <p className="text-xs text-slate-400">
                        Book background-verified home service professionals in Tamil Nadu
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 space-y-6">
                    {error && (
                        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl flex items-center gap-2">
                            <span>⚠️</span>
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Full Name"
                                placeholder="e.g. Anbu Selvan"
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

                            <Select
                                label="Preferred Language"
                                icon={Globe}
                                options={languageOptions}
                                value={formData.preferredLanguage}
                                onChange={(e) => handleChange('preferredLanguage', e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                            <Input
                                label="Confirm Password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Re-enter password"
                                icon={Lock}
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                error={errors.confirmPassword}
                                required
                            />
                        </div>

                        <Textarea
                            label="Home Address / Locality"
                            placeholder="Door No, Street Name, Area, City, Pincode"
                            rows={2}
                            value={formData.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                        />

                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                                GPS Location (Optional)
                            </span>
                            <LocationButton onLocationFound={handleLocationFound} />
                        </div>

                        <Checkbox
                            label="I agree to VinaiThunai Terms of Service and Privacy Policy"
                            description="We respect your privacy and never share your data."
                            checked={formData.terms}
                            onChange={(e) => handleChange('terms', e.target.checked)}
                            error={errors.terms}
                            required
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            isLoading={loading}
                            loadingText="Creating Account…"
                            className="mt-2 py-3"
                        >
                            Register Account
                        </Button>
                    </form>

                    <div className="pt-4 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-500">
                            Already have an account?{' '}
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

export default Register;
