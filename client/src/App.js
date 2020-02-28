import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import WelcomePopup from "./components/WelcomePopup";
import Map from "./components/Map";
import Toolbar from "./components/Toolbar";
import Search from "./components/Search";
import Filter from "./components/Filter";
import NewSnap from "./components/NewSnap";
import Signup from "./components/Signup";
import Login from "./components/Login";
<<<<<<< HEAD
import Profile from "./components/Profile";
=======
import SnapDetail from "./components/SnapDetail";
>>>>>>> 3dcf20317762d493c2f3fd3b9f4a3ed0930cfd48

class App extends React.Component {
  state = {
    user: this.props.user,
    data: []
  };

  setUser = userObj => {
    this.setState({ user: userObj });
  };

  getData = () => {
    axios
      .get("/snaps")
      .then(response => {
        this.setState({
          data: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} setUser={this.setUser} />
        <div className="body-view">
          <Map />
          <Switch>
            <Route exact path="/search" component={Search} />
            <Route exact path="/filter" component={Filter} />
            <Route
              exact
              path="/add"
              render={props => <NewSnap refresh={this.getData} />}
            />
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
            <Route
              exact
<<<<<<< HEAD
              path="/profile"
              render={props => (
                <Profile user={this.state.user} history={props.history} />
              )}
=======
              path="/snaps/:id"
              render={props => <SnapDetail {...props} user={this.state.user} />}
>>>>>>> 3dcf20317762d493c2f3fd3b9f4a3ed0930cfd48
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
