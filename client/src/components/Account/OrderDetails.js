import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./OrderDetails.css";
import MainHeader from "../MainHeader/MainHeader";
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";
import Footer from "../Footer/Footer";
import AccountMenu from "./AccountMenu";
import { BiArrowBack } from "react-icons/bi";
import CartItemSkeleton from "../Cart/CartItemSkeleton";
import { history } from "../../index";
import TopHeader from "../TopHeader/TopHeader";
import { orderFetchThunkAction } from "../../redux/actions/orderActions";
import Modal from "react-bootstrap/Modal";
import BeautyStars from "beauty-stars";
import axios from "../../axiosApi";
import {
  saveReviewStart,
  reviewSaved,
  saveReviewError,
} from "../../redux/actions/reviewActions";

const reviewSchema = Yup.object().shape({
  content: Yup.string().required("Required!"),
});

class OrderDetails extends React.Component {
  state = {
    items: [0, 0, 0, 0],
    modalOpen: false,
    starValue: 0,
    productId: null,
  };

  handleBackClick = () => {
    history.push("/orders");
  };

  componentDidMount() {
    this.props.orderFetchThunkAction(this.props.order_id);
  }

  openReviewModal = (e, id) => {
    this.setState({
      modalOpen: true,
      productId: id,
    });
  };

  closeReviewModal = (e) => {
    this.setState({
      modalOpen: false,
    });
  };

  ratingChanged = (val) => {
    this.setState({
      starValue: parseInt(val),
    });
  };

  render() {
    const { order, fetchingOrder, savingReview } = this.props;
    return (
      <div className="main">
        <div className="content">
          <TopHeader />
          <MainHeader />
          <SecondaryHeader />
          <div className="custom-width">
            <div className="row">
              <div className="col-md-3 my-3">
                <AccountMenu />
              </div>
              <div className="col-md-9 account-content-wrapper">
                <div className="row align-items-center">
                  <div className="col-4">
                    <BiArrowBack
                      style={{
                        color: "#d31c27",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      onClick={this.handleBackClick}
                    />
                  </div>
                  <div className="col-8">
                    <h3 className="my-2">Order Details</h3>
                  </div>
                </div>
                {fetchingOrder ? (
                  this.state.items.map((n, idx) => {
                    return <CartItemSkeleton key={idx} />;
                  })
                ) : order && order.id ? (
                  <React.Fragment>
                    <div className="mb-4">
                      <p>Order Date: {order.timestamp.split("T")[0]}</p>
                      <p>Order Currency: {order.currency}</p>
                      <p>
                        Order Amount:{" "}
                        {order.amount.split(".")[0].toLocaleString() +
                          "." +
                          order.amount.split(".")[1]}
                      </p>
                      <p>Order Status: {order.status}</p>
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
                                  className="col-md-3 h-100"
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
                                  className="col-md-1 w-100 h-100"
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
                                <div
                                  className="col-md-3 h-100"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <small
                                    className="w-100"
                                    style={{
                                      textAlign: "right",
                                    }}
                                  >
                                    <b
                                      style={{
                                        color: "#d31c27",
                                        cursor: "pointer",
                                      }}
                                      onClick={(e) =>
                                        this.openReviewModal(e, item.product_id)
                                      }
                                    >
                                      Review
                                    </b>
                                  </small>
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
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <small
                                      className="w-100"
                                      style={{
                                        textAlign: "left",
                                      }}
                                    >
                                      <b
                                        style={{
                                          color: "#d31c27",
                                          cursor: "pointer",
                                        }}
                                        onClick={(e) =>
                                          this.openReviewModal(
                                            e,
                                            item.product_id
                                          )
                                        }
                                      >
                                        Review
                                      </b>
                                    </small>
                                  </div>
                                  <p
                                    className="w-100"
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span>Total Price = </span>
                                    <b>{item.total_price.toLocaleString()}</b>
                                  </p>
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                    </div>
                  </React.Fragment>
                ) : null}
              </div>
            </div>

            <Modal
              show={this.state.modalOpen}
              onHide={this.closeReviewModal}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Add Review
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <Formik
                    initialValues={{ stars: "", content: "" }}
                    validationSchema={reviewSchema}
                    onSubmit={(values) => {
                      values.stars = this.state.starValue;
                      values["product"] = this.state.productId;
                      this.props.saveReviewStart();
                      axios
                        .post("review/", values, {
                          headers: {
                            Authorization: "Token " + this.props._id,
                          },
                        })
                        .then((res) => {
                          this.props.reviewSaved();
                          this.closeReviewModal();
                        })
                        .catch((error) => {
                          console.log(error.response);
                          this.props.saveReviewError();
                          this.closeReviewModal();
                        });
                    }}
                  >
                    {({ errors, touched }) => {
                      return (
                        <Form className="form-group review-form">
                          <div className="mb-4">
                            <label>Rate it</label>
                            <BeautyStars
                              value={this.state.starValue}
                              onChange={(val) => this.ratingChanged(val)}
                              size={"30px"}
                              activeColor={"#d31c27"}
                              inactiveColor={"#d4d4d4"}
                              editable={true}
                              gap={10}
                            />
                          </div>
                          <label htmlFor="review">Review</label>
                          <Field
                            id="review"
                            name="content"
                            type="text"
                            className="form-control auth-field"
                            placeholder={
                              "eg It arrived on time and it is exactly what i ordered. Electro is the best!!!"
                            }
                            as="textarea"
                          />
                          {errors.content && touched.content ? (
                            <p className="form-error">{errors.content}</p>
                          ) : null}

                          {savingReview ? (
                            <button
                              className="btn btn-block mt-2 custom-button"
                              type="button"
                              disabled
                            >
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="btn btn-block mt-2 custom-button"
                              disabled={this.state.starValue < 1}
                            >
                              Submit
                            </button>
                          )}
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </Modal.Body>
            </Modal>
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
    savingReview: state.reviewReducer.savingReview,
    _id: state._root._id,
  };
};

export default connect(mapStateToProps, {
  orderFetchThunkAction,
  saveReviewStart,
  reviewSaved,
  saveReviewError,
})(OrderDetails);
