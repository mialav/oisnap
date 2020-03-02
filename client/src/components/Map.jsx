import React, { Component } from "react";
import MapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";

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
    snaps: [
      // {
      //   lng: 13.456176,
      //   lat: 52.513266,
      //   showPopup: false
      // },
      // {
      //   lng: 13.436218,
      //   lat: 52.554971,
      //   showPopup: false
      // },
      // {
      //   lng: 13.40775,
      //   lat: 52.50396,
      //   showPopup: false
      // }
      // ...this.props.snapsData
    ]
  };

  _onViewportChange = viewport => this.setState({ viewport });

  // showPopup =

  // onGeolocate = () => map.fitBoundsOptions({ maxZoom: 15 });

  getSnaps = () => {
    let snaps = [];
    if (this.props.snapsData.length !== 0) {
      snaps = this.props.snapsData.map(snap => {
        console.log(snap.location);
        return {
          _id: snap._id,
          latitude: snap.location.lat,
          longitude: snap.location.lng
        };
      });
    }
    return snaps;
  };

  render() {
    const { viewport } = this.state;
    // const snaps = [...this.props.snapsData];
    // console.log(this.getSnaps());

    return (
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        className="mapContainer"
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          fitBoundsOptions={{ maxZoom: 3 }}
        />

        {this.getSnaps().map(snap => {
          return (
            <Marker
              key={snap._id}
              latitude={snap.latitude}
              longitude={snap.longitude}
            >
              <img
                className="marker"
                src={require("../images/mapbox-icon.png")}
                // onClick={this.showPopup}
              />
              {/* <Popup
                latitude={snap.lat}
                longitude={snap.lng}
                closeButton={true}
                closeOnClick={false}
                onClose={() => this.setState({ showPopup: false })}
                anchor="top"
              > 
                <div>PLACEHOLDER</div>
              </Popup>*/}
            </Marker>
          );
        })}
      </MapGL>
    );
  }
}

// import mapboxgl from "mapbox-gl";
// mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

// export default class Map extends Component {
//   state = {
//     viewport: {
//       lng: 13.404954,
//       lat: 52.520007,
//       zoom: 12
//     },
//     snaps: [
//       {
//         lng: 13.456176,
//         lat: 52.513266
//       },
//       {
//         lng: 13.436218,
//         lat: 52.554971
//       },
//       {
//         lng: 13.40775,
//         lat: 52.50396
//       }
//     ]
//   };

//   componentDidMount() {
//     const map = new mapboxgl.Map({
//       container: this.mapContainer,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [this.state.viewport.lng, this.state.viewport.lat],
//       zoom: this.state.viewport.zoom
//     });

//     map.on("move", () => {
//       this.setState({
//         viewport: {
//           lng: map.getCenter().lng.toFixed(4),
//           lat: map.getCenter().lat.toFixed(4),
//           zoom: map.getZoom().toFixed(2)
//         }
//       });
//     });

//     this.state.snaps.forEach(snap => {
//       let marker = new mapboxgl.Marker()
//         .setLngLat([snap.lng, snap.lat])
//         .setPopup(
//           new mapboxgl.Popup({ offset: 25 }) // add popups
//             .setHTML("<p>Currently just a placeholder popup</p>")
//         )
//         .addTo(map);
//     });
//   }

//   setUserLocation = () => {
//     console.log("getting user location");
//     navigator.geolocation.getCurrentPosition(position => {
//       // let userLocation = {
//       //   lat: position.coords.latitude,
//       //   lng: position.coords.longitude
//       // };
//       let newViewport = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//         zoom: 15
//       };
//       console.log(newViewport);

//       this.setState({
//         viewport: newViewport
//         // snaps: userLocation
//       });
//     });
//   };

//   componentDidUpdate() {
//     let map = new mapboxgl.Map({
//       container: this.mapContainer,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [this.state.viewport.lng, this.state.viewport.lat],
//       zoom: this.state.viewport.zoom
//     });

//     this.state.snaps.forEach(snap => {
//       let marker = new mapboxgl.Marker()
//         .setLngLat([snap.lng, snap.lat])
//         .setPopup(
//           new mapboxgl.Popup({ offset: 25 }) // add popups
//             .setHTML("<p>Currently just a placeholder popup</p>")
//         )
//         .addTo(map);
//     });
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={this.setUserLocation}>Locate yourself</button>
//         <div ref={el => (this.mapContainer = el)} className="mapContainer" />
//       </div>
//     );
//   }
// }
