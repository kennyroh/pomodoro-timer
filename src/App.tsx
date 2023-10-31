import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {cog, timerOutline} from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
// import {createContext, useState} from "react";
import {SettingsContext} from "./contexts/SettingsContext";
setupIonicReact();
//
// type SettingsContextType = {
//   minutesSetting: number;
//   setMinutesSetting: React.Dispatch<React.SetStateAction<number>>;
// };

// const initialSettingsContext: SettingsContextType = {
//   minutesSetting: 24,
//   setMinutesSetting: () => {},
// };

// export const SettingsContext = createContext<SettingsContextType>(initialSettingsContext);

const App: React.FC = () => {
  const [minutesSetting, setMinutesSetting] = useState(25);
  console.log("App:" + minutesSetting)
  const [restSetting, setRestSetting] = useState(5);

  return (
      <SettingsContext.Provider value={{minutesSetting, setMinutesSetting, restSetting, setRestSetting}}>
      <IonApp>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/tab1">
                  <Tab1 />
                </Route>
                <Route exact path="/tab2">
                  <Tab2 />
                </Route>
                <Route path="/tab3">
                  <Tab3 />
                </Route>
                <Route exact path="/">
                  <Redirect to="/tab1" />
                </Route>
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/tab1">
                  <IonIcon aria-hidden="true" icon={timerOutline} />
                  <IonLabel>타이머</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/tab2">
                  <IonIcon aria-hidden="true" icon={cog} />
                  <IonLabel>설정</IonLabel>
                </IonTabButton>
                {/*<IonTabButton tab="tab3" href="/tab3">*/}
                {/*  <IonIcon aria-hidden="true" icon={square} />*/}
                {/*  <IonLabel>Tab 3</IonLabel>*/}
                {/*</IonTabButton>*/}
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        </IonApp>
      </SettingsContext.Provider>
  );
};

export default App;
