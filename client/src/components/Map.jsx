import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

export default class Map extends Component {
  state = {
    viewport: {
      lng: 13.404954,
      lat: 52.520007,
      zoom: 12
    },
    snaps: [
      {
        lng: 13.456176,
        lat: 52.513266
      },
      {
        lng: 13.436218,
        lat: 52.554971
      },
      {
        lng: 13.40775,
        lat: 52.50396
      }
    ]
  };

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.viewport.lng, this.state.viewport.lat],
      zoom: this.state.viewport.zoom
    });

    map.on("move", () => {
      this.setState({
        viewport: {
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2)
        }
      });
    });

    this.state.snaps.forEach(snap => {
      let marker = new mapboxgl.Marker()
        .setLngLat([snap.lng, snap.lat])
        .addTo(map);
    });
  }

  setUserLocation = () => {
    console.log("getting user location");
    navigator.geolocation.getCurrentPosition(position => {
      // let userLocation = {
      //   lat: position.coords.latitude,
      //   lng: position.coords.longitude
      // };
      let newViewport = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        zoom: 15
      };
      console.log(newViewport);

      this.setState({
        viewport: newViewport
        // snaps: userLocation
      });
    });
  };

  componentDidUpdate() {
    let map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.viewport.lng, this.state.viewport.lat],
      zoom: this.state.viewport.zoom
    });

    this.state.snaps.forEach(snap => {
      let marker = new mapboxgl.Marker()
        .setLngLat([snap.lng, snap.lat])
        .addTo(map);
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.setUserLocation}>Locate yourself</button>
        <div ref={el => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}