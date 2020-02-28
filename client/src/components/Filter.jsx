import React, { Component } from "react";

class Filter extends Component {
  render() {
    return (
      <div className="filters">
        <div>
          <div>
            <input type="checkbox" id="" name="free" value="" />
            <label htmlFor="free"> FREE </label>
          </div>
          <div>
            <input type="checkbox" id="" name="happening" value="" />
            <label htmlFor="happening"> HAPPENING </label>
          </div>
          <div>
            <input type="checkbox" id="" name="crowd" value="" />
            <label htmlFor="crowd"> CROWD </label>
          </div>
          <div>
            <input type="checkbox" id="" name="promo" value="" />
            <label htmlFor="promo"> PROMO </label>
          </div>
        </div>
        <div>
          <button>GO</button>
        </div>
      </div>
    );
  }
}

export default Filter;
