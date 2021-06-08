import React from "react";

function Footer({ count }) {
  return (
    <footer>
      <div className="row mt-3 text-danger">
        <p> Active Tasks Count : {count}</p>
      </div>
    </footer>
  );
}

export default Footer;
