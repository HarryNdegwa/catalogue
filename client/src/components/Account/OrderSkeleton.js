import React from "react";

import "./OrderSkeleton.css";

class OrderSkeleton extends React.Component {
  render() {
    return (
      <div className="my-3">
        <div className="order-md-skeleton"></div>
        <div className="order-sm-skeleton"></div>
      </div>
    );
  }
}

export default OrderSkeleton;
