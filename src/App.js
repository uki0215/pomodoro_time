import './App.css';
import Settings from './Settings';
import Timer from './Timer';
import { useState } from 'react';
import SettingsContext from './SettingsContext';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [warningMinutes, setWarningMinutes] = useState(15);
  const [alertMinutes, setAlertMinutes] = useState(2);

  return (
    <main>
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        warningMinutes,
        alertMinutes,
        setWarningMinutes,
        setAlertMinutes
      }}>
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </main >
  );
}

export default App;
