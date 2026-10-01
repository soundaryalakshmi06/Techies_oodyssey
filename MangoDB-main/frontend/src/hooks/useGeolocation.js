import { useState, useCallback } from 'react';

/**
 * Hook to request current location via navigator.geolocation ONLY when explicitly triggered.
 * Handles states: 'idle' | 'locating' | 'found' | 'denied' | 'unavailable' | 'timeout' | 'error'
 */
export const useGeolocation = () => {
    const [status, setStatus] = useState('idle'); // idle, locating, found, denied, unavailable, timeout, error
    const [coords, setCoords] = useState(null); // { latitude, longitude }
    const [errorMsg, setErrorMsg] = useState(null);

    const getCurrentLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setStatus('unavailable');
            setErrorMsg('Geolocation is not supported by your browser.');
            return;
        }

        setStatus('locating');
        setErrorMsg(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setCoords({ latitude, longitude });
                setStatus('found');
            },
            (error) => {
                console.warn('[Geolocation Error]', error);
                if (error.code === error.PERMISSION_DENIED) {
                    setStatus('denied');
                    setErrorMsg('Location permission denied. Please allow location access or enter address manually.');
                } else if (error.code === error.TIMEOUT) {
                    setStatus('timeout');
                    setErrorMsg('Location request timed out. Please try again or enter address manually.');
                } else {
                    setStatus('unavailable');
                    setErrorMsg('Location information is unavailable. Please enter address manually.');
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    }, []);

    const resetLocation = useCallback(() => {
        setStatus('idle');
        setCoords(null);
        setErrorMsg(null);
    }, []);

    return {
        status,
        coords,
        errorMsg,
        getCurrentLocation,
        resetLocation,
        isLocating: status === 'locating',
        isFound: status === 'found',
    };
};

export default useGeolocation;
