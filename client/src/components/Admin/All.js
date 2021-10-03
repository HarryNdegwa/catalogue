import React from "react";
import AdminHeader from "./AdminHeader";
import AdminProducts from "./AdminProducts";
import { connect } from "react-redux";

import "./All.css";
import { fetchProductsThunkActionCreator } from "../../redux/actions/productsActions";
import { BASE_URL } from "../../axiosApi";

class All extends React.Component {
  componentDidMount() {
    this.props.fetchProductsThunkActionCreator(`${BASE_URL}products`);
  }
  render() {
    const { products, fetchingProducts } = this.props;
    return (
      <div className="main all-products">
        <div className="content">
          <AdminHeader />
          <div className="custom-width">
            <h3>All Products</h3>
            <AdminProducts
              products={products}
              fetchingProducts={fetchingProducts}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productsReducer.products,
    fetchingProducts: state.productsReducer.fetchingProducts,
  };
};

export default connect(mapStateToProps, { fetchProductsThunkActionCreator })(
  All
);
