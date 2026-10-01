import React, { useState } from 'react';
import Button from './Button';
import { Upload, X, Image as ImageIcon, RefreshCw } from 'lucide-react';

export const FileUploader = ({
    files = [],
    onChange,
    maxFiles = 5,
    accept = 'image/*',
    label = 'Upload Problem Photos',
    description = 'Upload photos showing the issue (max 5 photos)',
    disabled = false,
    className = '',
}) => {
    const [previews, setPreviews] = useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (!selectedFiles.length) return;

        const newFiles = [...files, ...selectedFiles].slice(0, maxFiles);

        // Generate local Object URL previews
        const newPreviews = newFiles.map((file) => ({
            file,
            url: typeof file === 'string' ? file : URL.createObjectURL(file),
            name: file.name || 'Image preview',
        }));

        setPreviews(newPreviews);
        if (onChange) onChange(newFiles);
    };

    const handleRemove = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        const updatedPreviews = previews.filter((_, i) => i !== index);
        setPreviews(updatedPreviews);
        if (onChange) onChange(updatedFiles);
    };

    return (
        <div className={`space-y-3 ${className}`}>
            {label && (
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    {label}
                </label>
            )}

            {/* Upload Dropzone */}
            {files.length < maxFiles && (
                <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-brand-500 hover:bg-brand-50/30 transition-all cursor-pointer group">
                    <input
                        type="file"
                        accept={accept}
                        multiple
                        disabled={disabled}
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-brand-100 group-hover:text-brand-600 text-slate-500 flex items-center justify-center transition-colors">
                            <Upload className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800">
                                Click to upload or drag & drop
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">{description}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Previews */}
            {previews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
                    {previews.map((item, index) => (
                        <div key={index} className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-square bg-slate-100">
                            <img
                                src={item.url}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-full opacity-90 hover:opacity-100 hover:scale-110 transition-all shadow-md"
                                title="Remove photo"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUploader;
