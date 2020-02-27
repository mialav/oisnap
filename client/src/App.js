import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WelcomePopup from "./components/WelcomePopup";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <WelcomePopup></WelcomePopup>
      <Footer></Footer>
    </div>
  );
}

export default App;
