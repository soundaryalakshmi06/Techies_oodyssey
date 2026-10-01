import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Globe, Phone, Mail, Heart } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 pt-10 pb-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="space-y-3 md:col-span-1">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white font-bold text-base flex items-center justify-center">
                                V
                            </div>
                            <span className="font-extrabold text-lg text-white tracking-tight">VinaiThunai</span>
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            Your Home. Your Language. Your Trusted Professional. Connecting Tamil Nadu homes with verified local specialists.
                        </p>
                        <div className="flex items-center gap-2 text-emerald-400 font-medium pt-1">
                            <ShieldCheck className="w-4 h-4" /> 100% Background Verified Pros
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-2">
                        <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Services</h4>
                        <ul className="space-y-1.5">
                            <li><Link to="/customer/services" className="hover:text-white transition-colors">Plumbing Repair</Link></li>
                            <li><Link to="/customer/services" className="hover:text-white transition-colors">Electrical Works</Link></li>
                            <li><Link to="/customer/services" className="hover:text-white transition-colors">Carpentry & Furniture</Link></li>
                            <li><Link to="/customer/services" className="hover:text-white transition-colors">AC & Appliance Service</Link></li>
                            <li><Link to="/customer/emergency" className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1">🚨 Emergency Assistance</Link></li>
                        </ul>
                    </div>

                    {/* Trust & Language */}
                    <div className="space-y-2">
                        <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Trust & Safety</h4>
                        <ul className="space-y-1.5">
                            <li className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-brand-400" /> Language-First Service</li>
                            <li>Fixed Transparent Pricing</li>
                            <li>Audio Problem Description</li>
                            <li>Before & After Evidence</li>
                            <li>Explicit Customer Consent</li>
                        </ul>
                    </div>

                    {/* Contact & Support */}
                    <div className="space-y-2">
                        <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Support & Contact</h4>
                        <div className="space-y-1.5">
                            <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-brand-400" /> 1800-425-VT-CARE</p>
                            <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-brand-400" /> support@vinaithunai.com</p>
                            <p className="text-[11px] text-slate-500 pt-1">Available in English & Tamil (தமிழ்)</p>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
                    <p>© {new Date().getFullYear()} VinaiThunai Home Services. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Trust & Transparency
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
