import React, { Component } from "react";
import axios from "axios";

import Login from "./Login";
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

  goNext = () => {
    if (this.state.category && this.state.image) {
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
    console.log();
    navigator.geolocation.getCurrentPosition(response => {
      let location = {
        lat: response.coords.latitude,
        lng: response.coords.longitude
      };

      console.log(location);
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

  goBack = () => {
    this.setState({
      page: 1
    });
  };

  assignCategory = event => {
    const category = event.target.value;

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
          console.log(response);
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
              console.log("Snap was sent!");
              console.log(response);
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
        <div
          className="container"
          style={{ backgroundColor: categoryColor(this.state.category) }}
        >
          <button onClick={this.goBack} className="page-button">
            {" "}
            BACK{" "}
          </button>
          <button onClick={this.goNext} className="page-button">
            {" "}
            NEXT{" "}
          </button>

          <p>Step {this.state.page} out of 2 </p>

          {/* /* ***PAGE 1 upload and category *** */}
          {this.state.page === 1 && (
            <div className="page photo-page">
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                placeholder="Upload an image"
                onChange={this.uploadImage}
                ref={fileInput => (this.fileInput = fileInput)}
              />
              <button onClick={() => this.fileInput.click()}>
                Upload image
              </button>
              {this.state.loading ? (
                <h3>Loading </h3>
              ) : (
                <img
                  src={this.state.image}
                  style={{ height: "30vh" }}
                  alt={this.state.title}
                />
              )}

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
            </div>
          )}
          {this.state.message && <p>{this.state.message}</p>}

          {/* /* *************  PAGE 2 snap details************* */}

          {this.state.page === 2 && (
            <div className="page detail-page">
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
                <button type="submit"> Add to</button>
              </form>
              {this.state.title ? <p></p> : <p>can titile?</p>}
              {this.state.snapError && <p>{this.state.snapError}</p>}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default NewSnap;
