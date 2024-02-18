import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main/Main.js';
import NavBar from './components/NavBar/NavBar.js';
import Footer from './components/Footer/Footer.js';
import SignUpPage from './Pages/SignUp/SignUp.js'; // Import SignUpPage component

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes> {/* Use Switch component to ensure only one route is matched */}
          <Route exact path="/" element={<Main/>} /> {/* Define route for Main component */}
          <Route path="/signup" element={<SignUpPage/>} /> {/* Define route for SignUpPage component */}
        </Routes>
        <div className="content">
          {/* Add your main content here */}
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
