import React, { Component } from "react";
import axios from "axios";

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
    console.log(this.props.match.params.id);
    console.log(this.props.history);
    if (event.target.innerText === "Edit") {
      //TODO - OPEN EDIT PAGE
    } else if (event.target.innerText === "Delete") {
      // axios
      //   .delete(`/snaps/${this.props.match.params.id}`)
      //   .then(response => {
      //     console.log(response);
      //     this.props.history.push("/home");
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  };

  render() {
    const snap = this.state.snap;
    console.log("snap", snap);

    if (!snap) {
      return <div>LOADING</div>;
    }

    const categoryColor = {
      //  if(this.state.snap.category === 'promo'){
      //    backgroundColor: 'red'
      //  }
      //backgroundColor: myFunctio(this.state.snap.category)
    };

    return (
      <div className="container" style={categoryColor}>
        <div className="snap-box">
          <div className="time-box">
            <p>Created at {snap.created_at}</p>
          </div>
          <div className="snap-img">
            <img src={snap.image} alt={snap.title} style={{ height: "40vh" }} />
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

export default SnapDetail;
