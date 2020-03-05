import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import categoryColor from "../styles/snapStyles";

class SnapPreview extends Component {
  state = {
    snap: null,
    message: null
  };

  getData = () => {
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
  };

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.getData();
    }
    // console.log("hiiiii", snapId);
  }
  componentDidMount() {
    this.getData();
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
        <div className="preview">
          <div className="snap-box">
            <div
              className="preview-time-box"
              style={{
                backgroundColor: categoryColor(
                  this.state.snap.category,
                  this.state.snap.created_at
                )
              }}
            >
              <p className="time">Created {this.getTime(snap)} ago</p>
            </div>
            <div className="container-content">
              <img
                className="snap-img-preview"
                src={snap.image}
                alt={snap.title}
              />
              <div className="details-box">
                <h3>{snap.title}</h3>
                <Link className="see-more" to={`/snaps/${snap._id}`}>
                  View more
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SnapPreview;
