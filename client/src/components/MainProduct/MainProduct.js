import React from "react";
import ReactImageMagnify from "react-image-magnify";
import { IoIosCart } from "react-icons/io";
import { CgFacebook } from "react-icons/cg";
import { SiTwitter } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";
import { MdShare } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import "./MainProduct.css";
import TopHeader from "../TopHeader/TopHeader";
import MainHeader from "../MainHeader/MainHeader";
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";
import Footer from "../Footer/Footer";
import MainProductSideImageSkeleton from "./MainProductSideImageSkeleton";
import MainProductImageSkeleton from "./MainProductImageSkeleton";
import MainProductInfoSkeleton from "./MainProductInfoSkeleton";
import { productFetchThunkActionCreator } from "../../redux/actions/productActions";
import {
  persistCartThunkAction,
  saveCartThunkAction,
} from "../../redux/actions/cartActions";
import MainProductDescSkeleton from "./MainProductDescSkeleton";
import axios from "../../axiosApi";
import { BASE_URL } from "../../axiosApi";
import {
  persistSlug,
  processCurrencyPrice,
} from "../../redux/actions/rootActions";
import MainProductRelatedSkeleton from "./MainProductRelatedSkeleton";
import ReviewModal from "./ReviewModal";

let processImageUrls = (data) => {
  data.map((d, idx) => {
    const imgUrls = d.img_urls.split(",");
    let newImgUrls = imgUrls.map((url, idx) => {
      return `${BASE_URL}${url.substring(1)}`;
    });
    d.img_urls = newImgUrls;
    return d;
  });
  return data;
};

class MainProduct extends React.Component {
  constructor(props) {
    super(props);
    this.reviewsRef = React.createRef();
  }

  state = {
    sideImgs: [0, 0, 0, 0],
    activeImage: 0,
    quantity: 1,
    relatedProducts: null,
    viewPortWidth: null,
    reviewsModalOpen: false,
  };

