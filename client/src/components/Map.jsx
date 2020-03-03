import React, { Component } from "react";
import MapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";
import SnapPreview from "./SnapPreview.jsx";
import history from "../history";
import categoryColor from "../styles/snapStyles.js";

const MAPBOX_TOKEN = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

const geolocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  margin: 10
};

export default class Map extends Component {
  state = {
    viewport: {
      latitude: 52.520007,
      longitude: 13.404954,
      zoom: 12
    },
    popupInfo: null
  };

  _onViewportChange = viewport => this.setState({ viewport });

  // onGeolocate = () => map.fitBoundsOptions({ maxZoom: 15 });

  getSnaps = () => {
    let snaps = [];
    if (this.props.snapsData.length !== 0) {
      snaps = this.props.snapsData.map(snap => {
        return {
          _id: snap._id,
          latitude: snap.location.lat,
          longitude: snap.location.lng
        };
      });
    }
    return snaps;
  };

  renderPopup = snap => {
    this.setState({
      popupInfo: snap
    });
  };

  closePopup = () => {
    this.setState({
      popupInfo: null
    });
  };

  closeWindows = () => {
    history.push("/home");
  };

  render() {
    const { viewport } = this.state;

    const geolocateStyle = {
      float: "left",
      marginTop: "100px",
      padding: "10px"
    };
    return (
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mialav/ck7brnzxa0mg01invkw6jqlvj"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        className="mapContainer"
        onClick={this.closeWindows}
      >
        <div className="geolocation-button">
          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            fitBoundsOptions={{ maxZoom: 3 }}
          />
        </div>

        {this.getSnaps().map(snap => {
          return (
            <Marker
              key={snap._id}
              latitude={snap.latitude}
              longitude={snap.longitude}
              snapImage={snap.image}
              snapTitle={snap.title}
              snapCreated={snap.created_at}
            >
              <span style={categoryColor(snap.category, snap.created_at)}>
                <i
                  className="fas fa-map-marker-alt"
                  onClick={() => this.renderPopup(snap)}
                ></i>
              </span>

              {/* <img
                className="marker"
                alt="marker"
                src={require("../images/mapbox-icon.png")}
                onClick={() => this.renderPopup(snap)}

              /> */}

            </Marker>
          );
        })}
        {this.state.popupInfo !== null ? (
          <Popup
            anchor="bottom-left"
            latitude={this.state.popupInfo.latitude}
            longitude={this.state.popupInfo.longitude}
            dynamicPosition={true}
            closeButton={false}
          >
            <div onClick={this.closePopup}>
              <SnapPreview id={this.state.popupInfo._id} />
            </div>
          </Popup>
        ) : null}
      </MapGL>
    );
  }
}
