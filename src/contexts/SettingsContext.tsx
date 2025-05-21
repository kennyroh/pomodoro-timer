// src/contexts/SettingsContext.tsx
import React, { createContext, Dispatch, SetStateAction, useState, useEffect, ReactNode } from 'react';

// 로컬 스토리지 키 정의
export const FOCUS_TIME_KEY = 'focusTime';
export const REST_TIME_KEY = 'restTime';

type SettingsContextType = {
    minutesSetting: number;
    setMinutesSetting: Dispatch<SetStateAction<number>>;
    restSetting: number;  // 휴식 간격을 위한 상태
    setRestSetting: Dispatch<SetStateAction<number>>;  // 휴식 간격을 설정하기 위한 함수
};

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
    children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
    const [minutesSetting, setMinutesSetting] = useState<number>(25); // 기본값 설정
    const [restSetting, setRestSetting] = useState<number>(5); // 기본값 설정

    // 컴포넌트 마운트 시 localStorage에서 설정 로드
    useEffect(() => {
        // 저장된 집중 시간 불러오기
        const savedFocusTime = localStorage.getItem(FOCUS_TIME_KEY);
        if (savedFocusTime) {
            setMinutesSetting(Number(savedFocusTime));
        } else {
            // 저장된 값이 없으면 기본값 25분 저장
            localStorage.setItem(FOCUS_TIME_KEY, '25');
        }

        // 저장된 휴식 시간 불러오기
        const savedRestTime = localStorage.getItem(REST_TIME_KEY);
        if (savedRestTime) {
            setRestSetting(Number(savedRestTime));
        } else {
            // 저장된 값이 없으면 기본값 5분 저장
            localStorage.setItem(REST_TIME_KEY, '5');
        }
    }, []);

    // 모든 설정 값이 변경될 때마다 localStorage에 저장
    useEffect(() => {
        localStorage.setItem(FOCUS_TIME_KEY, minutesSetting.toString());
    }, [minutesSetting]);

    useEffect(() => {
        localStorage.setItem(REST_TIME_KEY, restSetting.toString());
    }, [restSetting]);

    const contextValue: SettingsContextType = {
        minutesSetting,
        setMinutesSetting,
        restSetting,
        setRestSetting
    };

    return (
        <SettingsContext.Provider value={contextValue}>
            {children}
        </SettingsContext.Provider>
    );
};