  componentDidMount() {
    const slug = this.props.slg;
    this.props.productFetchThunkActionCreator(slug);
    axios
      .get("product/related/" + slug + "/", {
        headers: { CURRENCY: this.props.cur },
      })
      .then((res) => {
        const data = processImageUrls(res.data);
        processCurrencyPrice(data, res.headers["currency"]);
        this.setState({
          relatedProducts: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      viewPortWidth: window.innerWidth,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.slg !== this.props.slg) {
      this.props.productFetchThunkActionCreator(this.props.slg);
      axios
        .get("product/related/" + this.props.slg + "/", {
          headers: { CURRENCY: this.props.cur },
        })
        .then((res) => {
          const data = processImageUrls(res.data);
          processCurrencyPrice(data, res.headers["currency"]);
          this.setState({
            relatedProducts: data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (prevProps.cur !== this.props.cur) {
      this.setState({
        relatedProducts: null,
      });
      axios
        .get("product/related/" + this.props.slg + "/", {
          headers: { CURRENCY: this.props.cur },
        })
        .then((res) => {
          const data = processImageUrls(res.data);
          processCurrencyPrice(data, res.headers["currency"]);
          this.setState({
            relatedProducts: data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleMouseOver = (e, idx) => {
    this.setState({
      activeImage: idx,
    });
  };

  handleQuantityChange = (e) => {
    this.setState({
      quantity: e.target.value,
    });
  };

  addToCart = (e, data) => {
    e.preventDefault();
    const { lvl, persistCartThunkAction, saveCartThunkAction } = this.props;
    if (lvl === 1 || lvl === 2) {
      saveCartThunkAction(data);
    } else {
      persistCartThunkAction(data);
    }
  };

  handleLinkClick = (e, slug) => {
    this.props.persistSlug(slug);
    this.setState({
      relatedProducts: null,
      activeImage: 0,
      quantity: 1,
    });
  };

  getImageProps() {
    const idx = this.state.activeImage;
    return Object.keys(this.props.product).length !== 0
      ? {
          smallImage: {
            alt: "product",
            isFluidWidth: true,
            src: this.props.product.img_urls[idx],
          },
          largeImage: {
            src: this.props.product.img_urls[idx],
            width: 800,
            height: 800,
          },
          enlargedImageContainerStyle: { background: "#fff", zIndex: 9 },
        }
      : {
          smallImage: {
            alt: "product",
            isFluidWidth: true,
            src: "",
          },
          largeImage: {
            src: "",
            width: 800,
            height: 800,
          },
          enlargedImageContainerStyle: { background: "#fff", zIndex: 9 },
        };
  }

  processCarouselItems = () => {
    let count = 5;
    const { viewPortWidth } = this.state;

    if (viewPortWidth <= 768) {
      count = 4;
    }

    if (viewPortWidth <= 420) {
      count = 3;
    }

    return count;
  };

  getDealPercentage = (currPrice, dealPrice) => {
    return Math.round((1 - dealPrice / currPrice) * 100);
  };

  openReviewsModal = (e) => {
    const reviews = this.reviewsRef.current.innerText.split(" ")[0];
    if (parseInt(reviews) <= 0) {
      return;
    }
    this.setState({
      reviewsModalOpen: true,
    });
  };

  closeReviewsModal = (e) => {
    this.setState({
      reviewsModalOpen: false,
    });
  };

  render() {
    const {
      product,
      fetchingProduct,
      persistingCart,
      savingCart,
      done,
      cur,
    } = this.props;
    const { relatedProducts } = this.state;
    return (
      <div>
        {this.state.reviewsModalOpen ? (
          <ReviewModal
            show={this.state.reviewsModalOpen}
            onHide={this.closeReviewsModal}
          />
        ) : null}
        <div className="main">
          <div className="content">
            <TopHeader />
            <MainHeader />
            <SecondaryHeader />
            <div className="custom-width">
              <div className="row mt-4 mb-0 mx-0">
                <div className="col-md-7 mb-2">
                  <div
                    className="row"
                    style={{ height: "100%", alignItems: "center" }}
                  >
                    <div className="col-3 pl-0 product-side-images">
                      {product === null ? (
                        <React.Fragment>
                          {this.state.sideImgs.map((img, idx) => {
                            return <MainProductSideImageSkeleton key={idx} />;
                          })}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {product.img_urls &&
                            product.img_urls.map((img, idx) => {
                              return (
                                <div key={idx} className="product-side-image">
                                  {fetchingProduct ? (
                                    <MainProductSideImageSkeleton />
                                  ) : (
                                    <React.Fragment>
                                      {" "}
                                      <div
                                        style={{
                                          overflow: "hidden",
                                          height: "100%",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          border: `${
                                            this.state.activeImage === idx
                                              ? "2px solid #d31c27"
                                              : "none"
                                          }`,
                                        }}
                                      >
                                        <img
                                          onMouseOver={(e) =>
                                            this.handleMouseOver(e, idx)
                                          }
                                          src={img}
                                          alt="product-img"
                                          height="90%"
                                        />
                                      </div>
                                    </React.Fragment>
                                  )}
                                </div>
                              );
                            })}
                        </React.Fragment>
                      )}
                    </div>

                    <div className="col-9 p-0">
                      <div className="product-image">
                        {product === null ? (
                          <MainProductImageSkeleton />
                        ) : (
                          <div
                            style={{
                              height: "100%",
                              overflow: "hidden",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <ReactImageMagnify
                              enlargedImagePosition={"over"}
                              {...this.getImageProps()}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 pr-0 product-info-wrapper">
                  {product === null ? (
                    <MainProductInfoSkeleton />
                  ) : (
                    <div style={{ height: "100%" }} className="product-info">
                      <div>
                        <h3>{product.name}</h3>

                        {product.hot_deal ? (
                          <p style={{ fontWeight: "bolder", color: "#d31c27" }}>
                            -
                            {this.getDealPercentage(
                              product.price,
                              product.deal_price
                            )}
                            % OFF <small>Get it Now!</small>
                          </p>
                        ) : null}

                        {product.hot_deal ? (
                          <p style={{ color: "#d31c27", fontWeight: "bold" }}>
                            {product.deal_quantity}{" "}
                            <span>
                              <small>in stock.</small>
                            </span>
                          </p>
                        ) : null}

                        <h5 className="mt-2">
                          {cur}{" "}
                          {product.hot_deal
                            ? product.deal_price.toLocaleString()
                            : product.price.toLocaleString()}
                          <span
                            className="ml-2"
                            style={{
                              textDecoration: "line-through",
                              color: "rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            <small
                              style={{
                                textDecoration: "line-through",
                                fontWeight: "bold",
                              }}
                            >
                              {product.hot_deal
                                ? product.price.toLocaleString()
                                : product.prev_price.toLocaleString()}
                            </small>
                          </span>
                        </h5>
                      </div>

                      <div className="product-info-inner">
                        {" "}
                        <p>
                          <strong>SKU:</strong> {product.id}
                        </p>
                        <p>
                          <strong>Category:</strong>{" "}
                          {product !== null && product.category.name}
                        </p>
                        <p>
                          <strong>Brand:</strong>{" "}
                          {product !== null && product.sub_category.name}
                        </p>
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={this.openReviewsModal}
                          title="Product reviews"
                          className="product-reviews-link"
                        >
                          {product.reviews > 0 ? (
                            <React.Fragment>
                              {" "}
                              {product.reviews < 10 ? (
                                <span className="mr-1">
                                  <BsStarHalf style={{ color: "#000" }} />
                                </span>
                              ) : (
                                <span className="mr-1">
                                  <AiFillStar style={{ color: "#d31c27" }} />
                                </span>
                              )}
                              <small
                                ref={this.reviewsRef}
                                style={{ fontWeight: "bold" }}
                              >
                                {product.reviews}{" "}
                                {product.reviews === 1 ? "Review" : "Reviews"}
                              </small>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              {" "}
                              <span className="mr-1">
                                <AiOutlineStar style={{ color: "#000" }} />
                              </span>
                              <span
                                ref={this.reviewsRef}
                                style={{ fontWeight: "bold", fontSize: "14px" }}
                              >
                                {product.reviews} Reviews
                              </span>
                            </React.Fragment>
                          )}
                        </p>
                        <p>{product.sold} sold</p>
                        <div
                          className="row no-gutters"
                          style={{ alignItems: "center" }}
                        >
                          <div className="col-2 p-0">
                            <h5>QTY:</h5>
                          </div>
                          <div className="col-10 h-100 p-0">
                            {" "}
                            <div
                              className="form-group d-flex h-100"
                              style={{ alignItems: "center" }}
                            >
                              <input
                                type="number"
                                min="1"
                                max="100"
                                className="form-control quantity-selector"
                                defaultValue="1"
                                onChange={this.handleQuantityChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="add-to-cart-tooltip">
                          {done ? (
                            <div className="add-to-cart-tooltip-text">
                              <p className="mb-3">
                                You have {this.props.cc}
                                {this.props.cc === 1 ? " item " : " items "} in
                                your cart.{" "}
                              </p>
                              <Link
                                to="/checkout"
                                className="btn btn-block custom-button proceed-to-checkout"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <span>PROCEED TO CHECKOUT</span>
                              </Link>
                              <Link
                                to="/"
                                className="btn btn-block custom-button continue-shopping"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <span>CONTINUE SHOPPING</span>
                              </Link>
                            </div>
                          ) : null}

                          {persistingCart || savingCart ? (
                            <button
                              className="btn btn-block custom-button"
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
                              className="btn btn-block custom-button"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              disabled={done || product.quantity <= 0}
                              onClick={(e) =>
                                this.addToCart(e, {
                                  // id: product.id,
                                  product: {
                                    id: product.id,
                                    name: product.name,
                                  },
                                  quantity: this.state.quantity,
                                })
                              }
                            >
                              <span className="mr-1">
                                <IoIosCart />
                              </span>{" "}
                              <span>ADD TO CART</span>
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="product-share-section">
                        <span style={{ flex: "1" }}>
                          <b>
                            Share:
                            <MdShare />
                          </b>
                        </span>
                        <div>
                          <span>
                            <CgFacebook />
                          </span>
                          <span>
                            <SiTwitter />
                          </span>
                          <span>
                            <RiInstagramFill />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* <MainProductInfoSkeleton /> */}
                </div>
              </div>

              <div
                className="product-description mt-3"
                style={{ minHeight: "150px" }}
              >
                <h5 className="mb-2" style={{ textDecoration: "underline" }}>
                  Features and Specifications
                </h5>
                {!product ? (
                  <MainProductDescSkeleton />
                ) : (
                  <p
                    className="description-content"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  ></p>
                )}
              </div>

              <div className="related-products mt-3">
                <h5 style={{ textDecoration: "underline" }} className="mb-3">
                  You may also like
                </h5>
                <div className="mb-3">
                  {!relatedProducts ? (
                    <MainProductRelatedSkeleton />
                  ) : (
                    <OwlCarousel
                      // className="owl-theme"
                      loop={false}
                      margin={10}
                      dots={false}
                      items={this.processCarouselItems()}
                    >
                      <React.Fragment>
                        {relatedProducts.map((product, idx) => {
                          return (
                            <div
                              key={product.id}
                              className="product-related-inner"
                              style={{ position: "relative" }}
                            >
                              {product.hot_deal ? (
                                <Link
                                  to={`/main-product/${product.slug}`}
                                  onClick={(e) =>
                                    this.handleLinkClick(e, product.slug)
                                  }
                                >
                                  <div id="burst-8">
                                    <div id="inner-burst">
                                      <p>
                                        <small>
                                          {this.getDealPercentage(
                                            product.price,
                                            product.deal_price
                                          )}
                                          % OFF
                                        </small>
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              ) : null}
                              <Link
                                to={`/main-product/${product.slug}`}
                                onClick={(e) =>
                                  this.handleLinkClick(e, product.slug)
                                }
                              >
                                <img
                                  src={product.img_urls[0]}
                                  alt="product-img"
                                  // height="125px"
                                />
                              </Link>
                              <div
                                style={{
                                  height: "50%",
                                  width: "100%",
                                }}
                              >
                                {" "}
                                <p
                                  className="mt-2 product-name"
                                  style={{
                                    fontSize: "11px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {product.name}
                                </p>
                                <p
                                  className="mt-1"
                                  style={{ color: "#d31c27", fontSize: "10px" }}
                                >
                                  {cur} {product.price}
                                  <span
                                    style={{
                                      textDecoration: "line-through",
                                      color: "rgba(0, 0, 0, 0.5)",
                                    }}
                                  >
                                    <small
                                      className="ml-1"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      {product.prev_price}
                                    </small>
                                  </span>
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </React.Fragment>
                    </OwlCarousel>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lvl: state._root.lvl,
    product: state.productReducer.product,
    fetchingProduct: state.productReducer.fetchingProduct,
    persistingCart: state.cartReducer.persistingCart,
    slg: state._root.slg,
    items: state.cartReducer.items,
    savingCart: state.cartReducer.savingCart,
    done: state.cartReducer.done,
    cc: state._root.cc,
    cur: state._root.cur,
  };
};

export default connect(mapStateToProps, {
  productFetchThunkActionCreator,
  persistCartThunkAction,
  saveCartThunkAction,
  persistSlug,
})(MainProduct);
