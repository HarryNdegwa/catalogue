import React from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";

import "./Account.css";
import TopHeader from "../TopHeader/TopHeader";
import MainHeader from "../MainHeader/MainHeader";
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";
import Footer from "../Footer/Footer";
import AccountMenu from "./AccountMenu";
import axios from "../../axiosApi";
import { updateAccountThunkAction } from "../../redux/actions/accountActions";

const accountDetailsSchema = Yup.object().shape({
  firstName: Yup.string().required("Required!"),
  lastName: Yup.string().required("Required!"),
  email: Yup.string().email().required("Required!"),
  phone: Yup.string().required("Required!"),
  city: Yup.string().required("Required!"),
  town: Yup.string().required("Required!"),
});

class Account extends React.Component {
  state = {
    formState: {},
  };

  componentDidMount() {
    axios
      .get("details/", {
        headers: {
          Authorization: "Token " + this.props._id,
        },
      })
      .then((res) => {
        this.setState({ formState: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  buttonState = (touched) => {
    if (Object.keys(touched).length === 0) {
      return true;
    }
    return false;
  };

  render() {
    const {
      first_name,
      last_name,
      email,
      phone,
      city,
      town,
    } = this.state.formState;
    const { updatingAccount } = this.props;
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
                <h3 className="mb-2 text-center">Personal Details</h3>
                <Formik
                  validationSchema={accountDetailsSchema}
                  initialValues={{
                    firstName: first_name || "",
                    lastName: last_name || "",
                    email: email || "",
                    phone: phone || "",
                    city: city || "",
                    town: town || "",
                  }}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    // console.log(values);
                    const payload = { ...values };
                    payload.first_name = payload.firstName;
                    payload.last_name = payload.lastName;
                    delete payload.firstName;
                    delete payload.lastName;
                    this.props.updateAccountThunkAction(payload);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="form-group account-details-form">
                      <label htmlFor="firstName">First Name</label>
                      <Field
                        name="firstName"
                        type="text"
                        className="form-control auth-field"
                      />
                      {errors.firstName && touched.firstName ? (
                        <p className="form-error">{errors.firstName}</p>
                      ) : null}

                      <label htmlFor="lastName">Last Name</label>
                      <Field
                        name="lastName"
                        type="text"
                        className="form-control auth-field"
                      />
                      {errors.lastName && touched.lastName ? (
                        <p className="form-error">{errors.lastName}</p>
                      ) : null}

                      <label htmlFor="email">Email</label>
                      <Field
                        name="email"
                        type="text"
                        className="form-control auth-field"
                      />
                      {errors.email && touched.email ? (
                        <p className="form-error">{errors.email}</p>
                      ) : null}

                      <label htmlFor="phone">Phone</label>
                      <Field
                        name="phone"
                        type="text"
                        className="form-control auth-field"
                      />
                      {errors.phone && touched.phone ? (
                        <p className="form-error">{errors.phone}</p>
                      ) : null}

                      <label htmlFor="city">City</label>
                      <Field
                        name="city"
                        type="text"
                        className="form-control auth-field"
                      />
                      {errors.city && touched.city ? (
                        <p className="form-error">{errors.city}</p>
                      ) : null}

                      <label htmlFor="town">Town</label>
                      <Field
                        name="town"
                        type="text"
                        className="form-control auth-field"
                      />
                      {errors.town && touched.town ? (
                        <p className="form-error">{errors.town}</p>
                      ) : null}

                      {updatingAccount ? (
                        <button
                          className="btn btn-block mt-2 custom-button"
                          type="button"
                          disabled
                        >
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        </button>
                      ) : (
                        <button
                          disabled={this.buttonState(touched)}
                          type="submit"
                          className="btn btn-block custom-button mt-3"
                        >
                          Update
                        </button>
                      )}
                    </Form>
                  )}
                </Formik>
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
  return {
    updatingAccount: state.accountReducer.updatingAccount,
    _id: state._root._id,
  };
};

export default connect(mapStateToProps, { updateAccountThunkAction })(Account);
