import React from "react";
import { Link } from "react-router-dom";

const Toolbar = () => {
  return (
    <div className="toolbar">
      {/* <button>
        <Link to="/filter">Filter</Link>
      </button> */}
      <button>
        <Link to="/add">
          <div className="addSnap">
            <i className="fas fa-camera"></i>
          </div>
        </Link>
      </button>
      {/* <button>
        <Link to="/search">Search</Link>
      </button> */}
    </div>
  );
};

export default Toolbar;
