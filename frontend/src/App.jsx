import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Login, Signup, Properties, Property } from './pages';
import { Nav, Footer } from './components';

function App() {
  return (
    <Router>
      <main className="relative">
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home/>} /> 
          <Route path="/register" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/properties" element={<Properties/>} />
          <Route path="/properties/:id" element={<Property/>} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;