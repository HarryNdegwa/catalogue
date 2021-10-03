import React from "react";
import { connect } from "react-redux";
import "./Orders.css";
import OrderSkeleton from "./OrderSkeleton";
import { ordersFetchThunkAction } from "../../redux/actions/ordersActions";
import { history } from "../../index";
import { persistOrderId } from "../../redux/actions/rootActions";

class Orders extends React.Component {
  state = {
    count: [0, 0, 0, 0, 0, 0, 0, 0],
  };
  componentDidMount() {
    this.props.ordersFetchThunkAction();
  }
  handleClick = (e, id) => {
    this.props.persistOrderId(id);
    history.push("/order-details");
  };
  render() {
    const { fetchingOrders, orders } = this.props;
    return (
      <div>
        {orders && orders && orders.length > 0 ? (
          <React.Fragment>
            <h3 style={{ textAlign: "center" }} className="my-2">
              Orders
            </h3>

            <div
              className="row mt-2 y-cart-head"
              style={{ borderBottom: "2px solid #d4d4d4" }}
            >
              <div className="col-md-3">
                <h6>Order Id</h6>
              </div>
              <div className="col-md-4">
                <h6>Date</h6>
              </div>
              <div className="col-md-3">
                <h6>Amount</h6>
              </div>
              <div className="col-md-2"></div>
            </div>
          </React.Fragment>
        ) : null}

        {fetchingOrders ? (
          this.state.count.map((n, i) => {
            return <OrderSkeleton key={i} />;
          })
        ) : orders && orders.length < 1 ? (
          <div
            style={{
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>You have no orders yet!</p>
          </div>
        ) : (
          orders &&
          orders.map((order, idx) => {
            return (
              <div
                key={order.id}
                className="row py-2"
                // style={{ borderBottom: "1px solid #d4d4d4" }}
              >
                <div
                  className="col-md-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <h6 className="order-id">
                    <span className="j mr-1">Order ID:</span>
                    {order.id}
                  </h6>
                </div>
                <div
                  className="col-md-4"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <h6 className="order-date">
                    <span className="j mr-1">Order Date:</span>
                    {order.timestamp.split("T")[0]}
                  </h6>
                </div>

                <div
                  className="col-md-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p className="w-100 order-amount">
                    <span className="j mr-1">Amount:</span>
                    <span className="mr-1">{order.currency}</span>
                    {order.amount}
                  </p>
                </div>
                <div
                  className="col-md-2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    onClick={(e) => this.handleClick(e, order.id)}
                    className="order-more-details"
                    style={{ cursor: "pointer" }}
                  >
                    More
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetchingOrders: state.ordersReducer.fetchingOrders,
    orders: state.ordersReducer.orders,
  };
};

export default connect(mapStateToProps, {
  ordersFetchThunkAction,
  persistOrderId,
})(Orders);
