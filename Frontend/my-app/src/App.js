import React from 'react';
// Update import to use Routes instead of Switch
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Products from './components/Products'; 
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* Replace Switch with Routes */}
        <Routes>
          {/* Update Route syntax to use element prop */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
