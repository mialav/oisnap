import React, { Component } from "react";

class Search extends Component {
  state = {
    search: ""
  };

  render() {
    return (
      <div className="container">
        <div>
          <label htmlFor="search">Search location:</label>
          <input type="text" />
        </div>
      </div>
    );
  }
}

export default Search;
