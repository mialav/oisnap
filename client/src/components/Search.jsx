import React, { Component } from "react";

class Search extends Component {
  state = {
    search: ""
  };

  render() {
    return (
      <div className="container">
        <div>
          {/* form */}
          <label htmlFor="search">Search location:</label>
          <input type="text" />
          <button>Go</button>
        </div>
      </div>
    );
  }
}

export default Search;
