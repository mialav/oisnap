import React, { Component } from "react";
import axios from "axios";
import Geocode from "react-geocode";
import categoryColor from "../styles/snapStyles";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);

export default class SnapEdit extends Component {
  state = {
    user: "",
    title: "",
    description: "",
    location: "",
    category: "",
    img: "",
    creationDate: "",
    address: ""
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
          creationDate: response.created_at,
          address: response.data.address,
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
            this.props.history.push(`/snaps/${this.props.match.params.id}`);
          })
          .catch(err => console.log(err.message));
      })
      .catch(err => console.log(err));
  };

  assignCategory = event => {
    event.preventDefault();
    this.setState({
      category: event.target.value
    });
  };

  updateLocation = event => {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(response => {
      let location = {
        lat: response.coords.latitude,
        lng: response.coords.longitude
      };

      Geocode.fromLatLng(location.lat, location.lng)
        .then(response => {
          this.setState({
            location: location,
            address: response.results[0].formatted_address
          });
        })
        .catch(err => console.log(err));
    });
  };

  render() {
    return (
      <div
        className="container"
        style={{
          backgroundColor: `${categoryColor(
            this.state.category,
            this.state.creationDate
          )}`
        }}
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

                <label htmlFor="address"> Location </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
                <button onClick={this.updateLocation}>Update Location</button>

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
