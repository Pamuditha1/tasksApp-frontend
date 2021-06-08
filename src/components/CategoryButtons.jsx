import React from "react";
import { Link } from "react-router-dom";

function CategoryButtons() {
  return (
    <div className="row mt-5">
      <div className="col-3">
        <Link to="/app/active">
          <button className="btn btn-outline-primary" name="complete">
            Active Tasks
          </button>
        </Link>
      </div>
      <div className="col-3">
        <Link to="/app/completed">
          <button className="btn btn-outline-success" name="complete">
            Complected Tasks
          </button>
        </Link>
      </div>
      <div className="col-3">
        <Link to="/app">
          <button className="btn btn-outline-dark" name="complete">
            All Tasks
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CategoryButtons;
