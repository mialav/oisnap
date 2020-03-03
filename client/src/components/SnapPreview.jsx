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
    console.log("snap", snap);

    if (!snap) {
      return <div>LOADING</div>;
    } else {
      return (
        <div className="preview" style={categoryColor(this.state.category)}>
          <div className="snap-box">
            <div className="time-box">
              <p>Created {this.getTime(snap)} ago</p>
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
