import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import categoryColor from "../styles/snapStyles";

class SnapPreview extends Component {
  state = {
    snap: null,
    message: null
  };

  componentDidMount() {
    const snapId = this.props.id;

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
    } else {
      const hours = new Date(snap.created_at).getHours();
      const minutes = new Date(snap.created_at).getMinutes();
      let timeStamp;
      minutes < 10
        ? (timeStamp = hours + ":0" + minutes)
        : (timeStamp = hours + ":" + minutes);

      return (
        <div
          className="preview"
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
                style={{ height: "150px" }}
              />
            </div>
            <div className="details-box">
              <h2>{snap.title}</h2>
              <Link to={`/snaps/${snap._id}`}>View more</Link>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SnapPreview;
