import React, { Component } from "react";
import history from "../history";

class Filter extends Component {
  state = {
    filters: []
  };

  handleChange = event => {
    let index = this.state.filters.indexOf(event.target.value);
    if (index === -1) {
      this.setState({
        filters: [...this.state.filters, event.target.value]
      });
    } else {
      this.state.filters.splice(index, 1);
      this.setState({
        filters: this.state.filters
      });
    }
  };

  goToMap() {
    history.push("/home");
  }

  render() {
    return (
      <div className="filters">
        <div>
          <div>
            <input
              type="checkbox"
              id=""
              name="free"
              value="free"
              onChange={this.handleChange}
            />
            <label htmlFor="free"> FREE </label>
          </div>
          <div>
            <input
              type="checkbox"
              id=""
              name="happening"
              value="happening"
              onChange={this.handleChange}
            />
            <label htmlFor="happening"> HAPPENING </label>
          </div>
          <div>
            <input
              type="checkbox"
              id=""
              name="crowd"
              value="crowd"
              onChange={this.handleChange}
            />
            <label htmlFor="crowd"> CROWD </label>
          </div>
          <div>
            <input
              type="checkbox"
              id=""
              name="promo"
              value="promo"
              onChange={this.handleChange}
            />
            <label htmlFor="promo"> PROMO </label>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              this.goToMap();
              this.props.filterSnaps(this.state.filters);
            }}
          >
            GO
          </button>
        </div>
      </div>
    );
  }
}

export default Filter;
