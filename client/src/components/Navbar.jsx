import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../images/3a.png";

class Navbar extends Component {
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
      <React.Fragment>
        <div className="navbar">
          <div>
            <Link to="/home">
              <img className="logo" src={logo} />
            </Link>
          </div>
          <button id="user">User</button>
        </div>
        {this.props.dropdown && !this.props.user && (
          <div className="dropdown" onClick={this.setDropdown}>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
        {this.props.dropdown && this.props.user && (
          <div className="dropdown" onClick={this.props.setDropdown}>
            <Link to="/profile">Profile</Link>
            <Link to="/home" onClick={this.logout}>
              Logout
            </Link>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Navbar;
