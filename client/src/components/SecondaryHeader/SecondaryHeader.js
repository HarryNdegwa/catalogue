import React from "react";
import { connect } from "react-redux";

import "./SecondaryHeader.css";
import { NavLink } from "react-router-dom";
import { setCategory } from "../../redux/actions/productsActions";

class SecondaryHeader extends React.Component {
  render() {
    return (
      <div className="secondary-header">
        <div className="custom-width">
          <ul className="secondary-header-menu d-flex">
            <li>
              <NavLink to="/" exact activeClassName="secondary-active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/hot-deals" activeClassName="secondary-active">
                Hot Deals
              </NavLink>
            </li>
            <li
              onClick={(e) => {
                this.props.setCategory("laptops");
              }}
            >
              <NavLink to="/laptops" activeClassName="secondary-active">
                Laptops
              </NavLink>
            </li>
            <li
              onClick={(e) => {
                this.props.setCategory("smartphones");
              }}
            >
              <NavLink to="/smartphones" activeClassName="secondary-active">
                SmartPhones
              </NavLink>
            </li>
            <li
              onClick={(e) => {
                this.props.setCategory("accessories");
              }}
            >
              <NavLink to="/accessories" activeClassName="secondary-active">
                Accessories
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(null, { setCategory })(SecondaryHeader);
