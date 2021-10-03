import React from "react";
import MainHeader from "../MainHeader/MainHeader";
import Products from "../Products/Products";
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";
import TopHeader from "../TopHeader/TopHeader";
import "./Search.css";
import { connect } from "react-redux";
import "./Search400";
import Search400 from "./Search400";
import { fetchSearchProductsThunkActionCreator } from "../../redux/actions/productsActions";

class Search extends React.Component {
  componentDidMount() {
    window.addEventListener("beforeunload", (e) => {
      sessionStorage.setItem("searchRefresh", true);
    });

    if (sessionStorage.getItem("searchRefresh")) {
      const data = {
        search: sessionStorage.getItem("searchTerms"),
      };
      this.props.fetchSearchProductsThunkActionCreator(data);
    }
  }

  componentWillUnmount() {
    window.addEventListener("beforeunload", null);
  }

  processItems(n) {
    if (n.length === 1) {
      return "item";
    }
    return "items";
  }

  render() {
    const { searchBadRequest, products } = this.props;
    return (
      <div className="home main">
        <div className="content">
          <TopHeader />
          <MainHeader />
          <SecondaryHeader />
          <div className="custom-width">
            {searchBadRequest ? (
              <Search400 />
            ) : (
              <React.Fragment>
                <div className="search-content-header mt-2 mb-4">
                  {products && (
                    <h6>
                      <span style={{ color: "#d31c27", fontWeight: "bold" }}>
                        {products.length}
                      </span>{" "}
                      {this.processItems(products)} found
                    </h6>
                  )}
                </div>
                {products && <Products />}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchBadRequest: state.productsReducer.searchBadRequest,
    products: state.productsReducer.products,
    pageRefreshed: state.productsReducer.searchPageRefreshed,
  };
};

export default connect(mapStateToProps, {
  fetchSearchProductsThunkActionCreator,
})(Search);
