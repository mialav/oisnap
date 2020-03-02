import React, { Component } from "react";
import axios from "axios";

class NewSnap extends Component {
  state = {
    page: 1,
    category: null,
    message: "",
    location: "", //props
    title: "",
    description: "",
    emptyError: "",
    loading: false,
    image: null
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
    if (this.state.title === "") {
      this.setState({
        emptyTitleError: "PLEEEEEEASE"
      });
    } else {
      //axios
      axios
        .post("/snaps/", {
          title: this.state.title,
          description: this.state.description,
          category: this.state.category,
          location: this.state.location,
          image: this.state.image
        })
        .then(response => {
          console.log("Snap was sent!");
          console.log(response);
          this.props.refresh();
          this.props.history.push(`/snaps/${response.data._id}`);
        })
        .catch(err => {
          console.log(err);
          this.setState({
            emptyError: err
          });
        });
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
        console.log(responseData);
        this.setState({
          image: responseData.secure_url,
          loading: false
        });
      });
  };

  render() {
    return (
      <div className="container">
        <button onClick={this.goBack} className="page-button">
          {" "}
          BACK{" "}
        </button>
        <button onClick={this.goNext} className="page-button">
          {" "}
          NEXT{" "}
        </button>

        <p>Step {this.state.page} out of 2 </p>

        {/* ***PAGE 1 upload and category *** */}

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
            <button onClick={() => this.fileInput.click()}>Upload image</button>
            {this.state.loading ? (
              <h3>Loading </h3>
            ) : (
              <img
                src={this.state.image}
                style={{ height: "200px" }}
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

        {/* *************  PAGE 2 snap details************* */}

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
              <label htmlFor="location"> Location </label>
              <input
                type="text"
                name="location"
                id="location"
                value={this.state.location}
                onChange={this.handleChange}
              />
              <button type="submit"> Add to</button>
            </form>
            {this.state.title ? <p></p> : <p>can titile?</p>}
            {this.state.emptyError && <p>{this.state.emptyError}</p>}
          </div>
        )}
      </div>
    );
  }
}

export default NewSnap;
