import React from "react";
import { connect } from "react-redux";
import { CgTrash } from "react-icons/cg";

import "./Cart.css";
import TopHeader from "../TopHeader/TopHeader";
import MainHeader from "../MainHeader/MainHeader";
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";
import Footer from "../Footer/Footer";
import CartItemSkeleton from "./CartItemSkeleton";
import {
  fetchCartThunkActionCreator,
  incrementCartThunkActionCreator,
  decrementCartThunkActionCreator,
  deleteCartThunkActionCreator,
} from "../../redux/actions/cartActions";
import { Link } from "react-router-dom/cjs/react-router-dom";

class Cart extends React.Component {
  state = {
    randomCartVal: [0, 0, 0, 0],
  };
  componentDidMount() {
    this.props.fetchCartThunkActionCreator();
  }

  handleIncrement = (e, id) => {
    e.preventDefault();
    const payload = { id: id, op_type: "INC" };
    this.props.incrementCartThunkActionCreator(payload);
  };

  handleDecrement = (e, id) => {
    e.preventDefault();
    const payload = { id: id, op_type: "DEC" };
    this.props.decrementCartThunkActionCreator(payload);
  };

  handleDeleteCart = (e, id, qty) => {
    this.props.deleteCartThunkActionCreator(id, qty);
  };

