import React from "react";

import "./CartItemSkeleton.css";

class CartItemSkeleton extends React.Component {
  render() {
    return (
      <div>
        <div className="cart-item-md-skeleton"></div>
        <div className="cart-item-sm-skeleton"></div>
      </div>
    );
  }
}

export default CartItemSkeleton;
