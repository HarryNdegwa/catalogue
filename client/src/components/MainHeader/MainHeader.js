import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";
import { connect } from "react-redux";

import "./MainHeader.css";
import { Link } from "react-router-dom";
import SearchSpinner from "./SearchSpinner";
import { fetchSearchProductsThunkActionCreator } from "../../redux/actions/productsActions";

class MainHeader extends React.Component {
  state = {
    showMiniSearch: false,
    searchValue: "",
  };

  handleSearchClick = () => {
    this.setState((prevState) => {
      return {
        showMiniSearch: !prevState.showMiniSearch,
      };
    });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSearch();
    }
  };

  handleSearchInputChange = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  handleSearch = (e) => {
    if (this.state.searchValue.length > 0) {
      sessionStorage.setItem("searchTerms", this.state.searchValue);
      const data = {
        search: this.state.searchValue,
      };
      this.handleSearchClick();
      this.props.fetchSearchProductsThunkActionCreator(data);
    } else {
      return;
    }
  };

  render() {
    let { pc, cc, wishListCount, lvl, searching } = this.props;
    let { showMiniSearch } = this.state;
    if (pc === null) {
      pc = [];
    }
    return (
      <div className="main-header">
        {searching ? <SearchSpinner /> : null}
        {showMiniSearch ? (
          <div className="back-shed container py-2" id="mini-search-wrapper">
            <span onClick={this.handleSearchClick}>
              <ImCancelCircle style={{ color: "#fff" }} />
            </span>
            <div className="input-group mt-1">
              <input
                type="text"
                className="form-control mini-search-input"
                placeholder="Lenovo Thinkpad P1"
                aria-describedby="basic-addon2"
                onKeyPress={this.handleKeyPress}
                onChange={this.handleSearchInputChange}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text "
                  id="basic-addon2"
                  onClick={this.handleSearch}
                >
                  Search
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <div className="custom-width main-header-inner">
          <div id="logo">
            <Link to="/" className="custom-white-link">
              {" "}
              <h2 style={{ display: "flex", alignItems: "flex-end" }}>
                <span>Electro</span>
                <GoPrimitiveDot
                  style={{ color: "#d31c27", fontSize: "20px" }}
                />
              </h2>
            </Link>
          </div>
          <div id="search">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Lenovo Thinkpad P1"
                aria-describedby="basic-addon2"
                onKeyPress={this.handleKeyPress}
                onChange={this.handleSearchInputChange}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text"
                  id="basic-addon2"
                  onClick={this.handleSearch}
                >
                  Search
                </span>
              </div>
            </div>
          </div>

          <div id="wishlist-cart">
            <div id="mini-search">
              <FiSearch
                className="header-icon"
                onClick={this.handleSearchClick}
              />
            </div>
            <div id="header-wishlist">
              {wishListCount < 1 ? (
                <Link to="/empty-wishlist" className="custom-white-link">
                  <div className="header-icon-wrapper">
                    <FaRegHeart className="header-icon" />
                  </div>
                </Link>
              ) : (
                <Link to="/wishlist" className="custom-white-link">
                  <div className="header-icon-wrapper">
                    <FaRegHeart className="header-icon" />
                    {wishListCount < 1 ? null : (
                      <div className="custom-header-badge">
                        <p>{wishListCount}</p>
                      </div>
                    )}
                  </div>
                </Link>
              )}

              <p className="x">WishList</p>
            </div>
            <div id="header-cart">
              {pc.length < 1 && cc < 1 ? (
                <Link to="/empty-cart" className="custom-white-link">
                  <div className="header-icon-wrapper">
                    <IoIosCart className="header-icon" />
                  </div>
                </Link>
              ) : (
                <Link to="/cart" className="custom-white-link">
                  <div className="header-icon-wrapper">
                    <IoIosCart className="header-icon" />

                    {lvl === 1 || lvl === 2 ? (
                      <div className="custom-header-badge">
                        <p>{cc > 0 && cc}</p>
                      </div>
                    ) : (
                      <div className="custom-header-badge">
                        <p>{pc.length > 0 && pc.length}</p>
                      </div>
                    )}
                  </div>
                </Link>
              )}

              <p className="x">Cart</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lvl: state._root.lvl,
    cart: state.cartReducer.cart,
    pc: state._root.pc,
    cc: state._root.cc,
    wishListCount: state.wishlistReducer.wishListCount,
    searching: state.productsReducer.searching,
  };
};

export default connect(mapStateToProps, {
  fetchSearchProductsThunkActionCreator,
})(MainHeader);
