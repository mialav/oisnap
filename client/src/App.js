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
import Signup from "./components/Signup";
import Login from "./components/Login";

class App extends React.Component {
  state = {
    user: this.props.user
  };

  setUser = userObj => {
    this.setState({ user: userObj });
  };

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Navbar user={this.state.user} setUser={this.setUser} />
        <div className="body-view">
          <Map />
          <Switch>
            <Route exact path="/search" component={Search} />
            <Route exact path="/filter" component={Filter} />
            <Route exact path="/add" component={NewSnap} />
            <Route
              exact
              path="/signup"
              render={props => (
                <Signup setUser={this.setUser} history={props.history} />
              )}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <Login setUser={this.setUser} history={props.history} />
              )}
            />
          </Switch>
        </div>
        <Switch>
          <Route exact path="/" component={WelcomePopup} />
          <Toolbar />
        </Switch>
      </div>
    );
  }
}

export default App;
