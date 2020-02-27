import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import WelcomePopup from "./components/WelcomePopup";
import { Route } from "react-router-dom";
import Map from "./components/Map";
import Map from "./components/Map.jsx";


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>

      <div className="map-wrapper">
        <Map />
        <Route exact path="/" component={WelcomePopup} />
      </div>
    </div>
  );
}

export default App;
