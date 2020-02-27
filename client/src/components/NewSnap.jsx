import React, { Component } from "react";

class NewSnap extends Component {
  state = {
    page: 1,
    category: null,
    message: "",
    location: "", //props
    title: "",
    description: "",
    emptyTitleError: ""
  };

  goNext = () => {
    if (this.state.category) {
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
    }

    //axios

    // this.props.history.push("/") // redirect
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

        {this.state.page === 1 && (
          <div className="page photo-page">
            <p>*****here goes picture upload*****</p>
            <button onClick={this.assignCategory} value="free stuff">
              FREE STUFF
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
            {this.state.title ? <p></p> : <p>can you please just..?</p>}
            {this.state.emptyTitleError && <p>{this.state.emptyTitleError}</p>}
          </div>
        )}
      </div>
    );
  }
}

export default NewSnap;
