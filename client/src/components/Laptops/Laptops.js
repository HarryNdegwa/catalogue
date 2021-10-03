import React from "react";
import { connect } from "react-redux";

import "./Laptops.css";
import TopHeader from "../TopHeader/TopHeader";
import MainHeader from "../MainHeader/MainHeader";
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";
import Footer from "../Footer/Footer";
import { fetchProductsCategoryThunkActionCreator } from "../../redux/actions/productsActions";
import Products from "../Products/Products";

class Laptops extends React.Component {
  componentDidMount() {
    this.props.fetchProductsCategoryThunkActionCreator("laptops");
  }
  render() {
    const { products } = this.props;
    return (
      <div className="laptops main">
        <div className="content">
          <TopHeader />
          <MainHeader />
          <SecondaryHeader />
          <div className="custom-width">
            <h3 className="my-2">Laptops</h3>
            <Products products={products} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { products: state.productsReducer.products };
};

export default connect(mapStateToProps, {
  fetchProductsCategoryThunkActionCreator,
})(Laptops);
