import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesThunk } from '../store/slices/categorySlice';
import Button from '../components/common/Button';
import ServiceCard from '../components/common/ServiceCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import Footer from '../components/layout/Footer';
import {
    ShieldCheck,
    Zap,
    Wrench,
    Globe,
    Mic,
    Camera,
    CheckCircle2,
    Clock,
    ArrowRight,
    ShieldAlert,
    Sparkles,
    PhoneCall,
    Lock,
} from 'lucide-react';

export const LandingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { categories, loading } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategoriesThunk());
    }, [dispatch]);

    const defaultCategories = [
        { _id: 'cat-1', name: 'Plumbing Repair', description: 'Leaking pipes, tap replacement, drainage clog clearing', slug: 'plumbing' },
        { _id: 'cat-2', name: 'Electrical Works', description: 'Short circuits, wiring, switchboards, fan installation', slug: 'electrical' },
        { _id: 'cat-3', name: 'Carpentry & Furniture', description: 'Door alignment, lock repair, custom furniture work', slug: 'carpentry' },
        { _id: 'cat-4', name: 'AC & Appliance', description: 'AC servicing, gas refill, washing machine & fridge repair', slug: 'appliance' },
        { _id: 'cat-5', name: 'Cleaning & Sanitation', description: 'Deep home cleaning, water tank cleaning, pest control', slug: 'cleaning' },
        { _id: 'cat-6', name: '24/7 Emergency', description: 'Immediate response for burst pipes, power outage, lockouts', slug: 'emergency' },
    ];

    const categoryList = categories && categories.length > 0 ? categories : defaultCategories;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
            {/* Navbar */}
            <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white font-extrabold flex items-center justify-center text-xl shadow-md shadow-brand-600/30">
                            V
                        </div>
                        <div>
                            <span className="font-extrabold text-xl text-slate-900 tracking-tight block leading-none">VinaiThunai</span>
                            <span className="text-[10px] text-slate-500 font-medium tracking-wide">Tamil Nadu Trusted Home Care</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                        <a href="#services" className="hover:text-brand-600 transition-colors">Services</a>
                        <a href="#how-it-works" className="hover:text-brand-600 transition-colors">How It Works</a>
                        <a href="#trust" className="hover:text-brand-600 transition-colors">Trust & Safety</a>
                        <Link to="/customer/emergency" className="text-red-600 font-bold hover:text-red-700 flex items-center gap-1.5">
                            <ShieldAlert className="w-4 h-4 animate-pulse" /> Emergency
                        </Link>
                        <Link to="/provider/register" className="text-emerald-700 hover:text-emerald-800 font-bold">
                            For Professionals
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
                            Log In
                        </Button>
                        <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
                            Get Started
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-brand-900 via-brand-950 to-slate-950 text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1E40AF_0,transparent_50%)] opacity-30" />
                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/80 border border-brand-500/30 text-brand-200 text-xs font-semibold backdrop-blur-sm">
                            <Globe className="w-4 h-4 text-brand-400" />
                            <span>Your Home. Your Language. Your Trusted Professional.</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                            Verified Home Experts <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-200 to-emerald-400">
                                Speaking Your Language
                            </span>
                        </h1>

                        <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                            VinaiThunai connects you with background-verified plumbers, electricians, and technicians in Tamil Nadu. Explain issues in your native language via voice recording or photos. Transparent pricing guaranteed.
                        </p>

                        <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <Button
                                variant="primary"
                                size="lg"
                                icon={Wrench}
                                onClick={() => navigate('/customer/services')}
                                className="shadow-xl shadow-brand-600/30 text-base"
                            >
                                Find a Service Professional
                            </Button>

                            <Button
                                variant="emergency"
                                size="lg"
                                icon={ShieldAlert}
                                onClick={() => navigate('/customer/emergency')}
                                className="text-base"
                            >
                                24/7 Emergency Assistance
                            </Button>
                        </div>

                        <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-center lg:text-left text-xs text-slate-400">
                            <div>
                                <p className="font-extrabold text-white text-xl">100%</p>
                                <p className="mt-0.5">Verified Pros</p>
                            </div>
                            <div>
                                <p className="font-extrabold text-emerald-400 text-xl">Upfront</p>
                                <p className="mt-0.5">Fixed Estimates</p>
                            </div>
                            <div>
                                <p className="font-extrabold text-brand-300 text-xl">Native</p>
                                <p className="mt-0.5">Tamil & English Support</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image Card */}
                    <div className="lg:col-span-5 relative">
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl space-y-4 text-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white font-bold text-xl flex items-center justify-center shadow-lg">
                                    ✓
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white">Trust & Quality Guaranteed</h3>
                                    <p className="text-xs text-slate-300">No surprise bills • Explicit customer consent</p>
                                </div>
                            </div>

                            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700/60 space-y-3 text-xs">
                                <div className="flex items-center justify-between text-slate-300">
                                    <span className="flex items-center gap-1.5"><Mic className="w-4 h-4 text-brand-400" /> Voice Description</span>
                                    <span className="text-emerald-400 font-semibold">Native Language</span>
                                </div>
                                <div className="flex items-center justify-between text-slate-300">
                                    <span className="flex items-center gap-1.5"><Camera className="w-4 h-4 text-brand-400" /> Before/After Evidence</span>
                                    <span className="text-emerald-400 font-semibold">Digital Proof</span>
                                </div>
                                <div className="flex items-center justify-between text-slate-300">
                                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Admin Verified ID</span>
                                    <span className="text-emerald-400 font-semibold">Government Verified</span>
                                </div>
                            </div>

                            <Button variant="trust" fullWidth onClick={() => navigate('/register')}>
                                Book Service Now
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid Section */}
            <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                    <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
                        Services Available
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        Popular Home Service Categories
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Browse top rated, verified professionals available in your city right now.
                    </p>
                </div>

                {loading ? (
                    <LoadingSkeleton type="card" count={6} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryList.map((cat) => (
                            <ServiceCard
                                key={cat._id}
                                category={cat}
                                onClick={() => navigate(`/customer/services?category=${encodeURIComponent(cat.name)}`)}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center space-y-3 max-w-2xl mx-auto">
                        <span className="text-xs font-bold text-brand-400 uppercase tracking-widest bg-brand-950 px-3 py-1 rounded-full border border-brand-800">
                            Simple 3-Step Process
                        </span>
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            How VinaiThunai Works
                        </h2>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Designed for ease of access, language comfort, and complete transparency.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-slate-800/60 p-8 rounded-3xl border border-slate-700/60 space-y-4 relative">
                            <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg">
                                1
                            </div>
                            <h3 className="font-bold text-xl text-white">Describe in Your Language</h3>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Select your service, capture photos, and record a voice description in Tamil or English. No typing required.
                            </p>
                        </div>

                        <div className="bg-slate-800/60 p-8 rounded-3xl border border-slate-700/60 space-y-4 relative">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg">
                                2
                            </div>
                            <h3 className="font-bold text-xl text-white">Get Fixed Cost Estimate</h3>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Your verified professional inspects and sends a itemized quote (service charge + parts). Approve before work starts.
                            </p>
                        </div>

                        <div className="bg-slate-800/60 p-8 rounded-3xl border border-slate-700/60 space-y-4 relative">
                            <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white font-extrabold text-xl flex items-center justify-center shadow-lg">
                                3
                            </div>
                            <h3 className="font-bold text-xl text-white">Track, Verify & Pay</h3>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Track pro arrival in real-time, view before/after photo evidence, get an official digital invoice, and leave a review.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust & Safety Highlight */}
            <section id="trust" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
                <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white space-y-6 shadow-2xl relative overflow-hidden">
                    <div className="max-w-2xl space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold border border-emerald-500/30">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Admin Verification Standard
                        </div>
                        <h2 className="text-3xl font-extrabold">Safety, Verification & Consent First</h2>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            Every professional on VinaiThunai undergoes identity verification, background check, and skill evaluation before being approved by our admin team. No provider can self-approve.
                        </p>

                        <div className="pt-2 flex flex-wrap gap-4 text-xs">
                            <span className="flex items-center gap-1.5 font-bold text-emerald-300">
                                ✓ Government ID Verified
                            </span>
                            <span className="flex items-center gap-1.5 font-bold text-emerald-300">
                                ✓ No Hidden Costs
                            </span>
                            <span className="flex items-center gap-1.5 font-bold text-emerald-300">
                                ✓ Customer Approval Required for Extra Work
                            </span>
                        </div>

                        <div className="pt-4">
                            <Button variant="trust" icon={ShieldCheck} onClick={() => navigate('/register')}>
                                Book a Verified Professional
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
