import './App.css'
import Map from './components/Map'

function App() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <h1 className="text-xl font-bold p-2">Hi</h1>
      <div className="flex-1">
        <Map />
      </div>
    </div>
  )
}

export default App;