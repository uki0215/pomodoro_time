import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import SettingsButton from './SettingButton';
import { useContext, useState, useEffect, useRef } from 'react';
import SettingsContext from './SettingsContext';

const red = '#f54e4e';
const green = '#4aec8c';

function Timer() {
 const settingsInfo = useContext(SettingsContext);

 const [isPaused, setIsPaused] = useState(false);
 const [mode, setMode] = useState('warning');
 const [secondsLeft, setSecondsLeft] = useState(0);

 const secondLeftRef = useRef(secondsLeft);
 const isPauseRef = useRef(isPaused);
 const modeRef = useRef(mode);

 function tick() {
  secondLeftRef.current--;
  setSecondsLeft(secondLeftRef.current);
 }
 useEffect(() => {
  function switchMode() {
   const nextMode = modeRef.current === 'warning' ? 'alert ' : 'warning';
   const nextSeconds = (nextMode === 'warning' ? settingsInfo.warningMinutes : settingsInfo.alertMinutes) * 60;

   setMode(nextMode);
   modeRef.current = nextMode;

   setSecondsLeft(nextSeconds);
   secondLeftRef.current = nextSeconds;
  }

  secondLeftRef.current = settingsInfo.warningMinutes * 60;
  setSecondsLeft(secondLeftRef.current);

  const interval = setInterval(() => {
   if (isPauseRef.current) {
    return;
   }
   if (secondLeftRef.current === 0) {
    return switchMode();
   }
   tick();
  }, 1000);

  return () => clearInterval(interval);
 }, [settingsInfo]);

 const totalSeconds = mode === 'warning'
  ? settingsInfo.warningMinutes * 60
  : settingsInfo.alertMinutes * 60;
 const percentage = Math.round(secondsLeft / totalSeconds * 100);

 const minutes = Math.floor(secondsLeft / 60);
 let seconds = secondsLeft % 60;
 if (seconds < 10) seconds = '0' + seconds;

 return (
  <div>
   <CircularProgressbar
    value={percentage}
    text={minutes + ':' + seconds}
    styles={buildStyles({
     textColor: '#fff',
     pathColor: mode === 'warning' ? green : red,
     tailColor: 'rgba(255,255,255,.2)',
    })} />
   <div style={{ marginTop: '20px' }}>
    {isPaused
     ? <PlayButton onClick={() => { setIsPaused(false); isPauseRef.current = false; }} />
     : <PauseButton onClick={() => { setIsPaused(true); isPauseRef.current = true; }} />
    }
   </div>
   <div style={{ marginTop: '20px' }}>
    <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
   </div>
  </div>
 );
}

export default Timer;