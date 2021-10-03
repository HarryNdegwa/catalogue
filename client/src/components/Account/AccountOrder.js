import React from "react";
import { connect } from "react-redux";

import "./AccountOrder.css";
import MainHeader from "../MainHeader/MainHeader";
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";
import Footer from "../Footer/Footer";
import AccountMenu from "./AccountMenu";
import Orders from "./Orders";
import TopHeader from "../TopHeader/TopHeader";

class AccountOrder extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="content">
          <TopHeader />
          <MainHeader />
          <SecondaryHeader />
          <div className="custom-width">
            <div className="row">
              <div className="col-md-3 my-3">
                <AccountMenu />
              </div>
              <div className="col-md-9 account-content-wrapper">
                <div className="order-items-wrapper">
                  <Orders />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(AccountOrder);
