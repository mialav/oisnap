import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Profile extends Component {
  state = { snapData: [], score: null };

  getData = () => {
    axios
      .get(`/snaps?user=${this.props.user._id}`)
      .then(response => {
        console.log("response.score :", response.data.score);
        this.setState({
          snapData: response.data.snapList,
          score: response.data.score
        });
      })
      .catch(err => console.log(err));
  };
  componentDidMount = () => {
    if (!this.props.user) {
      this.props.history.push("/login");
    }
    this.getData();
  };

  handleSubmit = event => {
    event.preventDefault();

    if (event.target.getAttribute("name") === "edit") {
      this.props.history.push(
        `/snaps/${event.target.parentNode.parentNode.parentNode.getAttribute(
          "id"
        )}/edit`
      );
    } else if (event.target.getAttribute("name") === "delete") {
      axios
        .delete(
          `/snaps/${event.target.parentNode.parentNode.parentNode.getAttribute(
            "id"
          )}`
        )
        .then(response => {
          console.log(response);
          this.props.refresh();
          this.getData();
        })
        .catch(err => {});
    }
  };

  render() {
    return (
      <div className="container">
        <div className="container-header basic-header">
          <div className="user">
            <i
              name="user"
              className="fas fa-user-circle"
              style={{ color: "white" }}
            ></i>
            <h3 className="username"> {this.props.user.username}'s Profile</h3>
          </div>
          <p className="user-score">
            <i className="fas fa-star"></i> Snap score:{" "}
            <i>{this.state.score}</i>
          </p>
        </div>

        <h4>Your current snaps</h4>
        <div
          className="container-content profile-body"
          style={{ paddingTop: "0" }}
        >
          <div className="user-snaps">
            {this.state.snapData?.map(snap => {
              return (
                <div className="user-snap" id={snap._id} key={snap._id}>
                  <div className="snap-info">
                    <img
                      className="snap-img-preview"
                      src={snap.image}
                      alt={snap.title}
                    />

                    <Link className="snap-link" to={`/snaps/${snap._id}`}>
                      {snap.title}
                    </Link>
                  </div>
                  <div className="snap-edit">
                    <button onClick={this.handleSubmit}>
                      <i name="edit" className="fas fa-pen"></i>
                    </button>
                    <button onClick={this.handleSubmit}>
                      <i name="delete" className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              );
            })}
            {this.state.snapData.length === 0 && (
              <p>
                Nothing here yet... <br /> Time to{" "}
                <Link to="/add">post a snap!</Link>{" "}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
