import React from "react";
import CartItemSkeleton from "../Cart/CartItemSkeleton";
import Footer from "../Footer/Footer";
import MainHeader from "../MainHeader/MainHeader";
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";
import TopHeader from "../TopHeader/TopHeader";
import { connect } from "react-redux";
import { orderFetchThunkAction } from "../../redux/actions/orderActions";
import "./PaymentSuccess.css";
import { history } from "../../index";
import { Link } from "react-router-dom";

class PaymentSuccess extends React.Component {
  state = {
    items: [0, 0, 0, 0],
  };
  handleBackClick = () => {
    history.push("/orders");
  };
  componentDidMount() {
    this.props.orderFetchThunkAction(this.props.order_id);
  }
  render() {
    const { order, fetchingOrder } = this.props;
    return (
      <div className="main">
        <div className="content">
          <TopHeader />
          <MainHeader />
          <SecondaryHeader />
          <div className="custom-width">
            <h3>We've got it!</h3>
            {fetchingOrder ? (
              this.state.items.map((n, idx) => {
                return <CartItemSkeleton key={idx} />;
              })
            ) : order && order.id ? (
              <React.Fragment>
                <div className="mb-4">
                  <p className="my-2">
                    Your order have been received and our passionate team is
                    working on it so that it can reach you.
                  </p>
                  <p>Date: {order.timestamp.split("T")[0]}</p>
                  <p>Currency: {order.currency}</p>
                  <p>Payment Method: {order.payment_method}</p>
                  <p>
                    Order Status:{" "}
                    <span style={{ color: "#d31c27" }}>{order.status}...</span>
                  </p>
                </div>

                <div className="order-items-wrapper">
                  <React.Fragment>
                    {" "}
                    {order.products.map((item, idx) => {
                      return (
                        <React.Fragment key={idx}>
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
                                {item.product_name}
                              </h5>
                              <p>
                                Unit Price:
                                <span className="ml-2">
                                  {item.product_price.toLocaleString()}
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
                                <div
                                  style={{
                                    width: "40%",
                                    textAlign: "center",
                                  }}
                                >
                                  {" "}
                                  <small
                                    style={{ fontWeight: "bold" }}
                                    className="mr-1"
                                  >
                                    QTY
                                  </small>
                                  {item.quantity}
                                </div>
                              </div>
                              <span></span>
                            </div>
                            <div
                              className="col-md-2 h-100"
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <p
                                className="w-100"
                                style={{
                                  textAlign: "right",
                                }}
                              >
                                <b>{item.total_price.toLocaleString()}</b>
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
                                {item.product_name}
                              </h5>
                              <p>
                                Unit Price:
                                <span className="ml-2">
                                  {item.product_price}
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
                                  <div
                                    style={{
                                      width: "40%",
                                      textAlign: "center",
                                    }}
                                  >
                                    <small
                                      style={{ fontWeight: "bold" }}
                                      className="mr-1"
                                    >
                                      QTY
                                    </small>
                                    {item.quantity}
                                  </div>
                                </div>
                                <span></span>
                              </div>
                              <p
                                className="w-100"
                                style={{
                                  textAlign: "right",
                                }}
                              >
                                <b>{item.total_price.toLocaleString()}</b>
                              </p>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                </div>
                <p className="text-right" style={{ fontWeight: "bold" }}>
                  <small style={{ fontWeight: "bold" }}>Total Amount = </small>
                  {order.amount.split(".")[0].toLocaleString() +
                    "." +
                    order.amount.split(".")[1]}
                </p>

                <p className="my-2">
                  For more information and tracking of your order visit this{" "}
                  <Link to="/order-details" style={{ color: "#d31c27" }}>
                    page
                  </Link>
                </p>
              </React.Fragment>
            ) : null}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    order_id: state._root.o_id,
    order: state.orderReducer.order,
    fetchingOrder: state.orderReducer.fetchingOrder,
  };
};

export default connect(mapStateToProps, { orderFetchThunkAction })(
  PaymentSuccess
);
