import React, { Component } from "react";
import axios from "axios";

export default class SnapEdit extends Component {
  state = {
    user: "",
    title: "",
    description: "",
    location: "",
    category: "",
    img: ""
  };

  componentDidMount() {
    axios
      .get(`/snaps/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          user: response.data.user,
          title: response.data.title,
          description: response.data.description,
          location: response.data.location,
          category: response.data.category,
          img: response.data.image
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

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.props);
    console.log("updating snap");
    axios
      .patch(`/snaps/${this.props.match.params.id}`, this.state)
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err.message));
    this.props.history.push(`/snaps/${this.props.match.params.id}`);
  };

  assignCategory = event => {
    event.preventDefault();
    this.setState({
      category: event.target.value
    });
  };

  render() {
    return (
      <div className="container">
        {this.props.user._id === this.state.user ? (
          <React.Fragment>
            <h3>Edit your Snap</h3>

            <img
              src={this.state.img}
              alt={this.state.title}
              style={{ height: "40vh" }}
            />
            <p>
              <i>You cannot edit the picture once it was posted.</i>
            </p>
            <div className="page detail-page">
              <form>
                <label htmlFor="title">Snap title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="description"> Short description</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
                <label htmlFor="location"> Location </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={this.state.location}
                  onChange={this.handleChange}
                />
                <p>Current Category: {this.state.category}</p>
                <button onClick={this.assignCategory} value="free">
                  FREE
                </button>
                <button onClick={this.assignCategory} value="promo">
                  PROMO
                </button>
                <button onClick={this.assignCategory} value="crowd">
                  CROWD
                </button>
                <button onClick={this.assignCategory} value="happening">
                  HAPPENING
                </button>

                <br />
                <button onClick={this.handleSubmit}>Save Changes</button>
              </form>
            </div>
          </React.Fragment>
        ) : (
          <p>You need to be the owner of the snap to edit it</p>
        )}
      </div>
    );
  }
}
