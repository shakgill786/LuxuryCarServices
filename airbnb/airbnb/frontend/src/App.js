import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import SpotList from './components/Spots/SpotList';
import SpotDetails from './components/Spots/SpotDetails';
import UserDashboard from './components/UserDashboard/UserDashboard';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<SpotList />} />
        <Route path="/spots/:spotId" element={<SpotDetails />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;