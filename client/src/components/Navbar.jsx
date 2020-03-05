import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../images/3a.png";

class Navbar extends Component {
<<<<<<< HEAD
  state = {
    dropdown: this.props.dropdown
    // user: ""
  };

  eventHandler = () => {
    this.props.setDropdown();
    //   this.setState({
    //     dropdown: !this.state.dropdown
    //   });
    //   this.setState({
    //     dropdown: !this.state.dropdown
    //   });
    // };
    // componentDidMount() {
    //   this.setState({
    //     user: this.props.user
    //   });
  };

  // componentDidUpdate() {
  //   this.setState({
  //     user: this.props.user
  //   });
  // }

=======
>>>>>>> 1fcc7bd2158179cf5009a0debd1610d8aa0ae082
  logout = () => {
    axios
      .get("/auth/logout")
      .then(response => {
        this.props.setUser(null);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <div className="navbar">
          <Link className="navbarHome" to="/home">
            <img className="logo" src={logo} alt="OiSnap-logo" />
          </Link>

          <button>
            <i name="user" className="fas fa-user"></i>
          </button>

          {this.props.dropdown && !this.props.user && (
            <div className="dropdown">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
          {this.props.dropdown && this.props.user && (
            <div className="dropdown">
              <Link to="/profile">Profile</Link>
              <Link to="/home" onClick={this.logout}>
                Logout
              </Link>
            </div>
          )}
        </div>
<<<<<<< HEAD
        {this.props.dropdown && !this.props.user && (
          <div className="dropdown">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
        {this.props.dropdown && this.props.user && (
          <div className="dropdown">
            <Link to="/profile">Profile</Link>
            <Link to="/home" onClick={this.logout}>
              Logout
            </Link>
          </div>
        )}
=======
>>>>>>> 1fcc7bd2158179cf5009a0debd1610d8aa0ae082
      </React.Fragment>
    );
  }
}

export default Navbar;
