import React from 'react';
import useMediaRecorder from '../../hooks/useMediaRecorder';
import Button from './Button';
import { Mic, Square, Play, Pause, Trash2, RotateCcw, Volume2 } from 'lucide-react';

export const VoiceRecorder = ({
    audioBlob: externalAudioBlob,
    audioUrl: externalAudioUrl,
    onAudioChange,
    className = '',
}) => {
    const {
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
    } = useMediaRecorder();

    const currentAudioUrl = externalAudioUrl || audioUrl;

    // Pass blob/url up when audio changes
    React.useEffect(() => {
        if (onAudioChange && (audioBlob || audioUrl)) {
            onAudioChange({ blob: audioBlob, url: audioUrl, duration: recordingTime });
        }
    }, [audioBlob, audioUrl, recordingTime, onAudioChange]);

    const formatSeconds = (sec) => {
        const mins = Math.floor(sec / 60);
        const secs = sec % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleDelete = () => {
        deleteRecording();
        if (onAudioChange) onAudioChange(null);
    };

    return (
        <div className={`p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 ${className}`}>
            <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-brand-600" />
                    <span>Voice Description (Describe issue in your language)</span>
                </label>
                {isRecording && (
                    <span className="flex items-center gap-2 text-xs font-bold text-red-600 animate-pulse">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                        RECORDING {formatSeconds(recordingTime)}
                    </span>
                )}
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                    ⚠️ {error}
                </div>
            )}

            {/* Recording State Controls */}
            {!currentAudioUrl && !isRecording && (
                <div className="flex items-center gap-3">
                    <Button
                        variant="primary"
                        icon={Mic}
                        onClick={startRecording}

                    >
                        Start Voice Recording
                    </Button>
                    <span className="text-xs text-slate-500">
                        Click to record up to 2 minutes in your native language
                    </span>
                </div>
            )}

            {isRecording && (
                <div className="flex items-center gap-3">
                    <Button variant="danger" icon={Square} onClick={stopRecording}>
                        Stop Recording ({formatSeconds(recordingTime)})
                    </Button>
                    {!isPaused ? (
                        <Button variant="outline" icon={Pause} onClick={pauseRecording}>
                            Pause
                        </Button>
                    ) : (
                        <Button variant="outline" icon={Play} onClick={resumeRecording}>
                            Resume
                        </Button>
                    )}
                </div>
            )}

            {/* Playback Controls when recorded audio exists */}
            {currentAudioUrl && !isRecording && (
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                            <Mic className="w-4 h-4 text-emerald-600" /> Recorded Audio Note
                        </span>
                        <span className="text-xs text-slate-400">{formatSeconds(recordingTime || 0)}</span>
                    </div>

                    <audio src={currentAudioUrl} controls className="w-full h-10 rounded-lg" />

                    <div className="flex items-center justify-end gap-2 pt-1">
                        <Button variant="ghost" size="sm" icon={RotateCcw} onClick={handleDelete}>
                            Re-record
                        </Button>
                        <Button variant="outline" size="sm" icon={Trash2} onClick={handleDelete} className="text-red-600 hover:bg-red-50">
                            Delete
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceRecorder;
