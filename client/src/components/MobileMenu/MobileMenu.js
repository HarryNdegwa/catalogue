import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { RiCloseLine } from "react-icons/ri";

import "./MobileMenu.css";
import { wishListZero } from "../../redux/actions/wishlistActions";
import { history } from "../../index";
import { logoutThunkAction } from "../../redux/actions/rootActions";

class MobileMenu extends React.Component {
  handleCloseMenu = () => {
    this.props.action();
  };
  handleLogout = () => {
    this.props.logoutThunkAction();
    this.props.wishListZero();
    this.props.action();
    history.push("/");
  };
  render() {
    const { lvl } = this.props;
    return (
      <div className="modile-menu">
        <p onClick={this.handleCloseMenu} className="mb-5">
          <RiCloseLine style={{ fontSize: "25px" }} />
        </p>
        <div className="inner-mobile-menu">
          <ul>
            <li>
              <NavLink
                onClick={this.handleCloseMenu}
                exact
                activeClassName="mobile-menu-active"
                to="/"
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={this.handleCloseMenu}
                exact
                activeClassName="mobile-menu-active"
                to="/account"
              >
                My Account
              </NavLink>
            </li>
            {lvl === 1 ? (
              <li>
                <NavLink
                  onClick={this.handleCloseMenu}
                  exact
                  activeClassName="mobile-menu-active"
                  to="/admin"
                >
                  Dashboard
                </NavLink>
              </li>
            ) : null}
            {lvl === 1 || lvl === 0 ? (
              <li>
                <NavLink
                  onClick={this.handleCloseMenu}
                  activeClassName="mobile-menu-active"
                  to="/hot-deals"
                >
                  Hot Deals
                </NavLink>
              </li>
            ) : null}

            <li>
              <NavLink
                onClick={this.handleCloseMenu}
                activeClassName="mobile-menu-active"
                to="/about-us"
              >
                About Us
              </NavLink>
            </li>
            {lvl === 1 || lvl === 2 ? (
              <li>
                <p onClick={this.handleLogout}>Logout</p>
              </li>
            ) : (
              <li className="w-100 mt-4">
                <div>
                  <span>
                    <NavLink
                      onClick={this.handleCloseMenu}
                      activeClassName="mobile-menu-active"
                      to="/login"
                    >
                      Sign in
                    </NavLink>
                  </span>{" "}
                  |
                  <span>
                    <NavLink
                      onClick={this.handleCloseMenu}
                      activeClassName="mobile-menu-active"
                      to="/register"
                    >
                      Sign Up
                    </NavLink>
                  </span>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lvl: state._root.lvl,
  };
};

export default connect(mapStateToProps, { logoutThunkAction, wishListZero })(
  MobileMenu
);
