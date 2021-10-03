import React from "react";
import Products from "../Products/Products";
import AdminHeader from "./AdminHeader";

import "./OutOfStock.css";

class OutOfStock extends React.Component {
  render() {
    return (
      <div className="main out-of-stock">
        <div className="content">
          <AdminHeader />
          <div className="custom-width">
            <h3>Out of Stock</h3>
            <Products />
          </div>
        </div>
      </div>
    );
  }
}

export default OutOfStock;
