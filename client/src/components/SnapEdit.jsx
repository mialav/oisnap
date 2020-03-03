import React, { Component } from "react";
import axios from "axios";
import Geocode from "react-geocode";
import categoryColor from "../styles/snapStyles";
Geocode.setApiKey("AIzaSyBh2aAsK418Q4BEEbtSafeh353MvH-EjsQ");

export default class SnapEdit extends Component {
  state = {
    user: "",
    title: "",
    description: "",
    location: "",
    category: "",
    img: "",
    creationDate: ""
  };

  componentDidMount() {
    axios
      .get(`/snaps/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          user: response.data.user,
          title: response.data.title,
          description: response.data.description,
          category: response.data.category,
          img: response.data.image,
          creationDate: response.created_at
        });
        Geocode.fromLatLng(
          response.data.location.lat,
          response.data.location.lng
        )
          .then(response => {
            const address = response.results[0].formatted_address;
            this.setState({ location: address });
          })
          .catch(err => console.log(err));
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

    Geocode.fromAddress(this.state.location)
      .then(response => {
        axios
          .patch(`/snaps/${this.props.match.params.id}`, {
            ...this.state,
            location: response.results[0].geometry.location
          })
          .then(response => {
            console.log(response);
          })
          .catch(err => console.log(err.message));
      })
      .catch(err => console.log(err));

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
      <div
        className="container"
        state={categoryColor(this.state.category, this.state.creationDate)}
      >
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
            {/* className="page detail-page" */}
            <div>
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
