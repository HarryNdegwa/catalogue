import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import "./CheckOut.css";
import TopHeader from "../TopHeader/TopHeader";
import MainHeader from "../MainHeader/MainHeader";
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";
import Footer from "../Footer/Footer";
import axios from "../../axiosApi";
import { checkoutDetailsSaveThunkAction } from "../../redux/actions/checkOutActions";
import { Link } from "react-router-dom";

const detailsSchema = Yup.object().shape({
  firstName: Yup.string().required("Required!"),
  lastName: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email address!").required("Required!"),
  phone: Yup.string().required("Required!"),
  city: Yup.string().required("Required!"),
  town: Yup.string().required("Required!"),
});

class CheckOut extends React.Component {
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
  render() {
    const {
      first_name,
      last_name,
      email,
      phone,
      city,
      town,
    } = this.state.formState;
    const { savingDetails, detailsSaved } = this.props;
    return (
      <div className="main">
        <div className="content">
          <TopHeader />
          <MainHeader />
          <SecondaryHeader />
          <div className="custom-width">
            <h3 style={{ textAlign: "center" }}>Personal Details</h3>
            <div className="col-11 col-md-5 mx-auto p-0">
              <Formik
                initialValues={{
                  firstName: first_name || "",
                  lastName: last_name || "",
                  email: email || "",
                  phone: phone || "",
                  city: city || "",
                  town: town || "",
                }}
                enableReinitialize={true}
                validationSchema={detailsSchema}
                onSubmit={(values) => {
                  if (Object.keys(values).length === 0) {
                    return;
                  }
                  const payload = { ...values };
                  payload["first_name"] = values["firstName"];
                  payload["last_name"] = values["lastName"];
                  delete payload.firstName;
                  delete payload.lastName;
                  this.props.checkoutDetailsSaveThunkAction(payload);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="details-form form-group">
                    <label htmlFor="firstName">FirstName</label>
                    <Field
                      name="firstName"
                      type="text"
                      className="form-control auth-field"
                    />
                    {errors.firstName && touched.firstName ? (
                      <p className="form-error">{errors.firstName}</p>
                    ) : null}
                    <label htmlFor="lastName">LastName</label>
                    <Field
                      name="lastName"
                      type="lastName"
                      className="form-control auth-field"
                    />
                    {errors.lastName && touched.lastName ? (
                      <p className="form-error">{errors.lastName}</p>
                    ) : null}
                    <label htmlFor="email">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className="form-control auth-field"
                    />
                    {errors.email && touched.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}

                    <label htmlFor="phone">Phone</label>
                    <Field
                      name="phone"
                      type="phone"
                      className="form-control auth-field"
                    />
                    {errors.phone && touched.phone ? (
                      <p className="form-error">{errors.phone}</p>
                    ) : null}

                    <label htmlFor="city">City</label>
                    <Field
                      name="city"
                      type="city"
                      className="form-control auth-field"
                    />
                    {errors.city && touched.city ? (
                      <p className="form-error">{errors.city}</p>
                    ) : null}

                    <label htmlFor="town">Town</label>
                    <Field
                      name="town"
                      type="town"
                      className="form-control auth-field"
                    />
                    {errors.town && touched.town ? (
                      <p className="form-error">{errors.town}</p>
                    ) : null}

                    {savingDetails ? (
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
                      <React.Fragment>
                        {detailsSaved ? (
                          <Link
                            to="/payment"
                            className="btn btn-block mt-2 custom-button"
                          >
                            Next
                          </Link>
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-block mt-2 custom-button"
                          >
                            Save
                          </button>
                        )}
                      </React.Fragment>
                    )}
                  </Form>
                )}
              </Formik>
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
    savingDetails: state.checkoutDetailsReducer.savingDetails,
    detailsSaved: state.checkoutDetailsReducer.detailsSaved,
    _id: state._root._id,
  };
};

export default connect(mapStateToProps, { checkoutDetailsSaveThunkAction })(
  CheckOut
);
