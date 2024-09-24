import ReactSlider from 'react-slider';
import './slider.css';
import SettingsContext from './SettingsContext';
import { useContext } from 'react';
import BackButton from './BackButton';

function Settings() {
 const settingsInfo = useContext(SettingsContext);
 return (
  <div style={{ textAlign: 'left' }}>
   <label>Default minutes:{settingsInfo.warningMinutes}:00</label>
   <ReactSlider
    className={'slider green'}
    thumbClassName={'thumb'}
    trackClassName={'track'}
    value={settingsInfo.warningMinutes}
    onChange={newValue => settingsInfo.setWarningMinutes(newValue)}
    min={1}
    max={120}
   />
   <label>alert minutes:{settingsInfo.alertMinutes}:00</label>
   <ReactSlider
    className={'slider red'}
    thumbClassName={'thumb'}
    trackClassName={'track'}
    value={settingsInfo.alertMinutes}
    onChange={newValue => settingsInfo.setAlertMinutes(newValue)}
    min={1}
    max={120}
   />
   <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
   </div>
  </div >
 );
}
export default Settings;