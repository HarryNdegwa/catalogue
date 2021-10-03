import React from "react";
import { connect } from "react-redux";

import "./AdminProducts.css";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { fetchProductsThunkActionCreator } from "../../redux/actions/productsActions";
import AdminProduct from "./AdminProduct";

class Products extends React.Component {
  state = {
    sliceSize: [0, 0, 0, 0, 0, 0, 0, 0],
  };

  handlePrevious = () => {
    this.props.fetchProductsThunkActionCreator(this.props.prev);
  };

  handleNext = () => {
    this.props.fetchProductsThunkActionCreator(this.props.next);
  };

  render() {
    const { products, fetchingProducts, prev, next } = this.props;
    return (
      <div>
        <div
          className="row mt-2 no-gutters y-cart-head"
          style={{ borderBottom: "2px solid #d4d4d4" }}
        >
          <div className="col-md-3"></div>
          <div className="col-md-4">
            <h6>Description</h6>
          </div>
          <div className="col-md-3">
            <h6>Status</h6>
          </div>
          <div className="col-md-2 text-center">
            <h6>Activities</h6>
          </div>
        </div>
        <div>
          {products === null ? (
            <React.Fragment>
              {this.state.sliceSize.map((s, idx) => {
                return <AdminProduct key={idx} fetching={fetchingProducts} />;
              })}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {products.map((product, idx) => (
                <AdminProduct
                  key={product.id}
                  data={product}
                  fetching={fetchingProducts}
                />
              ))}
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    prev: state.productsReducer.prev,
    next: state.productsReducer.next,
  };
};
export default connect(mapStateToProps, { fetchProductsThunkActionCreator })(
  Products
);
