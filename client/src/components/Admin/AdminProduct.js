import React from "react";
import { connect } from "react-redux";
import { CgMoreR } from "react-icons/cg";

import "./AdminProduct.css";
import { Link } from "react-router-dom";
import CartItemSkeleton from "../Cart/CartItemSkeleton";
import { productEditStartThunkAction } from "../../redux/actions/ProductPublishActions";
import { persistSlug } from "../../redux/actions/rootActions";
import DealModal from "./DealModal";

class AdminProduct extends React.Component {
  state = {
    modalShow: false,
  };

  toggleModal = () => {
    this.setState((prevState) => ({ modalShow: !prevState.modalShow }));
  };

  handleClick = (e, id, slug) => {
    this.props.productEditStartThunkAction({ id: id });
    this.props.persistSlug(slug);
  };
  render() {
    const { data, fetching } = this.props;
    return (
      <div>
        {fetching ? (
          <CartItemSkeleton />
        ) : (
          <React.Fragment>
            {data !== undefined ? (
              <React.Fragment>
                <DealModal
                  show={this.state.modalShow}
                  onHide={this.toggleModal}
                  currentprice={data.price}
                  id={data.id}
                />
                <div className="row y-all no-gutters admin-product-wrapper">
                  <div className="col-md-3 h-100">
                    <img src={data.img_urls[0]} alt="img" height="100%" />
                  </div>
                  <div className="col-md-4">
                    <h4>{data.name}</h4>
                    <p>Category:{data.category.name}</p>
                  </div>
                  <div className="col-md-3">
                    <p>
                      <span className="badge bg-success text-white">
                        {data.status}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-2 text-center">
                    <span className="activity-tooltip">
                      <CgMoreR style={{ fontSize: "25px" }} />
                      <div className="activity-tooltip-text">
                        <Link
                          to="/edit-product"
                          className="activity-edit-link"
                          onClick={(e) =>
                            this.handleClick(e, data.id, data.slug)
                          }
                        >
                          Edit
                        </Link>
                        <span
                          className="activity-deal"
                          onClick={this.toggleModal}
                        >
                          Deal
                        </span>
                      </div>
                    </span>
                  </div>
                </div>

                <div className="row x-all admin-product-wrapper mt-3">
                  <div className="col-6 h-100">
                    <img src={data.img_urls[0]} alt="img" height="100%" />
                  </div>
                  <div className="col-6">
                    <h4>{data.name}</h4>
                    <p>Category:{data.category.name}</p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p>
                        <span
                          className="badge bg-success text-white"
                          style={{ padding: "10px" }}
                        >
                          {data.status}
                        </span>
                      </p>
                      <span className="activity-tooltip">
                        <CgMoreR style={{ fontSize: "25px" }} />
                        <div className="activity-tooltip-text">
                          <Link
                            to="/edit-product"
                            className="activity-edit-link"
                            onClick={(e) =>
                              this.handleClick(e, data.id, data.slug)
                            }
                          >
                            Edit
                          </Link>
                          <span
                            className="activity-deal"
                            onClick={this.toggleModal}
                          >
                            Deal
                          </span>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : null}
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lvl: state._root.lvl,
    product: state.productReducer.product,
    fetchingProduct: state.productReducer.fetchingProduct,
    items: state.wishlistReducer.items,
  };
};

export default connect(mapStateToProps, {
  productEditStartThunkAction,
  persistSlug,
})(AdminProduct);
