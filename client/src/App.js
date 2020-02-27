import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import WelcomePopup from "./components/WelcomePopup";
import { Route, Switch } from "react-router-dom";
import Map from "./components/Map";
import Toolbar from "./components/Toolbar";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="body-view">
        <Map />
        <Route exact path="/search" component={Search} />
      </div>
      <Switch>
        <Route exact path="/" component={WelcomePopup} />
        <Toolbar />
      </Switch>
    </div>
  );
}

export default App;
