import './App.scss';
import {useEffect, useState} from 'react'
import {IoIosArrowDropup,IoIosArrowDropdown, IoIosPlay, IoIosPause, IoIosRefresh} from 'react-icons/io';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerMinutes, setTimerMinutes] = useState(sessionLength);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true); // Track if the current period is a session
  const [display, setDisplay] = useState(true); 
  const [coloredTheme, setColoredTheme] = useState(false);
  const appMethods = {
    setIncrementBreakLength: () => {
      if (breakLength === 60) {
        return;
      } else {
        setBreakLength(breakLength + 1);
      }
    },
    setDecrementBreakLength: () => {
      if (breakLength === 1) {
        return;
      } else {
        setBreakLength(breakLength - 1);
      }
    },
    setIncrementSessionLength: () => {
      if (sessionLength === 60) {
        return;
      } else {
        const sessionLengthIncUpdate = sessionLength + 1;

        setSessionLength(sessionLengthIncUpdate);
        setTimerMinutes(sessionLengthIncUpdate);
        setTimerSeconds(0);
      }
    },
    setDecrementSessionLength: () => {
      if (sessionLength === 1) {
        return;
      } else {
        const sessionLengthDecUpdate = sessionLength - 1;
        setSessionLength(sessionLengthDecUpdate);
        setTimerMinutes(sessionLengthDecUpdate);
        setTimerSeconds(0);
      }
    },
    startTimer: () => {
      setIsRunning(true);
    },
    stopTimer: () => {
      setIsRunning(false);
    },
    refreshTimer: () => {
      setBreakLength(5);
      setSessionLength(25);
      setDisplay(true);
      setIsRunning(false);
      setTimerMinutes(25);
      setTimerSeconds(0);
      if (coloredTheme === true) {
        const updatedColoredTheme = coloredTheme;
        setColoredTheme(!updatedColoredTheme);
      }; 
    }
  };
   useEffect(() => {
     let intervalId;
     if (isRunning) {
       intervalId = setInterval(() => {
         if (timerSeconds > 0) {
           setTimerSeconds(timerSeconds - 1);
         } else if (timerMinutes > 0) {
           setTimerMinutes(timerMinutes - 1);
           setTimerSeconds(59);
           
         } else {
         
           setIsRunning(true);
           if (isSession) {
             setIsSession(false);
             // Cambiar a break
             setTimerMinutes(breakLength);
             setDisplay(false)
           } else {
             setIsSession(true); // Cambiar a session
             setDisplay(true); // Cambiar a Session
             appMethods.refreshTimer()
             
            
           }           
         }
          if (timerMinutes === 0 && timerSeconds <= 60) {
            setColoredTheme(true);
          } else {
            setColoredTheme(false);
          }
       }, 1000);
     } else {
       clearInterval(intervalId);
     }
     return () => clearInterval(intervalId);
   }, [isRunning, timerMinutes, timerSeconds, isSession, breakLength, sessionLength,appMethods]);
 

  

  return (
    <div className="App">
      <header className="App-header">
        <div className="Main__title">25 + 5 Clock</div>
        <div className="Break__container">
          <div className="Break__length">
            <h1 id="break-label">
              Break Length <br />
            </h1>
            <div id="break-length">{breakLength}</div>

            <div id="break-decrement" onClick={appMethods.setDecrementBreakLength}>
              <IoIosArrowDropdown />
            </div>
            <div id="break-increment" onClick={appMethods.setIncrementBreakLength}>
              <IoIosArrowDropup />
            </div>
          </div>
          <div className="Session__length">
            <h1 id="session-label">
              Session length
              <br />
            </h1>
            <div id="session-length"> {sessionLength}</div>

            <div id="session-decrement" onClick={appMethods.setDecrementSessionLength}>
              <IoIosArrowDropdown />
            </div>
            <div id="session-increment" onClick={appMethods.setIncrementSessionLength}>
              <IoIosArrowDropup />
            </div>
          </div>
        </div>
        <div className="timer__container">
          <div className="timer">
            <div className="timer__title" id="timer-label">
              {display ? 'Session' : 'Break'}
            </div>
            <div className={`timer__display  ${coloredTheme ? 'timer__colored' : ''}`} id="time-left">
              {`${timerMinutes.toString().padStart(2, '0')}:${timerSeconds.toString().padStart(2, '0')}`}
            </div>
          </div>
        </div>
        <div className="control__container">
          <div className="timer__control">
            <div className="control__box" id="start_stop">
              <IoIosPlay onClick={appMethods.startTimer} />

              <IoIosPause onClick={appMethods.stopTimer} />
            </div>
            <div className="control__box">
              <IoIosRefresh onClick={appMethods.refreshTimer} id="reset" />
            </div>
          </div>
          <div className="timer__author">
            Designed And Coded by <br/><a href="https://github.com/Gerardm65">Gerardo Moratinos </a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
