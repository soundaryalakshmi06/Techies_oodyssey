import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { validateEmail, validatePassword } from '../../utils/validators';
import { forgotPassword } from '../../api/endpoints';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';

export const Login = () => {
    const navigate = useNavigate();
    const { login, loading, error, clearError } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    // Forgot Password modal state
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotMsg, setForgotMsg] = useState(null);
    const [forgotLoading, setForgotLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();

        const emailErr = validateEmail(email);
        const passErr = validatePassword(password);

        if (emailErr || passErr) {
            setErrors({ email: emailErr, password: passErr });
            return;
        }

        setErrors({});
        const result = await login({ email, password });

        if (login.fulfilled.match(result)) {
            const userRole = result.payload.user?.role || 'customer';
            if (userRole === 'admin') navigate('/admin/dashboard');
            else if (userRole === 'provider') navigate('/provider/dashboard');
            else navigate('/customer/dashboard');
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const err = validateEmail(forgotEmail);
        if (err) {
            setForgotMsg({ type: 'error', text: err });
            return;
        }

        setForgotLoading(true);
        try {
            await forgotPassword(forgotEmail);
        } catch (err) {
            // EndpointNotConnectedError handled cleanly
            setForgotMsg({
                type: 'info',
                text: 'Password reset service is not connected to the backend server yet. Please contact administrator support.',
            });
        } finally {
            setForgotLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 sm:p-6 font-sans relative overflow-hidden">
            {/* Subtle Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#1E40AF_0,transparent_60%)] opacity-20 pointer-events-none" />

            <div className="w-full max-w-md space-y-6 relative z-10">
                {/* Brand Header */}
                <div className="text-center space-y-2">
                    <Link to="/" className="inline-flex items-center gap-2 group">
                        <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white font-extrabold flex items-center justify-center text-2xl shadow-lg shadow-brand-600/30 group-hover:scale-105 transition-transform">
                            V
                        </div>
                        <span className="font-extrabold text-2xl text-white tracking-tight">VinaiThunai</span>
                    </Link>
                    <h2 className="text-xl font-bold text-slate-100 pt-2">Welcome Back</h2>
                    <p className="text-xs text-slate-400">
                        Sign in to access your bookings, quotes, and home services
                    </p>
                </div>

                {/* Card Form */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 space-y-6">
                    {error && (
                        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl flex items-center gap-2">
                            <span>⚠️</span>
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="you@example.com"
                            icon={Mail}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={errors.email}
                            required
                        />

                        <Input
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            icon={Lock}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errors.password}
                            required
                            rightElement={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            }
                        />

                        <div className="flex items-center justify-end text-xs">
                            <button
                                type="button"
                                onClick={() => setShowForgotModal(true)}
                                className="font-semibold text-brand-600 hover:text-brand-700 hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            isLoading={loading}
                            loadingText="Signing in…"
                            className="mt-2 py-3"
                        >
                            Sign In to Account
                        </Button>
                    </form>

                    {/* Create Account Options */}
                    <div className="pt-4 border-t border-slate-100 text-center space-y-3">
                        <p className="text-xs text-slate-500">
                            Don’t have an account yet?{' '}
                            <Link to="/register" className="font-bold text-brand-600 hover:underline">
                                Create Customer Account
                            </Link>
                        </p>

                        <div className="pt-2">
                            <Link
                                to="/provider/register"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-200 transition-colors"
                            >
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                <span>Register as a Service Professional</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="text-[11px] text-slate-500 text-center">
                    VinaiThunai • Verified Local Professionals • Tamil & English
                </p>
            </div>

            {/* Forgot Password Modal */}
            <Modal
                isOpen={showForgotModal}
                onClose={() => {
                    setShowForgotModal(false);
                    setForgotMsg(null);
                }}
                title="Reset Password"
                subtitle="Enter your email address to receive password reset instructions"
                maxWidth="max-w-md"
            >
                <form onSubmit={handleForgotPassword} className="space-y-4">
                    {forgotMsg && (
                        <div
                            className={`p-3 text-xs rounded-xl border ${forgotMsg.type === 'error'
                                    ? 'bg-red-50 border-red-200 text-red-700'
                                    : 'bg-brand-50 border-brand-200 text-brand-900'
                                }`}
                        >
                            {forgotMsg.text}
                        </div>
                    )}

                    <Input
                        label="Account Email"
                        type="email"
                        placeholder="you@example.com"
                        icon={Mail}
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                    />

                    <div className="flex justify-end gap-3 pt-2">
                        <Button variant="outline" onClick={() => setShowForgotModal(false)}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary" isLoading={forgotLoading}>
                            Send Reset Request
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Login;
