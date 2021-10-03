import React from "react";
import Products from "../Products/Products";
import AdminHeader from "./AdminHeader";

import "./LiveProducts.css";

class LiveProducts extends React.Component {
  render() {
    return (
      <div className="main live-products">
        <div className="content">
          <AdminHeader />
          <div className="custom-width">
            <h3>Live Products</h3>
            <Products />
          </div>
        </div>
      </div>
    );
  }
}

export default LiveProducts;
