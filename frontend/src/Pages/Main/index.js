import React from "react";
import "./styles.css"; // Import the CSS file for Main component
import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="main-container"> 
      <header>
        <h1>One stop Accommodation solution for all students</h1>
        <p>Find the best accommodation for your needs</p>
      </header>
      <div>
        <Link to="/rentalproperty">
          <button>Accommodation</button>
        </Link>
        <Link to="/">
          <button>Students</button>
        </Link>
      </div>
    </div>
  );
}

export default Main;
