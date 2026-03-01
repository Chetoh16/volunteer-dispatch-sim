import { useEffect, useState } from 'react';
import './App.css'
import Map from './components/Map'
import Timer from './components/Timer';
import EndScreen from './components/EndScreen';
import type { CountryState } from './data/countries';
import StartScreen from './components/StartScreen';
import { calculateScore } from './data/score';
import { opportunities, type Opportunity } from './data/opportunities';
import OpportunityCard from './components/OpportunityCard';
import VolunteerDashboard from './components/VolunteerDashboard';


const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"; // link to world map with names

function App() {

  
  // 5 min timer: 5x30
  const[time, setTime] = useState(300);

  const [countries, setCountries] = useState<CountryState[]>([]);

  const [activeOpportunity, setActiveOpportunity] = useState<Opportunity | null>(null);

  const [gameStarted, setGameStarted] = useState(false);

  const [gameEnded, setGameEnded] = useState(false);

  const [isSelectingVolunteer, setIsSelectingVolunteer] = useState(false);

  const [selectedVolunteerId, setSelectedVolunteerId] = useState<number | null>(null);

  const [assignments, setAssignments] = useState<
    { opportunityId: number; volunteerId: number; volunteerName: string }[]
  >([]);

  // Score initialised to 0
  const [score, setScore] = useState(0);


  const handleAssignVolunteer = (volunteerId: number, volunteerName: string) => {
    if (!activeOpportunity) return;

    setAssignments(prev => [
      ...prev,
      {
        opportunityId: activeOpportunity.id,
        volunteerId,
        volunteerName: `Volunteer #${volunteerName}`, // temp until we pass real name
      }
    ]);

    setCountries(prev =>
      prev.map(c =>
        c.iso === activeOpportunity.countryIso
          ? { ...c, status: "active" }
          : c
      )
    );

    setIsSelectingVolunteer(false);
    setSelectedVolunteerId(null);
  };


  const handleCountryClicks = (iso: string) => {
    const opportunity = opportunities.find(o => o.countryIso === iso);
    
    if(!opportunity) return;

    setActiveOpportunity(opportunity);

    // Mark country as active -- HOWEVER ONLY MARK AS ACTIVE AFTER ASSIGNING VOLUNTEER
    // 
    // setCountries(prev =>
    //   prev.map(c =>
    //      IF VOLUNTEERASSIGNED === TRUE
    //     c.iso === iso ? { ...c, status: "active" } : c
    //   )
    // );
  }


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
          setGameEnded(true);
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
    if (!gameStarted) return; // only activate timer when game has started
    if (gameEnded) return;    // only activate timer when game is not over

    if (countries.length === 0) return; // wait until countries are initialised

    const alertInterval = setInterval(() => {
      setCountries(prev => {

        // Get all country ISO codes that have opportunities
        const opportunityIsos = new Set(opportunities.map(o => o.countryIso));

        // Only allow countries that:
        // 1. Are idle
        // 2. Have at least one opportunity
        const validIdleCountries = prev.filter(
          c => c.status === "idle" && opportunityIsos.has(c.iso)
        );

        if (validIdleCountries.length === 0) return prev;

        // Pick random idle country
        const randomIndex = Math.floor(Math.random() * validIdleCountries.length);
        const chosen = validIdleCountries[randomIndex];

        // Return new countries array with that country set to 'alert'
        return prev.map(c =>
          c.iso === chosen.iso ? { ...c, status: "alert" } : c
        );
      });
    }, Math.random() * 5000 + 5000); // random between 15s-30s

    return () => clearInterval(alertInterval);

  }, [countries, gameStarted]);

  // ---------  Render ---------

  return (
    <>
    <div>
      <Timer time={time}/>
      <br/><br/>
    </div>

    <div className="w-screen h-screen flex flex-col overflow-hidden">

      {/* Map */}
      <div className="flex-1 relative">
        <Map
          countries={countries}
          setCountries={setCountries}
          onCountryClick={handleCountryClicks}
        />
      </div>

      {/* Opportunity Panel */}
      {activeOpportunity && (
        <div className="opportunity-panel">
          <OpportunityCard
            {...activeOpportunity}
            onClose={() => {
              setIsSelectingVolunteer(false);
              setSelectedVolunteerId(null);
              setActiveOpportunity(null);
            }}
            onStartSelecting={() => setIsSelectingVolunteer(true)}
            assignedVolunteerName={
              assignments.find(a => a.opportunityId === activeOpportunity.id)?.volunteerName
            }
          />
        </div>
      )}

      {/* Dashboard */}
      <div className="h-[200px] border-t border-black/40 relative z-[100]">
        <VolunteerDashboard
          time={time}
          isSelecting={isSelectingVolunteer}
          selectedVolunteerId={selectedVolunteerId}
          onSelectVolunteer={(id) => setSelectedVolunteerId(id)}
          onAssignVolunteer={handleAssignVolunteer}
        />
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
