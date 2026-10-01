import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { formatCurrency } from '../../utils/formatters';
import { showToast } from '../../store/slices/toastSlice';
import { useDispatch } from 'react-redux';
import { Wrench, Plus, Trash2, Edit, DollarSign, ShieldCheck } from 'lucide-react';

export const ProviderServices = () => {
    const dispatch = useDispatch();

    const [services, setServices] = useState([
        { id: 's-1', name: 'Main Switchboard & MCB Rewiring', startingPrice: 350 },
        { id: 's-2', name: 'Ceiling Fan Hook & Spotlight Wiring', startingPrice: 300 },
        { id: 's-3', name: 'Inverter & Battery Setup Inspection', startingPrice: 450 },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newServiceName, setNewServiceName] = useState('');
    const [newStartingPrice, setNewStartingPrice] = useState('');

    const handleAddService = (e) => {
        e.preventDefault();
        if (!newServiceName || !newStartingPrice) return;

        const newItem = {
            id: `s-${Date.now()}`,
            name: newServiceName,
            startingPrice: Number(newStartingPrice),
        };

        setServices((prev) => [...prev, newItem]);
        setNewServiceName('');
        setNewStartingPrice('');
        setIsModalOpen(false);
        dispatch(
            showToast({
                type: 'success',
                message: 'New service added to your professional profile!',
            })
        );
    };

    const handleDeleteService = (id) => {
        setServices((prev) => prev.filter((s) => s.id !== id));
        dispatch(
            showToast({
                type: 'info',
                message: 'Service removed.',
            })
        );
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        <Wrench className="w-6 h-6 text-brand-600" /> Offered Services & Starting Rates
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Specify the exact home repair services you offer and set minimum diagnostic starting rates
                    </p>
                </div>

                <Button variant="primary" icon={Plus} onClick={() => setIsModalOpen(true)}>
                    Add Service Offertory
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((s) => (
                    <Card key={s.id} className="flex items-center justify-between p-5">
                        <div className="space-y-1">
                            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                <Wrench className="w-4 h-4 text-brand-600" /> {s.name}
                            </h4>
                            <span className="text-xs font-semibold text-emerald-700 block">
                                Starting Rate: {formatCurrency(s.startingPrice)}
                            </span>
                        </div>

                        <button
                            onClick={() => handleDeleteService(s.id)}
                            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </Card>
                ))}
            </div>

            {/* Add Service Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Service Offertory"
            >
                <form onSubmit={handleAddService} className="space-y-4">
                    <Input
                        label="Service Title"
                        placeholder="e.g. AC Filter Wash & Gas Topup"
                        value={newServiceName}
                        onChange={(e) => setNewServiceName(e.target.value)}
                        required
                    />

                    <Input
                        label="Starting Rate (₹)"
                        type="number"
                        icon={DollarSign}
                        placeholder="e.g. 400"
                        value={newStartingPrice}
                        onChange={(e) => setNewStartingPrice(e.target.value)}
                        required
                    />

                    <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            Save Service
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ProviderServices;
