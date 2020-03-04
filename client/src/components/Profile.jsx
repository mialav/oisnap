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

    if (event.target.innerText === "Edit") {
      this.props.history.push(
        `/snaps/${event.target.parentNode.getAttribute("id")}/edit`
      );
    } else if (event.target.innerText === "Delete") {
      axios
        .delete(`/snaps/${event.target.parentNode.getAttribute("id")}`)
        .then(response => {
          this.getData();
        })
        .catch(err => {});
    }
  };

  render() {
    return (
      <div className="container">
        <h3>{this.props.user.username}'s Profile</h3>
        <p>
          Snap score: <i>{this.state.score}</i>
        </p>
        <h4>Your current snaps</h4>
        <div className="user-snaps">
          {this.state.snapData?.map(snap => {
            return (
              <div id={snap._id} key={snap._id}>
                <img src={snap.image} alt={snap.title} />
                <Link to={`/snaps/${snap._id}`}>{snap.title}</Link>
                <button onClick={this.handleSubmit}>Edit</button>
                <button onClick={this.handleSubmit}>Delete</button>
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
    );
  }
}
