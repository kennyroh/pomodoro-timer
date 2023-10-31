import React from 'react';  // React를 import
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import SettingsContainer from "../components/SettingsContainer";

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>설정</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">설정</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SettingsContainer name="설정 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
