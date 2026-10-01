import React from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import Button from './Button';
import { MapPin, Navigation, CheckCircle2, AlertTriangle } from 'lucide-react';

export const LocationButton = ({
    onLocationFound,
    className = '',
}) => {
    const {
        status,
        coords,
        errorMsg,
        getCurrentLocation,
        isLocating,
        isFound,
    } = useGeolocation();

    // Notify parent component when location is acquired
    React.useEffect(() => {
        if (isFound && coords && onLocationFound) {
            onLocationFound(coords);
        }
    }, [isFound, coords, onLocationFound]);

    return (
        <div className={`space-y-2 ${className}`}>
            <Button
                variant={isFound ? 'trust' : 'outline'}
                icon={isFound ? CheckCircle2 : Navigation}
                onClick={getCurrentLocation}
                isLoading={isLocating}
                loadingText="Locating…"
            >
                {isFound
                    ? `Location Found (${coords?.latitude.toFixed(3)}, ${coords?.longitude.toFixed(3)})`
                    : 'Use My Current Location'}
            </Button>

            {status === 'denied' && (
                <p className="text-xs text-amber-700 font-medium flex items-center gap-1.5 p-2 bg-amber-50 rounded-lg border border-amber-200">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                    Location permission denied. Please allow location access or type your address manually below.
                </p>
            )}

            {(status === 'timeout' || status === 'unavailable') && (
                <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5 p-2 bg-slate-100 rounded-lg">
                    <MapPin className="w-4 h-4 shrink-0 text-slate-500" />
                    {errorMsg || 'Could not fetch GPS. Please enter your address manually.'}
                </p>
            )}
        </div>
    );
};

export default LocationButton;
