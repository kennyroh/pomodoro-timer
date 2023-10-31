import React from 'react';  // React를 import
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import PomodoroTimer from '../components/PomodoroTimer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>타이머</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">타이머</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PomodoroTimer name="뽀모도로 타이머 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
