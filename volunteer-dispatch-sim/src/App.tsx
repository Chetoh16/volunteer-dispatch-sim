import { useEffect, useState } from 'react';
import './App.css'
import Map from './components/Map'
import Timer from './components/Timer';
import EndScreen from './components/EndScreen';


function App() {

  // useState creates a piece of state
  // 5 min timer: 5x30
  const[time, setTime] = useState(10);

  
  useEffect(() =>{
    // setInterval runs a function repeatedly.
    // first argument: function to run
    // second argument: delay in milliseconds
    const interval = setInterval(() => {

      setTime(prev => {
        if(prev>0){
          return prev-1; // stop timer when reaching 0
        }
        else{
          clearInterval(interval); // stop timer when reaching 0
          return 0;
        }
      });
    }, 1000); // 1000 milliseconds = 1 second

    // cleanup (when no longer displayed on the screen)
    return () => clearInterval(interval);
  },[]); // empty dependency array = run once
 


  return (
    <>
    <div>
      <Timer time={time}/>
      <br/><br/>
    </div>

    <div className="w-screen h-screen flex flex-col">
      <div className="flex-1">
        <Map />
      </div>
    </div>

    {/* Check if time hit 0, (in the future check if no opportunities left as well) */}
    {time === 0 && <EndScreen time={time} />}
    </>
  )
}

export default App;