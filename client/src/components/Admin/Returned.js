import React from "react";
import Products from "../Products/Products";
import AdminHeader from "./AdminHeader";

import "./Returned.css";

class ReturnedProducts extends React.Component {
  render() {
    return (
      <div className="main returned-products">
        <div className="content">
          <AdminHeader />
          <div className="custom-width">
            <h3>Returned Products</h3>
            <Products />
          </div>
        </div>
      </div>
    );
  }
}

export default ReturnedProducts;
