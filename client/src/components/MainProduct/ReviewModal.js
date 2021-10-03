import React from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";

import "./ReviewModal.css";
import { BASE_URL } from "../../axiosApi";
import {
  fetchReviewsStart,
  reviewsFetched,
  fetchReviewsError,
} from "../../redux/actions/reviewsActions";
import axios from "axios";
import Rating from "../Rating/Rating";

class ReviewModal extends React.Component {
  state = {
    reviews: null,
  };
  componentDidMount() {
    this.source = axios.CancelToken.source();
    let axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    this.props.fetchReviewsStart();
    axiosInstance
      .get("reviews/", { params: { id: this.props.product.id } })
      .then((res) => {
        this.setState({
          reviews: res.data,
        });
        this.props.reviewsFetched();
      })
      .catch((err) => {
        console.log(err.response);
        this.props.fetchReviewsError();
      });
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
    const { fetchingReviews } = this.props;
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="reviews-modal"
      >
        {fetchingReviews ? (
          <div className="reviews-spinner">
            <span
              className="spinner-border spinner-border-lg"
              role="status"
              aria-hidden="true"
            ></span>
          </div>
        ) : null}

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Buyers Reviews
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="reviews-modal-body">
          <div className="reviews">
            {this.state.reviews &&
              this.state.reviews.map((review, idx) => {
                return (
                  <div key={review.id} className="mb-4">
                    <h6 className="mb-1">
                      {`${review.reviewer.first_name} ${review.reviewer.last_name}`}{" "}
                      <small>on {review.timestamp}</small>
                    </h6>
                    <Rating
                      value={review.stars}
                      editable={false}
                      size={15}
                      gap={"8px"}
                    />
                    <p className="mt-1">{review.content}</p>
                  </div>
                );
              })}
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lvl: state._root.lvl,
    fetchingReviews: state.reviewsReducer.fetchingReviews,
    product: state.productReducer.product,
  };
};

export default connect(mapStateToProps, {
  fetchReviewsStart,
  reviewsFetched,
  fetchReviewsError,
})(ReviewModal);
