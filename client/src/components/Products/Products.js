import React from "react";
import { connect } from "react-redux";

import "./Products.css";
import Product from "../Product/Product";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { fetchProductsThunkActionCreator } from "../../redux/actions/productsActions";

class Products extends React.Component {
  state = {
    sliceSize: [0, 0, 0, 0, 0, 0, 0, 0],
  };

  handlePrevious = () => {
    this.props.fetchProductsThunkActionCreator(this.props.prev);
    window.scrollTo(0, 0);
  };

  handleNext = () => {
    this.props.fetchProductsThunkActionCreator(this.props.next);
    window.scrollTo(0, 0);
  };

  render() {
    const { products, fetchingProducts, prev, next } = this.props;
    return (
      <div>
        <div className="products">
          {products === null ? (
            <React.Fragment>
              {this.state.sliceSize.map((s, idx) => {
                return <Product key={idx} fetching={fetchingProducts} />;
              })}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {products.map((product, idx) => {
                return (
                  <Product
                    key={product.id}
                    data={product}
                    fetching={fetchingProducts}
                  />
                );
              })}
            </React.Fragment>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
          }}
        >
          {products && products.length > 0 ? (
            <React.Fragment>
              {prev !== null ? (
                <p className="mr-2 pagination-controller">
                  <IoIosArrowDropleft
                    onClick={this.handlePrevious}
                    style={{ fontSize: "25px" }}
                  />
                </p>
              ) : null}

              {next !== null ? (
                <p className="ml-2 pagination-controller">
                  <IoIosArrowDropright
                    onClick={this.handleNext}
                    style={{ fontSize: "25px" }}
                  />
                </p>
              ) : null}
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productsReducer.products,
    fetchingProducts: state.productsReducer.fetchingProducts,
    prev: state.productsReducer.prev,
    next: state.productsReducer.next,
  };
};
export default connect(mapStateToProps, { fetchProductsThunkActionCreator })(
  Products
);
