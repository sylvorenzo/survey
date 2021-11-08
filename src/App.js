import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Questions from './screens/questions';
import HomeScreen from './screens/home';
import Statistics from './screens/results';
function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<HomeScreen/>}/>
      <Route path="/survey" element={<Questions/>}/>
      <Route path="/results" element={<Statistics/>}/>
        
    </Routes>
    </div>

  );
}

export default App;
