import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import WelcomePopup from "./components/WelcomePopup";
import Map from "./components/Map";
import Toolbar from "./components/Toolbar";
import Search from "./components/Search";
import Filter from "./components/Filter";
import NewSnap from "./components/NewSnap";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="body-view">
        <Map />
        <Switch>
          <Route exact path="/search" component={Search} />
          <Filter exact path="/filter" component={Filter} />
          <Route exact path="/add" component={NewSnap} />
        </Switch>
      </div>
      <Switch>
        <Route exact path="/" component={WelcomePopup} />
        <Toolbar />
      </Switch>
    </div>
  );
}

export default App;
