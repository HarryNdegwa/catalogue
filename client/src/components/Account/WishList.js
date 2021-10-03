import React from "react";
import { connect } from "react-redux";
import { CgTrash } from "react-icons/cg";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom/cjs/react-router-dom";

import "./WishList.css";
import TopHeader from "../TopHeader/TopHeader";
import MainHeader from "../MainHeader/MainHeader";
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";
import Footer from "../Footer/Footer";
import CartItemSkeleton from "../Cart/CartItemSkeleton";
import {
  wishlistFetchThunkActionCreator,
  wishlistDelete,
} from "../../redux/actions/wishlistActions";
import { persistSlug } from "../../redux/actions/rootActions";
import axios from "../../axiosApi";
import { history } from "../../index";
import AccountMenu from "./AccountMenu";

class WishList extends React.Component {
  state = {
    wishListRandomVal: [0, 0, 0, 0],
  };
  componentDidMount() {
    this.props.wishlistFetchThunkActionCreator();
  }
  handleBuyClick = (e, slug, q) => {
    if (q < 1) {
      return;
    }
    this.props.persistSlug(slug);
  };

  handleDeleteWishList = (e, id) => {
    // do something
    axios
      .delete("wishlist/" + id + "/", {
        headers: {
          Authorization: "Token " + this.props._id,
        },
      })
      .then((res) => {
        this.props.wishlistDelete(res.data);
        if (this.props.wishlist.length === 0) {
          history.push("/empty-wishlist");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  render() {
    const { wishlist, fetchingWishlist, cur } = this.props;
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
                {wishlist && wishlist && wishlist.length > 0 ? (
                  <React.Fragment>
                    <h3 style={{ textAlign: "center" }} className="my-2">
                      WishList
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
                        <h6>In Stock</h6>
                      </div>
                      <div className="col-md-2">
                        <h6>Buy</h6>
                      </div>
                    </div>
                  </React.Fragment>
                ) : null}

                {/* <div> */}
                <div className="cart-items-wrapper">
                  {!fetchingWishlist && wishlist !== null ? (
                    wishlist && wishlist.length < 1 ? (
                      <div
                        style={{
                          height: "100px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p>You have no saved items yet!</p>
                      </div>
                    ) : (
                      <React.Fragment>
                        {wishlist.map((item, idx) => {
                          return (
                            <div key={item.id}>
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
                                    <span>
                                      {cur}{" "}
                                      {item.product.price.toLocaleString()}
                                    </span>
                                  </p>
                                </div>
                                <div
                                  className="col-md-3 w-100 h-100"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {item.product.quantity > 0 ? (
                                    <TiTick style={{ fontSize: "20px" }} />
                                  ) : (
                                    <ImCross />
                                  )}

                                  <span className="mx-4"></span>
                                  <span>
                                    <CgTrash
                                      onClick={(e) =>
                                        this.handleDeleteWishList(e, item.id)
                                      }
                                      className="cart-trash"
                                    />
                                  </span>
                                </div>
                                <div
                                  className="col-md-2 h-100"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <p className="w-100">
                                    <Link
                                      to={`/main-product/${item.product.slug}`}
                                      onClick={(e) =>
                                        this.handleBuyClick(
                                          e,
                                          item.product.slug,
                                          item.product.quantity
                                        )
                                      }
                                      className="btn btn-sm custom-button"
                                    >
                                      Buy Now
                                    </Link>
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
                                    <span>
                                      {cur}{" "}
                                      {item.product.price.toLocaleString()}
                                    </span>
                                  </p>
                                  <div
                                    className="col-md-3 w-75 p-0"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      // justifyContent: "space-between",
                                    }}
                                  >
                                    {item.product.quantity > 0 ? (
                                      <TiTick style={{ fontSize: "20px" }} />
                                    ) : (
                                      <ImCross />
                                    )}
                                    <span className="mx-4"></span>
                                    <span>
                                      <CgTrash
                                        onClick={(e) =>
                                          this.handleDeleteWishList(e, item.id)
                                        }
                                      />
                                    </span>
                                  </div>
                                  <p className="w-100">
                                    <Link
                                      to={`/main-product/${item.product.slug}`}
                                      onClick={(e) =>
                                        this.handleBuyClick(
                                          e,
                                          item.product.slug,
                                          item.product.quantity
                                        )
                                      }
                                      className="btn btn-sm custom-button"
                                    >
                                      Buy Now
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </React.Fragment>
                    )
                  ) : (
                    this.state.wishListRandomVal.map((val, idx) => {
                      return <CartItemSkeleton key={idx} />;
                    })
                  )}
                </div>
                {/* </div> */}
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
    wishlist: state.wishlistReducer.wishlist,
    fetchingWishlist: state.wishlistReducer.fetchingWishlist,
    _id: state._root._id,
    cur: state._root.cur,
  };
};

export default connect(mapStateToProps, {
  wishlistFetchThunkActionCreator,
  persistSlug,
  wishlistDelete,
})(WishList);
