import React, { Component } from "react";

class Filter extends Component {
  render() {
    return (
      <div className="filters">
        <div>
          <div>
            <input type="checkbox" id="" name="free-stuff" value="" />
            <label htmlFor="free-stuff"> FREE STUFF </label>
          </div>
          <div>
            <input type="checkbox" id="" name="happenings" value="" />
            <label htmlFor="happenings"> HAPPENINGS </label>
          </div>
          <div>
            <input type="checkbox" id="" name="crowds" value="" />
            <label htmlFor="crowds"> CROWDS </label>
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
