import React from "react";
import { AiOutlineHeart, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { connect } from "react-redux";

import "./Product.css";
import ProductSkeleton from "./ProductSkeleton";
import { Link } from "react-router-dom";
import { persistSlug } from "../../redux/actions/rootActions";
import {
  persistWishList,
  saveWishlistThunkAction,
} from "../../redux/actions/wishlistActions";

class Product extends React.Component {
  handleLinkClick = (e, slug) => {
    this.props.persistSlug(slug);
  };

  handleSaveItem = (e, obj) => {
    const { lvl, items } = this.props;
    if (lvl === 1 || lvl === 2) {
      this.props.saveWishlistThunkAction(obj);
    } else {
      const inArry = items.find((item) => {
        return item.id === obj.id;
      });
      if (inArry) {
        return;
      } else {
        this.props.persistWishList([obj]);
      }
    }
  };

  getDealPercentage = (currPrice, dealPrice) => {
    return Math.round((1 - dealPrice / currPrice) * 100);
  };
  render() {
    const { data, fetching, cur } = this.props;
    return (
      <div className="product">
        {fetching ? (
          <ProductSkeleton />
        ) : (
          <React.Fragment>
            {data !== undefined ? (
              <React.Fragment>
                <div className="product-inner" style={{ position: "relative" }}>
                  {data.hot_deal ? (
                    <Link
                      to={`/main-product/${data.slug}`}
                      onClick={(e) => this.handleLinkClick(e, data.slug)}
                    >
                      <div id="burst-8">
                        <div id="inner-burst">
                          <p>
                            <small>
                              {this.getDealPercentage(
                                data.price,
                                data.deal_price
                              )}
                              % OFF
                            </small>
                          </p>
                        </div>
                      </div>
                    </Link>
                  ) : null}

                  <Link
                    to={`/main-product/${data.slug}`}
                    onClick={(e) => this.handleLinkClick(e, data.slug)}
                  >
                    <img src={data.img_urls[0]} height="125px" alt="" />
                  </Link>
                  <div
                    style={{
                      height: "50%",
                      position: "absolute",
                      bottom: "0px",
                      left: "0px",
                      width: "100%",
                      zIndex: "1",
                    }}
                  >
                    {" "}
                    <h5 className="mt-1 product-name">{data.name}</h5>
                    <h6 className="mt-2" style={{ color: "#d31c27" }}>
                      {cur}{" "}
                      {data.hot_deal
                        ? data.deal_price.toLocaleString()
                        : data.price.toLocaleString()}
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        <small className="ml-1" style={{ fontWeight: "bold" }}>
                          {data.hot_deal
                            ? data.price.toLocaleString()
                            : data.prev_price.toLocaleString()}
                        </small>
                      </span>
                    </h6>
                    <section className="product-secondary">
                      <p
                        onClick={(e) =>
                          this.handleSaveItem(e, {
                            id: data.id,
                            product_image_url: data.img_urls[0],
                          })
                        }
                      >
                        <AiOutlineHeart />
                      </p>
                      <p>
                        {data.reviews < 1 ? (
                          <AiOutlineStar style={{ color: "#000" }} />
                        ) : data.reviews < 10 ? (
                          <BsStarHalf style={{ color: "#000" }} />
                        ) : (
                          <AiFillStar style={{ color: "#d31c27" }} />
                        )}
                      </p>
                      <p className="sales-tooltip">
                        <RiArrowLeftRightLine />
                        {data.sold > 0 ? (
                          <span className="sales-tooltip-text">
                            <i>
                              <b style={{ color: "#d31c27" }}>{data.sold}</b>{" "}
                              Successful Sales
                            </i>
                          </span>
                        ) : null}
                      </p>
                    </section>
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
    cur: state._root.cur,
  };
};

export default connect(mapStateToProps, {
  persistSlug,
  persistWishList,
  saveWishlistThunkAction,
})(Product);
