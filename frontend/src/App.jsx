import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Login, Signup, Properties, Property, About, Contact } from "./pages";
import { Nav, Footer } from "./components";

function App() {
  return (
    <Router>
      <main className="flex flex-col">
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<Property />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
