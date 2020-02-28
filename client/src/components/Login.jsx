import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    console.log("Submit was clicked");
    event.preventDefault();

    axios
      .post("/auth/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        this.props.setUser(response.data);
        this.props.history.push("/home");
      })
      .catch(err => {
        console.log(err.response.data.message);
        this.setState({
          message: err.response.data.message
        });
      });
  };

  render() {
    return (
      <div className="container">
        <div className="detail-page">
          <form>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              onChange={this.handleChange}
              value={this.state.username}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={this.handleChange}
              value={this.state.password}
            />

            <button type="submit" onClick={this.handleSubmit}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}