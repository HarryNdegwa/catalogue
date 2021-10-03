import React from "react";
import Footer from "../Footer/Footer";
import MainHeader from "../MainHeader/MainHeader";
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";
import TopHeader from "../TopHeader/TopHeader";

import "./PaymentError.css";

function PaymentError(props) {
  return (
    <div className="main">
      <div className="content">
        <TopHeader />
        <MainHeader />
        <SecondaryHeader />
        <div className="custom-width">
          <h3>Error</h3>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PaymentError;
