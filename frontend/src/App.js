import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import SpotList from './components/Spots/SpotList';
import SpotDetails from './components/Spots/SpotDetails';
import SpotForm from './components/Spots/SpotForm';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<SpotList />} />
          <Route path="/spots/:id" element={<SpotDetails />} />
          <Route path="/spots/new" element={<SpotForm />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;