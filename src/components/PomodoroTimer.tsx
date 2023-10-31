// filename: PomodoroTimer.tsx
interface PomodoroTimerProps {
    name: string;
    // ...other props
}
import React, { useState, useEffect, useContext } from 'react';
import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonRow, IonTitle,
} from '@ionic/react';
// import { LocalNotifications } from '@capacitor/local-notifications';
import { SettingsContext } from '../contexts/SettingsContext';
import './PomodoroTimer.css';

const audioSrc = "Rain-white-noise.mp3";
const restAudioSrc = "ambient-classical-guitar-144998.mp3"; // Music by William_King from Pixabay
const audio1 = new Audio(audioSrc);
const audio2 = new Audio(audioSrc);
const restAudio = new Audio(restAudioSrc);
audio1.load();  // 미리 로딩
audio2.load();  // 미리 로딩
// restAudio.load();  // 미리 로딩

audio1.loop = false;
audio2.loop = false;
restAudio.loop = true;

const PomodoroTimer: React.FC<PomodoroTimerProps> = () => {
    const context = useContext(SettingsContext);
    const minutesSetting = context?.minutesSetting ?? 0;
    const restSetting = context?.restSetting ?? 0; // 추가: 휴식 시간 설정
    const [timerState, setTimerState] = useState<'focus' | 'break'>('focus'); // 추가: 타이머 상태
    const [minutes, setMinutes] = useState(minutesSetting);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        console.log('useEffect: timerState, minutesSetting, restSetting');
        if (timerState === 'focus') {
            setMinutes(minutesSetting);
        } else {
            setMinutes(restSetting);
        }
    }, [timerState, minutesSetting, restSetting]);


    // useEffect(() => {
    //     console.log('useEffect: minutesSetting')
    //     setMinutes(minutesSetting);
    // }, [minutesSetting]);

    // useEffect(() => {
    //     if (isActive) {
    //         audio.play().then(r => console.log('r:' + r));
    //     } else {
    //         audio.pause();
    //         audio.currentTime = 0;
    //     }
    // }, [isActive]);


    const playAudio = (audioType1: HTMLAudioElement, audioType2?: HTMLAudioElement) => {
        // Function to handle the ending of audioType1
        const handleAudioType1End = function() {
            console.log('audioType1');
            audioType2?.play().catch(e => console.error(e));
        };

        // Function to handle the ending of audioType2
        const handleAudioType2End = function() {
            console.log('audioType2');
            audioType1.play().catch(e => console.error(e));
        };

        // Remove existing event listeners
        audioType1.removeEventListener('ended', handleAudioType1End);
        audioType2?.removeEventListener('ended', handleAudioType2End);

    if (audioType2) {
        // Add new event listeners
        audioType1.addEventListener('ended', handleAudioType1End);
        audioType2.addEventListener('ended', handleAudioType2End);
    } else {
        console.log('else audioType1');
        audioType1.loop = true;
        audioType1.play().catch(e => console.error(e));
    }
    console.log('audioType');
    audioType1.loop = true; // Add this line to enable looping
    audioType1.play().catch(e => console.error(e));
};


    const pauseAudio = (audioTypes: HTMLAudioElement[]) => {
        audioTypes.forEach(audioType => {
            audioType.pause();
            audioType.currentTime = 0;
        });
    };


    useEffect(() => {
        console.log('useEffect: isActive, timerState')
        if (isActive) {
            if (timerState === 'focus') {
                playAudio(audio1, audio2);
                pauseAudio([restAudio]);
            } else {
                restAudio.play().catch(e => console.error(e));
                pauseAudio([audio1, audio2]);
            }
        } else {
            pauseAudio([audio1, audio2]);
            pauseAudio([restAudio]);
        }
    }, [isActive, timerState]);


    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive) {
            interval = setInterval(() => {
                if (minutes === 0 && seconds === 0) {
                    if (timerState === 'focus') {
                        setTimerState('break');
                    } else {
                        setTimerState('focus');
                    }
                    // setIsActive(true);
                }
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (seconds === 0) {
                    if (minutes === 0) {
                        if(interval != null) {
                            clearInterval(interval);
                        }
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                }
            }, 1000);
        } else {
            if(interval != null) {
                clearInterval(interval);
            }
        }

        return () => {
            if(interval!= null) {
                clearInterval(interval);
            }
        };
    }, [isActive, seconds, minutes]);

    const toggle = () => {
        setIsActive(!isActive);

        if (!isActive) {
            if (timerState === 'focus') {
                console.log('toggle playaudio focus');
                playAudio(audio1, audio2);
            } else {
                console.log('toggle playaudio rest');
                playAudio(restAudio);
            }
        } else {
            pauseAudio([audio1, audio2]);
            pauseAudio([restAudio]);
        }
    };

    const reset = () => {
        setIsActive(false);
        setTimerState('focus');
        setMinutes(minutesSetting);
        // setMinutes(0);
        setSeconds(0);
    };

    const [titleClass, setTitleClass] = useState<string>('');

    const handleTitleClick = () => {
        if (timerState === 'focus') {
            setIsActive(false);
            setTimerState('break');
            setMinutes(minutesSetting);
            setSeconds(0);
        } else {
            setIsActive(false);
            setTimerState('focus');
            setMinutes(restSetting);
            setSeconds(0);
        }
        setTitleClass('title-pop large-font');  // 'large-font' 클래스 추가
        setTimeout(() => setTitleClass('large-font'), 500); // 0.5초 후에 'title-pop' 효과 제거
    };

    return (
        <IonContent className="ion-padding" style={{ marginTop: '50px' }}>
            <IonTitle className={`large-title-font ${titleClass}`} onClick={handleTitleClick}>
                {timerState === 'focus'? '집중 시간' : '휴식 시간'}
            </IonTitle>
            <IonGrid className="bordered-grid">
                <IonRow className="ion-text-center">
                    <IonCol>
                        <h1 className="timer-text">
                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </h1>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className="ion-text-center timer-buttons">
                        <IonButton onClick={toggle}>
                            {isActive ? 'Pause' : 'Start'}
                        </IonButton>
                        <IonButton onClick={reset}>Reset</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    );
};

export default PomodoroTimer;
