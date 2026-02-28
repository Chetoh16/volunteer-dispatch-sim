import { useEffect, useState } from 'react';
import './App.css'
import Map from './components/Map'
import Timer from './components/Timer';
import EndScreen from './components/EndScreen';
import type { CountryState } from './data/countries';
import StartScreen from './components/StartScreen';


const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"; // link to world map with names

function App() {

  
  // 5 min timer: 5x30
  const[time, setTime] = useState(300);

  const [countries, setCountries] = useState<CountryState[]>([]);

  const [gameStarted, setGameStarted] = useState(false);




  // --------- Timer ---------

  useEffect(() =>{
    if (!gameStarted) return; // only activate timer when game has started


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
  },[gameStarted]); // empty dependency array = run once, [gameStarted] run whenever gameStarted changes
 

   // ---------  Initialise countries ---------

  useEffect(() => {
        if (countries.length > 0) return; // already initialised

        fetch(geoUrl)
            .then(res => res.json())
            .then(worldData => {
            const geographies = worldData.objects.countries.geometries;
            const initialCountries: CountryState[] = geographies.map((geo: any) => ({
                name: geo.properties.name,
                iso: geo.id,
                status: "idle",
            }));
            setCountries(initialCountries);
            });
    }, [countries, setCountries]);

  // ---------  Random Opportunity Generator ---------

  useEffect(() => {
    if (countries.length === 0) return; // wait until countries are initialised

    const alertInterval = setInterval(() => {
      setCountries(prev => {
        const idleCountries = prev.filter(c => c.status === "idle");
        if (idleCountries.length === 0) return prev;

        // Pick random idle country
        const randomIndex = Math.floor(Math.random() * idleCountries.length);
        const chosen = idleCountries[randomIndex];

        // Return new countries array with that country set to 'alert'
        return prev.map(c =>
          c.iso === chosen.iso ? { ...c, status: "alert" } : c
        );
      });
    }, Math.random() * 15000 + 15000); // random between 15s-30s

    return () => clearInterval(alertInterval);

  }, [countries]);

  // ---------  Render ---------

  return (
    <>
    <div>
      <Timer time={time}/>
      <br/><br/>
    </div>

    <div className="w-screen h-screen flex flex-col">
      <div className="flex-1">
        <Map countries={countries} setCountries={setCountries} />
      </div>
    </div>

    {/* Render Start Screen */}
    {!gameStarted && <StartScreen onStart={() => setGameStarted(true)} />}

    {/* Check if time hit 0, (in the future check if no opportunities left as well) */}
    {/* Render End Screen */}
    {time === 0 && <EndScreen time={time} />}
    </>
  )
}

export default App;