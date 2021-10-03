import React from "react";
import { NavLink } from "react-router-dom";

import "./AccountMenu.css";

class AccountMenu extends React.Component {
  render() {
    return (
      <div className="account-menu-wrapper">
        <ul className="account-menu">
          <li>
            <p>
              <NavLink
                to="/account"
                className="account-link"
                activeClassName="account-menu-active"
              >
                Personal Details
              </NavLink>
            </p>
          </li>
          <li>
            <p>
              <NavLink
                to="/orders"
                className="account-link"
                activeClassName="account-menu-active"
              >
                My Orders
              </NavLink>
            </p>
          </li>
          <li>
            <p>
              <NavLink
                to="/wishlist"
                className="account-link"
                activeClassName="account-menu-active"
              >
                Saved Items
              </NavLink>
            </p>
          </li>
          {/* <li><p><NavLink></NavLink></p></li> */}
        </ul>
      </div>
    );
  }
}

export default AccountMenu;
