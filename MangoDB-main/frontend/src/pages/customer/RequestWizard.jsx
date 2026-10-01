import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, createCustomerRequest, uploadMedia } from '../../api/endpoints';
import { showToast } from '../../store/slices/toastSlice';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import FileUploader from '../../components/common/FileUploader';
import VoiceRecorder from '../../components/common/VoiceRecorder';
import LocationButton from '../../components/common/LocationButton';
import Card from '../../components/common/Card';
import { validateRequired } from '../../utils/validators';
import {
    Wrench,
    Calendar,
    Clock,
    MapPin,
    Globe,
    Camera,
    Mic,
    CheckCircle2,
    ArrowLeft,
    ArrowRight,
    Send,
    ShieldCheck,
} from 'lucide-react';

export const RequestWizard = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const providerId = searchParams.get('providerId');

    const [step, setStep] = useState(1);
    const [categories, setCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form Data
    const [formData, setFormData] = useState({
        category: '',
        serviceName: '',
        description: '',
        language: 'Tamil',
        preferredDate: new Date().toISOString().split('T')[0],
        preferredTime: '10:00 AM',
        address: '',
        location: null,
        images: [], // File objects
        audioNote: null, // { blob, url, duration }
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const data = await getCategories();
                const cats = Array.isArray(data) ? data : (data.categories || data.data || []);
                setCategories(cats);
                if (cats.length > 0 && !formData.category) {
                    setFormData((prev) => ({ ...prev, category: cats[0].name }));
                }
            } catch (err) {
                console.warn('Could not load categories in request wizard', err);
            }
        };
        fetchCats();
    }, []);

    const languageOptions = [
        { value: 'Tamil', label: 'Tamil (தமிழ்)' },
        { value: 'English', label: 'English' },
        { value: 'Telugu', label: 'Telugu (తెలుగు)' },
        { value: 'Hindi', label: 'Hindi (हिंदी)' },
        { value: 'Kannada', label: 'Kannada' },
        { value: 'Malayalam', label: 'Malayalam' },
    ];

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const handleLocationFound = (coords) => {
        setFormData((prev) => ({
            ...prev,
            location: {
                type: 'Point',
                coordinates: [coords.longitude, coords.latitude],
            },
        }));
    };

    // Step 1 Validation
    const handleStep1Next = () => {
        const catErr = validateRequired(formData.category, 'Service Category');
        const serviceErr = validateRequired(formData.serviceName, 'Service Name');
        const descErr = validateRequired(formData.description, 'Problem Description');

        if (catErr || serviceErr || descErr) {
            setErrors({ category: catErr, serviceName: serviceErr, description: descErr });
            return;
        }

        setErrors({});
        setStep(2);
    };

    // Step 3 Submission
    const handleSubmitRequest = async () => {
        setIsSubmitting(true);
        try {
            let uploadedImageUrls = [];

            // Attempt media uploads if images exist
            if (formData.images && formData.images.length > 0) {
                try {
                    const uploadRes = await uploadMedia(formData.images);
                    uploadedImageUrls = uploadRes.urls || [];
                } catch (uploadErr) {
                    console.warn('Media upload API not connected yet, using local blob reference', uploadErr);
                }
            }

            const payload = {
                category: formData.category,
                serviceName: formData.serviceName,
                description: formData.description,
                language: formData.language,
                preferredDate: formData.preferredDate,
                preferredTime: formData.preferredTime,
                address: formData.address,
                location: formData.location,
                images: uploadedImageUrls,
                targetProviderId: providerId || null,
            };

            const res = await createCustomerRequest(payload);
            dispatch(
                showToast({
                    type: 'success',
                    message: 'Service request submitted! Finding matching professionals nearby.',
                })
            );
            navigate('/customer/matches');
        } catch (err) {
            console.error('Request creation failed', err);
            dispatch(
                showToast({
                    type: 'error',
                    message: err.response?.data?.message || err.message || 'Failed to submit request.',
                })
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">Request Home Service</h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Describe your issue in your language and get upfront estimates
                    </p>
                </div>
                {providerId && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        Target Provider Selected
                    </span>
                )}
            </div>

            {/* Step Indicator */}
            <div className="grid grid-cols-3 gap-2">
                {[
                    { num: 1, label: '1. Service Details' },
                    { num: 2, label: '2. Photos & Voice' },
                    { num: 3, label: '3. Review & Submit' },
                ].map((s) => (
                    <div
                        key={s.num}
                        className={`p-3 rounded-2xl border text-center transition-all ${step === s.num
                                ? 'bg-brand-600 text-white font-bold border-brand-600 shadow-md'
                                : step > s.num
                                    ? 'bg-emerald-50 text-emerald-800 font-semibold border-emerald-200'
                                    : 'bg-white text-slate-400 border-slate-200'
                            }`}
                    >
                        <span className="text-xs">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* STEP 1: Service Details */}
            {step === 1 && (
                <Card className="space-y-6">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                        <Wrench className="w-5 h-5 text-brand-600" />
                        <h3 className="font-bold text-slate-900 text-base">Step 1: Service Information</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Select
                            label="Service Category"
                            icon={Wrench}
                            options={categories.map((c) => ({ value: c.name, label: c.name }))}
                            value={formData.category}
                            onChange={(e) => handleInputChange('category', e.target.value)}
                            error={errors.category}
                            required
                        />

                        <Input
                            label="Specific Service Required"
                            placeholder="e.g. Tap repair, Leaking pipe, Circuit breaker tripm"
                            value={formData.serviceName}
                            onChange={(e) => handleInputChange('serviceName', e.target.value)}
                            error={errors.serviceName}
                            required
                        />
                    </div>

                    <Textarea
                        label="Problem Description"
                        placeholder="Explain what is broken or needs servicing in detail..."
                        rows={3}
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        error={errors.description}
                        required
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Select
                            label="Language Preference"
                            icon={Globe}
                            options={languageOptions}
                            value={formData.language}
                            onChange={(e) => handleInputChange('language', e.target.value)}
                        />

                        <Input
                            label="Preferred Date"
                            type="date"
                            icon={Calendar}
                            value={formData.preferredDate}
                            onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                            required
                        />

                        <Input
                            label="Preferred Time"
                            type="text"
                            placeholder="e.g. 10:00 AM"
                            icon={Clock}
                            value={formData.preferredTime}
                            onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                            required
                        />
                    </div>

                    <Textarea
                        label="Service Address"
                        placeholder="Door No, Street Name, Area, City"
                        rows={2}
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                    />

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                            GPS Location Coordinates
                        </span>
                        <LocationButton onLocationFound={handleLocationFound} />
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-100">
                        <Button variant="primary" icon={ArrowRight} onClick={handleStep1Next}>
                            Next: Photos & Voice
                        </Button>
                    </div>
                </Card>
            )}

            {/* STEP 2: Photos & Voice Description */}
            {step === 2 && (
                <Card className="space-y-6">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                        <Camera className="w-5 h-5 text-brand-600" />
                        <h3 className="font-bold text-slate-900 text-base">Step 2: Attach Photos & Voice Note</h3>
                    </div>

                    {/* Photo Uploader */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                            Issue Photos (Before Work Evidence)
                        </label>
                        <FileUploader
                            files={formData.images}
                            onChange={(files) => handleInputChange('images', files)}
                            maxFiles={4}
                        />
                    </div>

                    {/* HTML5 Voice Recorder */}
                    <VoiceRecorder
                        audioBlob={formData.audioNote?.blob}
                        audioUrl={formData.audioNote?.url}
                        onAudioChange={(audioData) => handleInputChange('audioNote', audioData)}
                    />

                    <div className="flex justify-between pt-4 border-t border-slate-100">
                        <Button variant="outline" icon={ArrowLeft} onClick={() => setStep(1)}>
                            Back to Details
                        </Button>
                        <Button variant="primary" icon={ArrowRight} onClick={() => setStep(3)}>
                            Review Request
                        </Button>
                    </div>
                </Card>
            )}

            {/* STEP 3: Review & Submit */}
            {step === 3 && (
                <Card className="space-y-6">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <h3 className="font-bold text-slate-900 text-base">Step 3: Review & Confirm Request</h3>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs text-slate-700">
                        <div className="flex justify-between">
                            <span className="font-bold text-slate-900">Category & Service:</span>
                            <span className="font-semibold text-brand-600">{formData.category} — {formData.serviceName}</span>
                        </div>

                        <div>
                            <span className="font-bold text-slate-900 block">Description:</span>
                            <p className="mt-1 text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">{formData.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                            <div>
                                <span className="text-slate-500 block">Language:</span>
                                <span className="font-semibold">{formData.language}</span>
                            </div>
                            <div>
                                <span className="text-slate-500 block">Schedule:</span>
                                <span className="font-semibold">{formData.preferredDate} at {formData.preferredTime}</span>
                            </div>
                        </div>

                        {formData.address && (
                            <div className="pt-2 border-t border-slate-200">
                                <span className="text-slate-500 block">Service Address:</span>
                                <span className="font-semibold">{formData.address}</span>
                            </div>
                        )}

                        <div className="flex justify-between pt-2 border-t border-slate-200">
                            <span>Attached Media:</span>
                            <span className="font-semibold">
                                {formData.images.length} Photos • {formData.audioNote ? '1 Voice Note' : 'No Voice Note'}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t border-slate-100">
                        <Button variant="outline" icon={ArrowLeft} onClick={() => setStep(2)}>
                            Back to Media
                        </Button>
                        <Button
                            variant="trust"
                            icon={Send}
                            onClick={handleSubmitRequest}
                            isLoading={isSubmitting}
                            loadingText="Submitting Request…"
                        >
                            Submit Service Request
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default RequestWizard;