  calculateTotal = (cart) => {
    if (cart !== null) {
      let total = 0;
      for (let i = 0; i < cart.length; i++) {
        total += cart[i].total_price;
      }
      return total;
    } else {
      return;
    }
  };
  render() {
    const {
      cart,
      cartIncrementing,
      cartDecrementing,
      fetchingCart,
      cur,
    } = this.props;
    return (
      <div className="main">
        <div className="content">
          <TopHeader />
          <MainHeader />
          <SecondaryHeader />
          <div className="custom-width">
            <h3 style={{ textAlign: "center" }} className="my-3">
              My Shopping Cart
            </h3>
            <div
              className="row mt-2 y-cart-head"
              style={{ borderBottom: "2px solid #d4d4d4" }}
            >
              <div className="col-md-3"></div>
              <div className="col-md-4">
                <h6>Description</h6>
              </div>
              <div className="col-md-3">
                <h6>Quantity</h6>
              </div>
              <div className="col-md-2">
                <h6 style={{ textAlign: "right" }}>Price</h6>
              </div>
            </div>
            <div className="cart-items-wrapper">
              <div>
                {cart !== null && !fetchingCart ? (
                  <React.Fragment>
                    {" "}
                    {cart.map((item, idx) => {
                      return (
                        <React.Fragment key={item.id}>
                          {" "}
                          <div
                            className="row y-cart p-0 my-2"
                            style={{ borderBottom: "2px solid #d4d4d4" }}
                          >
                            <div
                              className="col-md-3 h-100"
                              style={{
                                textAlign: "center",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                src={item.product_image_url}
                                alt="img"
                                height="80%"
                              />
                            </div>
                            <div
                              className="col-md-4 h-100"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                              }}
                            >
                              <h5 className="cart-item-name">
                                {item.product.name}
                              </h5>
                              <p>
                                Category:
                                <span className="ml-2">
                                  {item.product.category.name}
                                </span>
                              </p>
                            </div>
                            <div
                              className="col-md-3 w-100 h-100"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <div className="w-75 d-flex justify-content-between">
                                <button
                                  className="custom-button btn-md cart-qty-btn"
                                  style={{ width: "30%" }}
                                  onClick={(e) =>
                                    this.handleIncrement(e, item.id)
                                  }
                                  disabled={
                                    cartIncrementing || cartDecrementing
                                  }
                                >
                                  +
                                </button>
                                <div
                                  style={{
                                    borderLeft: "1px solid #d4d4d4",
                                    borderRight: "1px solid #d4d4d4",
                                    width: "40%",
                                    textAlign: "center",
                                  }}
                                >
                                  {" "}
                                  {item.quantity}
                                </div>
                                <button
                                  className="custom-button btn-md cart-qty-btn"
                                  style={{ width: "30%" }}
                                  onClick={(e) =>
                                    this.handleDecrement(e, item.id)
                                  }
                                  disabled={
                                    cartIncrementing ||
                                    cartDecrementing ||
                                    item.quantity === 1
                                  }
                                >
                                  -
                                </button>
                              </div>
                              <span>
                                <CgTrash
                                  className="cart-trash"
                                  title="Delete!"
                                  onClick={(e) =>
                                    this.handleDeleteCart(
                                      e,
                                      item.id,
                                      item.quantity
                                    )
                                  }
                                />
                              </span>
                              {/* trash icon */}
                            </div>
                            <div
                              className="col-md-2 h-100"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <p
                                className="w-100"
                                style={{
                                  textAlign: "right",
                                }}
                              >
                                <b>
                                  {cur} {item.total_price.toLocaleString()}
                                </b>
                              </p>
                            </div>
                          </div>
                          <div
                            className="row x-cart p-0 my-3"
                            style={{ borderBottom: "2px solid #d4d4d4" }}
                          >
                            <div
                              className="col-6 pr-0 h-100"
                              style={{
                                textAlign: "center",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                src={item.product_image_url}
                                alt="img"
                                height="70%"
                              />
                            </div>
                            <div
                              className="col-6 pl-0 h-100"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <h5 className="cart-item-name">
                                {item.product.name}
                              </h5>
                              <p>
                                Category:
                                <span className="ml-2">
                                  {item.product.category.name}
                                </span>
                              </p>
                              <div
                                className="col-md-3 w-75 p-0"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div className="w-75 d-flex justify-content-between">
                                  <button
                                    className="custom-button btn-md cart-qty-btn"
                                    style={{ width: "30%" }}
                                    onClick={(e) =>
                                      this.handleIncrement(e, item.id)
                                    }
                                    disabled={
                                      cartIncrementing || cartDecrementing
                                    }
                                  >
                                    +
                                  </button>
                                  <div
                                    style={{
                                      borderLeft: "1px solid #d4d4d4",
                                      borderRight: "1px solid #d4d4d4",
                                      width: "40%",
                                      textAlign: "center",
                                    }}
                                  >
                                    {" "}
                                    {item.quantity}
                                    {/* <input
                                  type="text"
                                  onChange={this.handleChange}
                                  value={item.quantity}
                                  className="w-100 cart-quantity-input"
                                  style={{ textAlign: "center" }}
                                /> */}
                                  </div>
                                  <button
                                    className="custom-button btn-md cart-qty-btn"
                                    style={{ width: "30%" }}
                                    onClick={(e) =>
                                      this.handleDecrement(e, item.id)
                                    }
                                    disabled={
                                      cartIncrementing ||
                                      cartDecrementing ||
                                      item.quantity === 1
                                    }
                                  >
                                    -
                                  </button>
                                </div>
                                <span>
                                  <CgTrash
                                    onClick={(e) =>
                                      this.handleDeleteCart(
                                        e,
                                        item.id,
                                        item.quantity
                                      )
                                    }
                                    className="cart-trash"
                                  />
                                </span>
                              </div>
                              <p
                                className="w-100"
                                style={{
                                  textAlign: "right",
                                }}
                              >
                                <b>
                                  {cur} {item.total_price.toLocaleString()}
                                </b>
                              </p>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                ) : (
                  this.state.randomCartVal.map((val, idx) => {
                    return <CartItemSkeleton key={idx} />;
                  })
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-9"></div>
              <div className="col-md-3 my-2" style={{ textAlign: "right" }}>
                {" "}
                <p>
                  {cart !== null ? (
                    <b>
                      {" "}
                      TotalPrice: {cur}{" "}
                      {this.calculateTotal(cart).toLocaleString()}
                    </b>
                  ) : null}
                </p>
              </div>
            </div>
            <div>
              {/* <div className="col-md-6"></div> */}
              <div>
                <div className="row justify-content-center">
                  <div className="col-md-6 my-2">
                    <Link to="/" className="btn btn-lg custom-button w-100">
                      Continue Shopping
                    </Link>
                  </div>
                  <div className="col-md-6 my-2">
                    <Link
                      to="/checkout"
                      className="btn btn-lg custom-button w-100"
                    >
                      Proceed To Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
    cartIncrementing: state.cartReducer.cartIncrementing,
    cartDecrementing: state.cartReducer.cartDecrementing,
    fetchingCart: state.cartReducer.fetchingCart,
    cur: state._root.cur,
  };
};

export default connect(mapStateToProps, {
  fetchCartThunkActionCreator,
  incrementCartThunkActionCreator,
  decrementCartThunkActionCreator,
  deleteCartThunkActionCreator,
})(Cart);
