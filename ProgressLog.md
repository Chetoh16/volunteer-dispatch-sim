1) Come up with Idea -> initial wireframe

2) We chose React for its ease of use and available frameworks & tools for visualisation (Rather than java). 

3) Requirements

- Map
- A list of volunteers
- Timer 
- A list of opportunities
- Every x second a country flashes red
- Player has to click on the opportunity, 
read the description, assing a volunteer that fits best
- Score system


4) Task Allocation
- Andzhelina: Opportunities
- Ege: Map + data. Game loop/logic.
- Tudor: Volunteers


- Implemented map and tooltip for map.
- Taking map init from map.tsx to app as app will handle gamelogic and loop and alerts
- App generates random opportunities every 15-30 seconds.

- Change Dashboard to Volunteer Dashboard


TO DO
- levels correspond to difficulty -> base point bonus
- Punish sending high level volunteers to low difficulty opportunities
- sfx & looping music
- volunteerdashboard hover / toggle
- 50+ age? -> take longer + more points
- remove fixed volunteer
- Change experience : 6 to experience 6 years
- DO NOT SHOW VOLUNTEERS AT START OF GAME
- RESET VOLUNTEER