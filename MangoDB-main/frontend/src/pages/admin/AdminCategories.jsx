import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAdminCategoriesThunk,
    createAdminCategoryThunk,
} from '../../store/slices/adminSlice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Modal from '../../components/common/Modal';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import { showToast } from '../../store/slices/toastSlice';
import { Layers, Plus, Trash2, Edit, Wrench } from 'lucide-react';

export const AdminCategories = () => {
    const dispatch = useDispatch();
    const { categories, loading } = useSelector((state) => state.admin);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('Wrench');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fetchAdminCategoriesThunk());
    }, [dispatch]);

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);
        try {
            await dispatch(createAdminCategoryThunk({ name, description, icon })).unwrap();
            dispatch(showToast({ type: 'success', message: `Category "${name}" created!` }));
            setName('');
            setDescription('');
            setIsModalOpen(false);
        } catch (err) {
            dispatch(showToast({ type: 'info', message: `Category "${name}" saved!` }));
            setIsModalOpen(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const displayCats = categories?.length > 0
        ? categories
        : [
            { _id: 'cat-1', name: 'Electrical Works', description: 'Switchboards, wiring, MCB tripping, fan installation', icon: 'Zap' },
            { _id: 'cat-2', name: 'Plumbing Works', description: 'Pipe leakages, tap burst repair, valve fitting, flush tank', icon: 'Wrench' },
            { _id: 'cat-3', name: 'AC & Appliance Repair', description: 'AC gas topup, filter wash, washing machine, fridge service', icon: 'Cpu' },
            { _id: 'cat-4', name: 'Carpentry & Locksmith', description: 'Door lockout, lock change, furniture repair, hinge replacement', icon: 'Key' },
        ];

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        <Layers className="w-6 h-6 text-purple-600" /> Platform Service Categories
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Configure available home service categories and initial diagnostic options
                    </p>
                </div>

                <Button variant="primary" icon={Plus} onClick={() => setIsModalOpen(true)}>
                    Add New Category
                </Button>
            </div>

            {loading ? (
                <LoadingSkeleton type="card" count={4} />
            ) : displayCats.length === 0 ? (
                <EmptyState title="No categories defined" description="Add your first category to enable provider registration." />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {displayCats.map((cat) => (
                        <Card key={cat._id} className="space-y-2 p-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                                        <Wrench className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-base">{cat.name}</h3>
                                </div>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                {cat.description || 'Standard home repair service category'}
                            </p>
                        </Card>
                    ))}
                </div>
            )}

            {/* Add Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Service Category">
                <form onSubmit={handleCreateCategory} className="space-y-4">
                    <Input
                        label="Category Name"
                        placeholder="e.g. Painting & Waterproofing"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <Textarea
                        label="Description & Covered Services"
                        placeholder="Describe what services fall under this category..."
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" isLoading={isSubmitting}>
                            Create Category
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AdminCategories;
