import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { ImLocation } from "react-icons/im";
import { connect } from "react-redux";

import "./TopHeader.css";
import { NavLink } from "react-router-dom";
import {
  logoutThunkAction,
  setCurrencyThunkAction,
} from "../../redux/actions/rootActions";
import { history } from "../../index";
import { wishListZero } from "../../redux/actions/wishlistActions";
import { TiArrowSortedDown } from "react-icons/ti";

class TopHeader extends React.Component {
  state = {
    currencies: ["KSH", "USD"],
  };

  handleCurrencyClick = (e, c) => {
    this.props.setCurrencyThunkAction(c);
  };

  getCurrencies = () => {
    return this.state.currencies.filter((currency) => {
      return currency !== this.props.cur;
    });
  };

  handleLogout = async (e) => {
    this.props.logoutThunkAction();
    this.props.wishListZero();
    history.push("/");
  };
  render() {
    const { wishListCount, lvl, cur } = this.props;
    return (
      <div className="top-header">
        <div className="custom-width top-header-inner">
          <div className="top-header-contact">
            <p>
              <span>
                <FaPhoneAlt style={{ color: "#d31c27" }} />
              </span>
              <span className="ml-2">0799 204 524</span>
            </p>
            <p>
              <span>
                <HiOutlineMail style={{ color: "#d31c27" }} />
              </span>
              <span className="ml-2">contact@electro.com</span>
            </p>
            <p>
              <span>
                <ImLocation style={{ color: "#d31c27" }} />
              </span>
              <span className="ml-2">Applewood Adams, Ngong Road</span>
            </p>
          </div>
          <div className="top-header-account">
            <div className="currency-tooltip">
              <div className="currency-public-content">
                <span className="ml-2" style={{ color: "#d31c27" }}>
                  <strong>
                    {cur}
                    <span>
                      <TiArrowSortedDown />
                    </span>
                  </strong>
                </span>
              </div>
              <div className="currency-tooltip-content">
                {this.getCurrencies().map((currency, idx) => (
                  <p
                    key={idx}
                    onClick={(e) => this.handleCurrencyClick(e, currency)}
                  >
                    {currency}
                  </p>
                ))}
              </div>
            </div>
            <div className="account-tooltip">
              <div className="account-public-content">
                {" "}
                <span>
                  <HiOutlineUser style={{ color: "#d31c27" }} />
                </span>
                <span className="ml-1">Account</span>
              </div>
              <div className="account-tooltip-content">
                <NavLink
                  activeClassName="tooltip-active"
                  className="account-tooltip-link"
                  to="/account"
                >
                  <p>My Account</p>
                </NavLink>
                <NavLink
                  activeClassName="tooltip-active"
                  className="account-tooltip-link"
                  to="/orders"
                >
                  <p>Orders</p>
                </NavLink>
                {wishListCount < 1 ? (
                  <NavLink
                    activeClassName="tooltip-active"
                    className="account-tooltip-link"
                    to="/empty-cart"
                  >
                    <p>Wishlist</p>
                  </NavLink>
                ) : (
                  <NavLink
                    activeClassName="tooltip-active"
                    className="account-tooltip-link"
                    to="/wishlist"
                  >
                    <p>Wishlist</p>
                  </NavLink>
                )}

                {lvl === 1 ? (
                  <NavLink
                    activeClassName="tooltip-active"
                    className="account-tooltip-link"
                    to="/admin"
                  >
                    <p>Dashboard</p>
                  </NavLink>
                ) : null}
                {lvl === 1 || lvl === 2 ? (
                  <p>
                    <span
                      className="account-tooltip-link"
                      onClick={this.handleLogout}
                    >
                      Logout
                    </span>
                  </p>
                ) : (
                  <React.Fragment>
                    <div className="d-flex justify-content-between">
                      {" "}
                      <NavLink
                        activeClassName="tooltip-active"
                        className="account-tooltip-link"
                        to="/login"
                      >
                        <p>Sign In</p>
                      </NavLink>
                      <NavLink
                        activeClassName="tooltip-active"
                        className="account-tooltip-link"
                        to="/register"
                      >
                        <p>Sign Up</p>
                      </NavLink>
                    </div>
                  </React.Fragment>
                )}
              </div>
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
    cur: state._root.cur,
    token: state.authReducer.token,
    wishListCount: state.wishlistReducer.wishListCount,
  };
};

export default connect(mapStateToProps, {
  logoutThunkAction,
  wishListZero,
  setCurrencyThunkAction,
})(TopHeader);
