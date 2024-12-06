import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import SpotsList from './components/Spots/SpotsList';
import SpotDetails from './components/Spots/SpotDetails';
import SpotForm from './components/Spots/SpotForm';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<SpotsList />} />
          <Route path="/spots/new" element={<SpotForm />} />
          <Route path="/spots/:spotId" element={<SpotDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;