import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonRadio,
    IonRadioGroup,
    IonRow,
    IonText,
} from "@ionic/react";
import { SettingsContext } from "../contexts/SettingsContext";
import "./PomodoroTimer.css";

interface PomodoroTimerProps {
    name: string;
}

const FOCUS_AUDIO_SRC = "heavy-rain-the-day-145472.mp3";
const BREAK_AUDIO_SRC = "daily_download_20190509_128.mp3";
const REST_AUDIO_TITLE = "Alexander Borodin - String Quartet No. 2: Notturno";

type TimerMode = "focus" | "break";

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ name }) => {
    const context = useContext(SettingsContext);
    const minutesSetting = context?.minutesSetting ?? 0;
    const restSetting = context?.restSetting ?? 0;

    // Main state
    const [mode, setMode] = useState<TimerMode>("focus");
    const [minutes, setMinutes] = useState(minutesSetting);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [titleClass, setTitleClass] = useState("");
    // Volume state: 1.0 = 100%
    const [volume, setVolume] = useState(1.0);

    // Audio Refs (avoid recreation on render)
    const focusAudioRef = useRef<HTMLAudioElement | null>(null);
    const breakAudioRef = useRef<HTMLAudioElement | null>(null);

    // === AUDIO SETUP & HELPERS ===
    useEffect(() => {
        focusAudioRef.current = new Audio(FOCUS_AUDIO_SRC);
        focusAudioRef.current.loop = true;

        breakAudioRef.current = new Audio(BREAK_AUDIO_SRC);
        breakAudioRef.current.loop = true;

        return () => {
            focusAudioRef.current?.pause();
            breakAudioRef.current?.pause();
        };
    }, []); // only on mount/unmount

    // Set audio volume when volume state changes
    useEffect(() => {
        if (focusAudioRef.current) focusAudioRef.current.volume = volume;
        if (breakAudioRef.current) breakAudioRef.current.volume = volume;
    }, [volume]);

    const playAudio = useCallback((audio: HTMLAudioElement | null) => {
        if (!audio) return;
        audio.currentTime = 0;
        audio.play().catch(console.error);
    }, []);

    const pauseAllAudio = useCallback(() => {
        focusAudioRef.current?.pause();
        breakAudioRef.current?.pause();
        if (focusAudioRef.current) focusAudioRef.current.currentTime = 0;
        if (breakAudioRef.current) breakAudioRef.current.currentTime = 0;
    }, []);

    // === TIMER MODE & INITIALIZATION ===
    useEffect(() => {
        // Reset minutes when mode or settings change
        setMinutes(mode === "focus" ? minutesSetting : restSetting);
        setSeconds(0);
    }, [mode, minutesSetting, restSetting]);

    // === TIMER EFFECT ===
    useEffect(() => {
        if (!isActive) return;

        const tick = () => {
            if (minutes === 0 && seconds === 0) {
                setMode((prev) => (prev === "focus" ? "break" : "focus"));
                return;
            }
            if (seconds > 0) {
                setSeconds((s) => s - 1);
            } else if (minutes > 0) {
                setMinutes((m) => m - 1);
                setSeconds(59);
            }
        };

        const interval = setInterval(tick, 1000);

        return () => clearInterval(interval);
    }, [isActive, minutes, seconds]);

    // === AUDIO ON MODE/ACTIVATION CHANGE ===
    useEffect(() => {
        if (!isActive) {
            pauseAllAudio();
            return;
        }
        if (mode === "focus") {
            playAudio(focusAudioRef.current);
            breakAudioRef.current?.pause();
        } else {
            playAudio(breakAudioRef.current);
            focusAudioRef.current?.pause();
        }
    }, [isActive, mode, playAudio, pauseAllAudio]);

    // === HANDLERS ===
    const handleToggle = () => {
        setIsActive((prev) => !prev);
    };

    const handleReset = () => {
        setIsActive(false);
        setMinutes(mode === "focus" ? minutesSetting : restSetting);
        setSeconds(0);
        pauseAllAudio();
    };

    const handleTitleClick = () => {
        setIsActive(false);
        setMode((prev) => (prev === "focus" ? "break" : "focus"));
        setTitleClass("title-pop large-font");
        setTimeout(() => setTitleClass("large-font"), 500);
    };

    const handleModeChange = (event: CustomEvent) => {
        setIsActive(false);
        setMode(event.detail.value);
    };

    // === RENDER ===
    return (
        <IonContent className="ion-padding" style={{ marginTop: "50px" }}>
            <IonText
                className={`large-title-font ${titleClass}`}
                onClick={handleTitleClick}
            >
                {mode === "focus" ? "집중 시간" : "휴식 시간"}
            </IonText>
            <br />
            <IonRadioGroup value={mode} onIonChange={handleModeChange}>
                <IonRadio value="focus" slot="start">
                    집중 시간
                </IonRadio>
                <IonRadio value="break" slot="start">
                    휴식 시간
                </IonRadio>
            </IonRadioGroup>
            <IonGrid className="bordered-grid">
                <IonRow className="ion-text-center">
                    <IonCol>
                        <h1 className="timer-text">
                            {String(minutes).padStart(2, "0")}:
                            {String(seconds).padStart(2, "0")}
                        </h1>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        {mode === "break" && <IonText>{REST_AUDIO_TITLE}</IonText>}
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className="ion-text-center timer-buttons">
                        <IonButton onClick={handleToggle}>
                            {isActive ? "Pause" : "Start"}
                        </IonButton>
                        <IonButton onClick={handleReset}>Reset</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
            {/* Volume Control */}
            <div style={{ margin: "24px 0 0 0", textAlign: "center" }}>
                <IonText>
                    🔊 Volume: {Math.round(volume * 100)}%
                </IonText>
                <br />
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={e => setVolume(Number(e.target.value))}
                    style={{ width: 180, marginTop: 8 }}
                    aria-label="Volume control"
                />
            </div>
        </IonContent>
    );
};

export default PomodoroTimer;
