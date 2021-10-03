import React from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { connect } from "react-redux";

import "./AdminHeader.css";
import { logoutThunkAction } from "../../redux/actions/rootActions";
import { wishListZero } from "../../redux/actions/wishlistActions";
import { history } from "../../index";

class AdminHeader extends React.Component {
  handleLogout = async (e) => {
    this.props.logoutThunkAction();
    this.props.wishListZero();
    history.push("/");
  };
  render() {
    return (
      <div className="admin-header">
        <div className="custom-width admin-header-inner">
          <Link to="/admin" className="custom-white-link">
            <h2>
              <span>Electro</span>
              <AiFillStar style={{ color: "#d31c27", fontSize: "20px" }} />
            </h2>
          </Link>
          <ul className="admin-menu">
            <li>
              <Link to="/">Shop</Link>
            </li>
            <li>
              <p className="admin-logout" onClick={this.handleLogout}>
                Logout
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { logoutThunkAction, wishListZero })(
  AdminHeader
);
