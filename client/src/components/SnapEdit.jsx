import React, { Component } from "react";
import axios from "axios";

export default class SnapEdit extends Component {
  state = {
    user: "",
    title: "",
    description: "",
    location: ""
  };

  componentDidMount() {
    const snapId = this.props.match.params.id;

    axios
      .get(`/snaps/${snapId}`)
      .then(response => {
        this.setState({
          user: response.data.user,
          title: response.data.title,
          description: response.data.description,
          location: response.data.location
        });
      })
      .catch(err => {
        this.setState({
          message: err
        });
      });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className="container">
        {this.props.user._id === this.state.user ? (
          <form>
            <label htmlFor="title">Snap title *</label>
            <input
              type="text"
              name="title"
              id="title"
              // defaultValue={this.state.title}
              value={this.state.title}
              onChange={this.handleChange}
            />
            <label htmlFor="description"> Short description</label>
            <input
              type="text"
              name="description"
              id="description"
              // defaultValue={this.state.description}
              value={this.state.description}
              onChange={this.handleChange}
            />
            <label htmlFor="location"> Location </label>
            <input
              type="text"
              name="location"
              id="location"
              // defaultValue={this.state.location}
              value={this.state.location}
              onChange={this.handleChange}
            />
          </form>
        ) : (
          <p>You need to be the owner of the snap to edit it</p>
        )}
      </div>
    );
  }
}
