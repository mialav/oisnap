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

    if (event.target.getAttribute("name") === "edit") {
      this.props.history.push(`/snaps/${this.props.match.params.id}/edit`);
    } else if (event.target.getAttribute("name") === "delete") {
      axios
        .delete(`/snaps/${this.props.match.params.id}`)
        .then(response => {
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
    } else if (minutes === 1) {
      return minutes + " minute ";
    } else {
      return minutes + " minutes ";
    }
  };

  render() {
    const snap = this.state.snap;

    if (!snap) {
      return <div>LOADING</div>;
    } else {
      return (
        <div className="container">
          <div
            className="time-box"
            style={{
              backgroundColor: categoryColor(
                this.state.snap.category,
                this.state.snap.created_at
              )
            }}
          >
            <p>Created {this.getTime(snap)} ago</p>
          </div>
          <div className="container-content ">
            <div className="snap-box">
              <div>
                <img className="snap-img" src={snap.image} alt={snap.title} />
              </div>
              <div className="details-box">
                <h2>{snap.title}</h2>
                {snap.description !== "" && <p>{snap.description}</p>}
                {this.props.user._id === snap.user && (
                  <div>
                    <button onClick={this.handleSubmit}>
                      <i name="edit" className="fas fa-pen"></i>
                    </button>
                    <button onClick={this.handleSubmit}>
                      <i name="delete" className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SnapDetail;
