import './App.css';
import { Meter } from './lib/components/Meter'

function App() {
  return (
    <div className="App">
      <Meter value={90/100}/>
    </div>
  );
}

export default App;
