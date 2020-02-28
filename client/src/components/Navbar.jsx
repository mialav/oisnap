import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Navbar extends Component {
  state = {
    dropdown: false
    // user: ""
  };

  eventHandler = () => {
    this.setState({
      dropdown: !this.state.dropdown
    });
    this.setState({
      dropdown: !this.state.dropdown
    });
  };

  // componentDidMount() {
  //   this.setState({
  //     user: this.props.user
  //   });
  // }

  // componentDidUpdate() {
  //   this.setState({
  //     user: this.props.user
  //   });
  // }

  logout = () => {
    axios
      .get("/auth/logout")
      .then(response => {
        console.log(response);
        this.props.setUser(null);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <div className="navbar">
          <div>
            <Link to="/home">OiSnap!</Link>
          </div>
          <button onClick={this.eventHandler}>User</button>
        </div>
        {this.state.dropdown && !this.props.user && (
          <div className="dropdown">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
        {this.state.dropdown && this.props.user && (
          <div className="dropdown">
            <Link to="/profile">Profile</Link>
            <Link to="/home" onClick={this.logout}>
              Logout
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Navbar;
