import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
<<<<<<< HEAD
mapboxgl.accessToken = "MAPBOX_ACCESS_TOKEN";
=======
import { BrowserRouter } from "react-router-dom";
>>>>>>> 0a6cd169f7ab4472fdf831488d40f610cbdd7160

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
