// src/contexts/SettingsContext.tsx
import{ createContext, Dispatch, SetStateAction } from 'react';

type SettingsContextType = {
    minutesSetting: number;
    setMinutesSetting: Dispatch<SetStateAction<number>>;
    restSetting: number;  // 휴식 간격을 위한 상태
    setRestSetting: Dispatch<SetStateAction<number>>;  // 휴식 간격을 설정하기 위한 함수
};

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);
