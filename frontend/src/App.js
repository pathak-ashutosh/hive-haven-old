import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.js';
import Footer from './components/Footer/Footer.js';
import Register from './pages/Register/index.js';
import Login from './pages/Login/index.js';
import Main from './pages/Main/index.js';
import Properties from './pages/Properties/index.js';
import Property from './pages/Property/index.js';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Main/>} /> 
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/properties" element={<Properties/>} />
          <Route path="/properties/:id" element={<Property/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
