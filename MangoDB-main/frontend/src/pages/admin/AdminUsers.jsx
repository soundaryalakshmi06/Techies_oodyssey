import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminUsersThunk } from '../../store/slices/adminSlice';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Tabs from '../../components/common/Tabs';
import StatusBadge from '../../components/common/StatusBadge';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import { formatDate } from '../../utils/formatters';
import { Users, Search, ShieldCheck, Filter } from 'lucide-react';

export const AdminUsers = () => {
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.admin);

    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        dispatch(fetchAdminUsersThunk());
    }, [dispatch]);

    const allUsersList = users?.length > 0
        ? users
        : [
            {
                _id: 'u-1',
                name: 'Anbu Selvan',
                email: 'anbu@example.com',
                phone: '+91 98765 43210',
                role: 'customer',
                preferredLanguage: 'Tamil',
                createdAt: new Date().toISOString(),
            },
            {
                _id: 'u-2',
                name: 'K. Murugan',
                email: 'murugan.elec@example.com',
                phone: '+91 98765 12345',
                role: 'provider',
                verificationStatus: 'Approved',
                createdAt: new Date().toISOString(),
            },
            {
                _id: 'u-3',
                name: 'System Administrator',
                email: 'admin@vinaithunai.com',
                phone: '+91 90000 00000',
                role: 'admin',
                createdAt: new Date().toISOString(),
            },
        ];

    const filteredUsers = allUsersList.filter((u) => {
        const matchesRole = activeTab === 'all' || u.role === activeTab;
        const matchesSearch =
            !search ||
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.phone.includes(search);
        return matchesRole && matchesSearch;
    });

    const tabs = [
        { id: 'all', label: 'All Users', count: allUsersList.length },
        { id: 'customer', label: 'Customers', count: allUsersList.filter((u) => u.role === 'customer').length },
        { id: 'provider', label: 'Providers', count: allUsersList.filter((u) => u.role === 'provider').length },
        { id: 'admin', label: 'Admins', count: allUsersList.filter((u) => u.role === 'admin').length },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="border-b border-slate-200 pb-6 space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <Users className="w-6 h-6 text-brand-600" /> Platform User Directory
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                    Manage registered accounts, check customer language preferences, and provider credentials
                </p>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                <div className="w-full sm:w-72">
                    <Input
                        placeholder="Search by name, email or phone..."
                        icon={Search}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Users Table */}
            <Card className="p-0 overflow-hidden">
                {loading ? (
                    <div className="p-6">
                        <LoadingSkeleton count={4} />
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <EmptyState title="No users found" description="Try clearing your search query or changing tabs." />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                                    <th className="py-3 px-4 font-bold">User</th>
                                    <th className="py-3 px-4 font-bold">Contact Info</th>
                                    <th className="py-3 px-4 font-bold">Role</th>
                                    <th className="py-3 px-4 font-bold">Status / Details</th>
                                    <th className="py-3 px-4 font-bold text-right">Registered</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-800">
                                {filteredUsers.map((u) => (
                                    <tr key={u._id}>
                                        <td className="py-3.5 px-4">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-xs">
                                                    {u.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <span className="font-bold text-slate-900 block">{u.name}</span>
                                                    <span className="text-slate-400 text-[11px]">ID: {u._id}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-3.5 px-4 space-y-0.5">
                                            <span className="block text-slate-900 font-medium">{u.email}</span>
                                            <span className="block text-slate-500 text-[11px]">{u.phone}</span>
                                        </td>

                                        <td className="py-3.5 px-4">
                                            <Badge
                                                variant={u.role === 'admin' ? 'danger' : u.role === 'provider' ? 'trust' : 'brand'}
                                            >
                                                {u.role.toUpperCase()}
                                            </Badge>
                                        </td>

                                        <td className="py-3.5 px-4">
                                            {u.role === 'provider' ? (
                                                <StatusBadge status={u.verificationStatus || 'Pending'} />
                                            ) : (
                                                <span className="text-slate-500 text-[11px]">Language: {u.preferredLanguage || 'Tamil'}</span>
                                            )}
                                        </td>

                                        <td className="py-3.5 px-4 text-right text-slate-500">
                                            {formatDate(u.createdAt)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default AdminUsers;
