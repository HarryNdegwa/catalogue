import React from "react";
import { connect } from "react-redux";

import "./Payment.css";
import TopHeader from "../TopHeader/TopHeader";
import MainHeader from "../MainHeader/MainHeader";
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";
import Footer from "../Footer/Footer";
import { paymentThunkAction } from "../../redux/actions/paymentActions";

class Payment extends React.Component {
  state = {
    paymentMethod: null,
  };

  radioChange = (e) => {
    this.setState({
      paymentMethod: e.target.value,
    });
  };

  handleProceedClick = (e) => {
    e.preventDefault();
    this.props.paymentThunkAction({
      method: this.state.paymentMethod,
      currency: this.props.cur,
    });
  };

  render() {
    const { cur, paying } = this.props;
    return (
      <div className="main">
        {paying ? (
          <div className="payment-spinner">
            <span
              className="spinner-border spinner-border-lg"
              role="status"
              aria-hidden="true"
            ></span>
          </div>
        ) : null}
        <div className="content">
          <TopHeader />
          <MainHeader />
          <SecondaryHeader />
          <div className="custom-width">
            <h3>Payment</h3>
            <p>Choose your payment method.</p>
            <div className="my-3 radios-wrapper">
              <div>
                <input
                  onChange={this.radioChange}
                  className="mr-1"
                  type="radio"
                  id="mpesa"
                  name="paymentMethod"
                  value="mpesa"
                  disabled={cur !== "KSH" ? true : false}
                />
                <label
                  htmlFor="mpesa"
                  className={`${cur !== "KSH" ? "grey" : null}`}
                >
                  Mpesa
                  {cur !== "KSH" ? (
                    <small style={{ fontWeight: "bold" }} className="ml-2">
                      Applicable on KSH ONLY.
                    </small>
                  ) : null}
                </label>
              </div>
              <div>
                <input
                  onChange={this.radioChange}
                  className="mr-1"
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                />
                <label htmlFor="paypal">Paypal</label>
              </div>
              <div>
                <input
                  onChange={this.radioChange}
                  className="mr-1"
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                />
                <label htmlFor="card">Debit/Credit card</label>
              </div>
            </div>
            <div className="mb-3">
              <button
                disabled={this.state.paymentMethod ? false : true}
                type="submit"
                className="btn mt-2 custom-button"
                onClick={this.handleProceedClick}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cur: state._root.cur,
    paying: state.paymentReducer.paying,
  };
};

export default connect(mapStateToProps, { paymentThunkAction })(Payment);
