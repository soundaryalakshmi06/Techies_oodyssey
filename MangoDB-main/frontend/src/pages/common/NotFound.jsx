import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
            <div className="max-w-md space-y-6">
                <div className="w-20 h-20 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto text-4xl font-extrabold shadow-inner">
                    404
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-extrabold text-slate-900">Page Not Found</h1>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        The page or service screen you requested does not exist or has been moved.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                    <Button variant="outline" icon={ArrowLeft} onClick={() => navigate(-1)}>
                        Go Back
                    </Button>
                    <Button variant="primary" icon={Home} onClick={() => navigate('/')}>
                        Home Page
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
