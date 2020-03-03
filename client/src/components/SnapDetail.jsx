import React, { Component } from "react";
import axios from "axios";
import categoryColor from "../styles/snapStyles";

class SnapDetail extends Component {
  state = {
    snap: null,
    message: null
  };

  componentDidMount() {
    const snapId = this.props.match.params.id;

    axios
      .get(`/snaps/${snapId}`)
      .then(response => {
        this.setState({
          snap: response.data
        });
      })
      .catch(err => {
        this.setState({
          message: err
        });
      });
  }

  handleSubmit = event => {
    event.preventDefault();

    if (event.target.innerText === "Edit") {
      this.props.history.push(`/snaps/${this.props.match.params.id}/edit`);
    } else if (event.target.innerText === "Delete") {
      axios
        .delete(`/snaps/${this.props.match.params.id}`)
        .then(response => {
          console.log(response);
          this.props.history.push("/home");
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    const snap = this.state.snap;

    if (!snap) {
      return <div>LOADING</div>;
    } else {
      const hours = new Date(snap.created_at).getHours();
      const minutes = new Date(snap.created_at).getMinutes();
      let timeStamp;
      minutes < 10
        ? (timeStamp = hours + ":0" + minutes)
        : (timeStamp = hours + ":" + minutes);

      console.log(this.state.snap.category);
      console.log(categoryColor(this.state.snap));

      return (
        <div
          className="container"
          style={categoryColor(
            this.state.snap.category,
            this.state.snap.created_at
          )}
        >
          <div className="snap-box">
            <div className="time-box">
              <p>Created at {timeStamp}</p>
            </div>
            <div className="snap-img">
              <img
                src={snap.image}
                alt={snap.title}
                style={{ height: "40vh" }}
              />
            </div>
            <div className="details-box">
              <h2>{snap.title}</h2>
              {snap.description !== "" && <p>{snap.description}</p>}
              {this.props.user._id === snap.user && (
                <div>
                  <button onClick={this.handleSubmit}>Edit</button>
                  <button onClick={this.handleSubmit}>Delete</button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SnapDetail;
