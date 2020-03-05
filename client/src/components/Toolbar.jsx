import React, { Component } from "react";
import { Link } from "react-router-dom";

class Toolbar extends Component {
  render() {
    return (
      <div className="toolbar">
        <Link to="/filter">Filter</Link>
        <Link to="/add">
          <div className="addSnap">
            <i className="fas fa-camera"></i>
          </div>
        </Link>

        {/* <Link to="/search" >
          Search
        </Link> */}
      </div>
    );
  }
}

export default Toolbar;
