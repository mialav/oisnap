import React, { Component } from "react";
import { Link } from "react-router-dom";

class Toolbar extends Component {
  state = {
    snaps: this.props.snapsdata
  };
  render() {
    console.log("Snaps in toolbar: ", this.props.snapsdata);
    return (
      <div className="toolbar">
        <Link to="/filter" snapsdata={this.state.snaps}>
          Filter
        </Link>
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
