import React, {useContext} from 'react';
import {
    IonCol,
    IonContent,
    IonGrid,
    IonInput,
    IonItem,
    IonRow,
} from "@ionic/react";
import { SettingsContext } from '../contexts/SettingsContext';
import myStatusBar from "../myPlugin/StatusBar"; // 디렉토리 변경에 따른 경로 수정

interface ContainerProps {
    name: string;
}

// create async function getStatusBarHeight
async function getStatusBarHeight() {
    try {
        const { height } = await myStatusBar.getHeight();
        return height;
    }catch (e) {
        console.log(e)
        return 0;
    }
}

const SettingsContainer: React.FC<ContainerProps> = () => {
    const context = useContext(SettingsContext);
    const minutesSetting = context?.minutesSetting ?? 0;
    const setMinutesSetting = context?.setMinutesSetting ?? (() => {});
    const restSetting = context?.restSetting ?? 0;  // 휴식 간격 상태
    const setRestSetting = context?.setRestSetting ?? (() => {});  // 휴식 간격 상태를 설정하는 함수

    const handleWorkIonChange = (e: CustomEvent) => {
        const value = e.detail.value as unknown as number;
        console.log("IonInput Change:", value);
        setMinutesSetting(value);
    };

    const handleRestIonChange = (e: CustomEvent) => {
        const value = e.detail.value as unknown as number;
        setRestSetting(value);
    };

    return (
        <IonContent className="ion-padding">
            <IonGrid>
                <IonRow>
                    <IonCol className="ion-text-center">
                        <IonItem>
                            <IonInput
                                label="집중 시간"
                                type="number"
                                value={minutesSetting}
                                placeholder="분"
                                onIonChange={handleWorkIonChange}
                            >
                            </IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                label="휴식 시간"
                                type="number"
                                value={restSetting}
                                placeholder="분"
                                onIonChange={handleRestIonChange}
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    );
};

export default SettingsContainer;
