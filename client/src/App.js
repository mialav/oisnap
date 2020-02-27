import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WelcomePopup from "./components/WelcomePopup";
import Map from "./components/Map.jsx";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="content-wrapper">
        <WelcomePopup></WelcomePopup>
        <Map />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
