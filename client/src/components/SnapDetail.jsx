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
          this.props.refresh();
          this.props.history.push("/home");
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  getTime = snap => {
    const currentTime = new Date();
    const snapTime = new Date(snap.created_at);

    let timeDiff = currentTime.getTime() - snapTime.getTime();

    let hours = parseInt(timeDiff / (1000 * 3600));
    let minutes = parseInt(timeDiff / (1000 * 60));

    if (hours > 1) {
      return hours + " hours ";
    } else if (hours === 1) {
      return hours + " hour ";
    } else if (minutes > 1) {
      return minutes + " minutes ";
    } else {
      return minutes + " minute ";
    }
  };

  render() {
    const snap = this.state.snap;

    if (!snap) {
      return <div>LOADING</div>;
    } else {
      console.log(this.state.snap.category);
      console.log(categoryColor(this.state.snap));

      return (
        <div
          className="container"
          style={{
            backgroundColor: categoryColor(
              this.state.snap.category,
              this.state.snap.created_at
            )
          }}
        >
          <div className="snap-box">
            <div className="time-box">
              <p>Created {this.getTime(snap)} ago</p>
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
