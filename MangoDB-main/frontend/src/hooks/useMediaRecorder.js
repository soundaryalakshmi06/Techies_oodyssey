import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Hook for audio recording using HTML5 MediaRecorder API
 */
export const useMediaRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [error, setError] = useState(null);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const timerRef = useRef(null);

    // Clear timer interval
    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    // Start recording
    const startRecording = useCallback(async () => {
        try {
            setError(null);
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Audio recording is not supported in your browser.');
            }

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioChunksRef.current = [];

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                setAudioBlob(blob);
                setAudioUrl(url);
                // Stop all audio tracks to release microphone
                stream.getTracks().forEach((track) => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setIsPaused(false);
            setRecordingTime(0);

            timerRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);
        } catch (err) {
            console.error('[MediaRecorder Error]', err);
            setError(err.message || 'Microphone access denied or failed.');
        }
    }, []);

    // Stop recording
    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsPaused(false);
            stopTimer();
        }
    }, [isRecording]);

    // Pause recording
    const pauseRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording && !isPaused) {
            mediaRecorderRef.current.pause();
            setIsPaused(true);
            stopTimer();
        }
    }, [isRecording, isPaused]);

    // Resume recording
    const resumeRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording && isPaused) {
            mediaRecorderRef.current.resume();
            setIsPaused(false);
            timerRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);
        }
    }, [isRecording, isPaused]);

    // Reset / Delete recording
    const deleteRecording = useCallback(() => {
        if (isRecording) {
            stopRecording();
        }
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
        }
        setAudioUrl(null);
        setAudioBlob(null);
        setRecordingTime(0);
        setIsRecording(false);
        setIsPaused(false);
        setError(null);
        audioChunksRef.current = [];
    }, [isRecording, audioUrl, stopRecording]);

    useEffect(() => {
        return () => {
            stopTimer();
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, [audioUrl]);

    return {
        isRecording,
        isPaused,
        recordingTime,
        audioUrl,
        audioBlob,
        error,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        deleteRecording,
    };
};

export default useMediaRecorder;
