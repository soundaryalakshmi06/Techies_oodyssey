import React from 'react';
import Card from '../../components/common/Card';
import { BarChart3, TrendingUp, Globe, ShieldCheck, Zap } from 'lucide-react';

export const AdminAnalytics = () => {
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="border-b border-slate-200 pb-6 space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-brand-600" /> Platform Operational Analytics
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                    Service request distribution, language adoption, and job completion metrics across Tamil Nadu
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="space-y-4">
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
                        <Globe className="w-5 h-5 text-brand-600" /> Customer Language Preference Adoption
                    </h3>
                    <div className="space-y-3 text-xs">
                        <div>
                            <div className="flex justify-between font-bold text-slate-800 mb-1">
                                <span>Tamil (தமிழ்)</span>
                                <span>72%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full bg-brand-600 rounded-full" style={{ width: '72%' }} />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between font-bold text-slate-800 mb-1">
                                <span>English</span>
                                <span>18%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '18%' }} />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between font-bold text-slate-800 mb-1">
                                <span>Telugu / Hindi / Others</span>
                                <span>10%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full bg-purple-500 rounded-full" style={{ width: '10%' }} />
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="space-y-4">
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
                        <Zap className="w-5 h-5 text-emerald-600" /> Service Category Demand
                    </h3>
                    <div className="space-y-3 text-xs">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                            <span className="font-bold text-slate-800">Electrical Repairs & Wiring</span>
                            <span className="font-extrabold text-brand-600">42% of total requests</span>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                            <span className="font-bold text-slate-800">Plumbing & Burst Valve Fix</span>
                            <span className="font-extrabold text-emerald-600">31% of total requests</span>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                            <span className="font-bold text-slate-800">AC & Household Appliance</span>
                            <span className="font-extrabold text-purple-600">27% of total requests</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminAnalytics;
