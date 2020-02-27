import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import WelcomePopup from "./components/WelcomePopup";
import { Route } from "react-router-dom";
import Map from "./components/Map";
import Toolbar from "./components/Toolbar";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Map />
      <Route exact path="/" component={WelcomePopup} />
      <Route exact path="/home" component={Toolbar} />
    </div>
  );
}

export default App;
