import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    maxWidth = 'max-w-lg',
    showClose = true,
}) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            {/* Backdrop click */}
            <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

            {/* Modal Container */}
            <div
                className={`relative w-full ${maxWidth} bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-10 flex flex-col max-h-[90vh]`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'modal-title' : undefined}
            >
                {/* Header */}
                {(title || showClose) && (
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
                        <div>
                            {title && (
                                <h3 id="modal-title" className="text-lg font-bold text-slate-900">
                                    {title}
                                </h3>
                            )}
                            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
                        </div>
                        {showClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                )}

                {/* Content Body */}
                <div className="p-6 overflow-y-auto grow">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
