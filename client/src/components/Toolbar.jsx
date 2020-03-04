import React from "react";
import { Link } from "react-router-dom";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <Link to="/add">
        <div className="addSnap">
          <i className="fas fa-camera"></i>
        </div>
      </Link>
    </div>
  );
};

export default Toolbar;
