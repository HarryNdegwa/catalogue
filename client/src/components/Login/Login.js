import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Login.css";
import TopHeader from "../TopHeader/TopHeader";
import MainHeader from "../MainHeader/MainHeader";
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";
import { Link } from "react-router-dom";
import { loginThunkActionCreator } from "../../redux/actions/AuthActions";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address!").required("Required!"),
  // username: Yup.string().required("Required!"),
  password: Yup.string().required("Required!"),
});
class LoginForm extends React.Component {
  render() {
    const { loginError, loginLoading, lvl } = this.props;
    if (lvl === 1) return <Redirect to="/admin" />;
    if (lvl === 2) return <Redirect to="/" />;

    return (
      <div className="main login">
        <div className="content">
          <TopHeader />
          <MainHeader />
          <SecondaryHeader />
          <div className="custom-width">
            <h3 className="my-3" style={{ textAlign: "center" }}>
              Login
            </h3>
            {loginError !== "" ? (
              <ul className="col-11 col-md-5 mx-auto p-0">
                <li style={{ marginLeft: "20px", color: "red" }}>
                  {loginError}
                </li>
              </ul>
            ) : null}

            <div className="col-11 col-md-5 mx-auto p-0">
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={loginSchema}
                onSubmit={(values) => {
                  if (Object.keys(values).length === 0) {
                    return;
                  }
                  this.props.loginThunkActionCreator(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="login-form form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      name="email"
                      type="text"
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

                    {loginLoading ? (
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
                        Login
                      </button>
                    )}
                  </Form>
                )}
              </Formik>
              <div className="d-flex justify-content-between">
                <p>
                  <Link to="/forgot-password" className="link">
                    Forgot password?
                  </Link>
                </p>
                <p>
                  <Link to="/register" className="link">
                    Sign Up
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
    loginError: state.authReducer.loginError,
    loginLoading: state.authReducer.loginLoading,
    lvl: state._root.lvl,
  };
};

export default connect(mapStateToProps, {
  loginThunkActionCreator,
})(LoginForm);
