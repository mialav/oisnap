import React, { Component } from "react";
import axios from "axios";

import Geocode from "react-geocode";
import categoryColor from "../styles/snapStyles";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);

class NewSnap extends Component {
  state = {
    page: 1,
    category: null,
    message: "",
    location: "",
    title: "",
    description: "",
    snapError: "",
    loading: false,
    image: null,
    address: ""
  };

  goNext = event => {
    if (this.state.category && this.state.image) {
      event.target.classList.add("hidden");
      document.getElementById("back-button").classList.remove("hidden");
      this.setState({
        page: 2,
        message: ""
      });
    } else {
      this.setState({
        message: "can you just..?"
      });
    }
  };

  componentDidMount = () => {
    if (!this.props.user) {
      this.props.history.push("/login");
    }

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

  goBack = event => {
    event.target.classList.add("hidden");
    document.getElementById("next-button").classList.remove("hidden");
    this.setState({
      page: 1
    });
  };

  assignCategory = event => {
    const category = event.target.value;
    const buttons = document.getElementsByClassName("category-button");

    for (let button of buttons) {
      button.classList.remove("selected-button");
    }

    event.target.classList.add("selected-button");

    this.setState({
      category: category
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.title === "" || !this.state.location) {
      this.setState({
        message: "PLEEEEEEASE"
      });
    } else {
      //axios

      Geocode.fromAddress(this.state.address)
        .then(response => {
          axios
            .post("/snaps/", {
              title: this.state.title,
              description: this.state.description,
              category: this.state.category,

              address: this.state.address,
              location: response.results[0].geometry.location,
              image: this.state.image
            })
            .then(response => {
              this.props.refresh();
              // call update data method from app.js
              this.props.history.push(`/snaps/${response.data._id}`);
            })
            .catch(err => {
              this.setState({
                emptyError: err.response.data.message
              });
            });
        })
        .catch(err => console.log(err));
    }
  };

  uploadImage = e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "oisnap");

    this.setState({
      loading: true
    });

    fetch("https://api.cloudinary.com/v1_1/oisnap/image/upload", {
      method: "POST",
      body: data
    })
      .then(res => {
        return res.json();
      })
      .then(responseData => {
        this.setState({
          image: responseData.secure_url,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          snapError: "Couldn't upload the image, please try again"
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div
            className="navigation-items"
            style={{ backgroundColor: categoryColor(this.state.category) }}
          >
            <div className="buttons">
              <button
                className="navigation-button hidden"
                id="back-button"
                onClick={this.goBack}
              >
                BACK
              </button>
              <button
                id="next-button"
                className="navigation-button"
                onClick={this.goNext}
              >
                NEXT
              </button>
            </div>
            <p className="step-count">
              <b> Step {this.state.page} out of 2</b>{" "}
            </p>
          </div>
          {/* /* ***PAGE 1 upload and category *** */}
          {this.state.page === 1 && (
            <div className="test">
              <div className="container-content page photo-page">
                <input
                  style={{ display: "none" }}
                  type="file"
                  name="file"
                  placeholder="Upload an image"
                  onChange={this.uploadImage}
                  ref={fileInput => (this.fileInput = fileInput)}
                />
                <button
                  className="upload-image"
                  onClick={() => this.fileInput.click()}
                >
                  <i className="fas fa-camera"></i>
                </button>
                {this.state.loading ? (
                  <h3>Loading </h3>
                ) : (
                  <img
                    className="uploaded-img"
                    src={this.state.image}
                    // style={{ height: "30vh" }}
                    alt={this.state.title}
                  />
                )}
                <button
                  className="button-visible category-button"
                  onClick={this.assignCategory}
                  value="free"
                >
                  FREE
                </button>
                <button
                  className="button-visible category-button"
                  onClick={this.assignCategory}
                  value="promo"
                >
                  PROMO
                </button>
                <button
                  className="button-visible category-button"
                  onClick={this.assignCategory}
                  value="crowd"
                >
                  CROWD
                </button>
                <button
                  className="button-visible category-button"
                  onClick={this.assignCategory}
                  value="happening"
                >
                  HAPPENING
                </button>
                {this.state.message && (
                  <p className="error-message">{this.state.message}</p>
                )}
              </div>
            </div>
          )}

          {/* /* *************  PAGE 2 snap details************* */}
          {this.state.page === 2 && (
            <div className="container-content">
              <div className="page detail-page snap-form">
                <form onSubmit={this.handleSubmit}>
                  <label htmlFor="title">Snap title *</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
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

                  <button
                    className="button-visible submit-button"
                    type="submit"
                  >
                    {" "}
                    Add to
                  </button>
                </form>

                {this.state.snapError && (
                  <p className="error-message">{this.state.snapError}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default NewSnap;
