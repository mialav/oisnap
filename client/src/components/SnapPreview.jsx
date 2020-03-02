import React, { Component } from "react";
import axios from "axios";

class SnapPreview extends Component {
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

  render() {
    const snap = this.state.snap;
    console.log("snap", snap);

    if (!snap) {
      return <div>LOADING</div>;
    }

    return (
      <div className="preview">
        <div className="snap-box">
          <div className="time-box">
            <p>Created at {snap.created_at}</p>
          </div>
          <div className="snap-img">
            <img
              src={snap.image}
              alt={snap.title}
              style={{ height: "150px" }}
            />
          </div>
          <div className="details-box">
            <h2>{snap.title}</h2>
            {this.props.user._id === snap.user && (
              <div>
                <button>EDIT</button>
                <button>REMOVE</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SnapPreview;
