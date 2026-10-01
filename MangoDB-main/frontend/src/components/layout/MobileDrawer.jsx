import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { X } from 'lucide-react';

export const MobileDrawer = ({ isOpen, onClose, role = 'customer' }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer */}
            <div className="relative z-10 w-64 max-w-[80vw] h-full shadow-2xl animate-slideRight">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-3 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-20"
                    aria-label="Close navigation"
                >
                    <X className="w-5 h-5" />
                </button>

                <Sidebar role={role} className="h-full" />
            </div>
        </div>
    );
};

export default MobileDrawer;
