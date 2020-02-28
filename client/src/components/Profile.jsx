import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Profile extends Component {
  state = { snapData: [] };

  getData = () => {
    axios
      .get(`/snaps?user=${this.props.user._id}`)
      .then(response => {
        console.log(response);
        this.setState({ snapData: response.data });
      })
      .catch(err => console.log(err));
  };
  componentDidMount = () => {
    if (!this.props.user) {
      this.props.history.push("/login");
    }
    this.getData();
  };

  render() {
    return (
      <div className="container">
        <h3>Your Profile</h3>
        {this.state.snapData.map(snap => {
          return (
            <div key={snap._id}>
              <Link to={`/snap/${snap._id}`}>{snap.title}</Link>
            </div>
          );
        })}
      </div>
    );
  }
}
