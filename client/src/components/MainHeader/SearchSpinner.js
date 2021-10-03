import React from "react";

import "./SearchSpinner.css";

function SearchSpinner(props) {
  return (
    <div className="search-spinner">
      <span
        className="spinner-border spinner-border-lg"
        role="status"
        aria-hidden="true"
      ></span>
    </div>
  );
}

export default SearchSpinner;
