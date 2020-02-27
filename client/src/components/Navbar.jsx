import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {
    dropdown: false
  };

  eventHandler = () => {
    this.setState({
      dropdown: !this.state.dropdown
    });
    console.log(this.state.dropdown);
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
        {this.state.dropdown && (
          <div className="dropdown">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Navbar;
