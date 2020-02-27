import React from "react";
import { Link } from "react-router-dom";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <button>
        <Link to="/filter">Filter</Link>
      </button>
      <button>
        <Link to="/add">Add</Link>
      </button>
      <button>
        <Link to="/search">Search</Link>
      </button>
    </div>
  );
};

export default Toolbar;
