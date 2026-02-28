import './App.css'
import Map from './components/Map'
import Timer from './components/Timer';
import { useEffect, useState } from 'react';

function App() {

  // useState creates a piece of state
  // useState(0) initialises the state (time) with a value of 0
  const[time, setTime] = useState(0);

  
  useEffect(() =>{
    // setInterval runs a function repeatedly.
    // first argument: function to run
    // second argument: delay in milliseconds
    const interval = setInterval(() => {


      // prev => prev + 1 means we use the latest state value.
      setTime(prev => prev + 1);
    }, 1000); // 1000 milliseconds = 1 second

    // cleanup (when no longer displayed on the screen)
    return () => clearInterval(interval);
  },[]); // empty dependency array = run once
 


  return (
    <>
    <div>
      <Timer time={time}/>
      <br/>
      <br/>
    </div>

    <div className="w-screen h-screen flex flex-col">
      <div className="flex-1">
        <Map />
      </div>
    </div>
    </>
  )
}

export default App;