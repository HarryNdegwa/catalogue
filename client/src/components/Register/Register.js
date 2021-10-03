import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Register.css";
import TopHeader from "../TopHeader/TopHeader";
import MainHeader from "../MainHeader/MainHeader";
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";
import { registerThunkActionCreator } from "../../redux/actions/AuthActions";

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Required!"),
  lastName: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email address!").required("Required!"),
  password: Yup.string()
    .min(8, "Must be more than 8 characters.")
    .required("Required!"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  //   test confirm password with required
});

class RegisterForm extends React.Component {
  render() {
    const { registerError, registerLoading } = this.props;

    console.log(registerError);
    return (
      <div className="main register">
        <div className="content">
          <TopHeader />
          <MainHeader />
          <SecondaryHeader />
          <div className="custom-width">
            <h3 className="my-3" style={{ textAlign: "center" }}>
              Register
            </h3>
            {registerError !== "" ? (
              <ul className="col-11 col-md-5 mx-auto p-0">
                <li style={{ marginLeft: "20px", color: "red" }}>
                  {registerError}
                </li>
              </ul>
            ) : null}
            <div className="col-11 col-md-5 mx-auto p-0">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={registerSchema}
                onSubmit={(values) => {
                  const payload = { ...values };
                  payload.first_name = values.firstName;
                  payload.last_name = values.lastName;
                  delete payload.firstName;
                  delete payload.lastName;

                  this.props.registerThunkActionCreator(payload);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="register-form form-group">
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
                      type="email"
                      className="form-control auth-field"
                    />
                    {errors.email && touched.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}
                    <label htmlFor="password">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control auth-field"
                    />
                    {errors.password && touched.password ? (
                      <p className="form-error">{errors.password}</p>
                    ) : null}
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className="form-control auth-field"
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <p className="form-error">{errors.confirmPassword}</p>
                    ) : null}
                    {registerLoading ? (
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
                        type="submit"
                        className="btn btn-block mt-2 custom-button"
                      >
                        Register
                      </button>
                    )}
                  </Form>
                )}
              </Formik>
              <div className="mb-4">
                <p>
                  <Link to="/login" className="link">
                    Already have an account?Sign in
                  </Link>
                </p>
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
    registerLoading: state.authReducer.registerLoading,
    registerError: state.authReducer.registerError,
  };
};

export default connect(mapStateToProps, { registerThunkActionCreator })(
  RegisterForm
);
