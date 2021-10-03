import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import "./ForgotPassword.css";
import TopHeader from "../TopHeader/TopHeader";
import MainHeader from "../MainHeader/MainHeader";
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address!").required("Required!"),
});

class ForgotPassword extends React.Component {
  render() {
    return (
      <div className="main forgot-password">
        <div className="content">
          <TopHeader />
          <MainHeader />
          <SecondaryHeader />
          <div className="custom-width">
            <h3 style={{ textAlign: "center" }} className="my-3">
              Request Password Reset
            </h3>
            <div className="col-11 col-md-5 mx-auto p-0">
              {" "}
              <Formik
                initialValues={{ email: "" }}
                validationSchema={forgotPasswordSchema}
                onSubmit={(value) => {
                  console.log(value);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="form-group forgot-password-form">
                    <label htmlFor="email">Email</label>
                    <Field name="email" className="form-control auth-field" />
                    {errors.email && touched.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}
                    <button
                      type="submit"
                      className="btn btn-block custom-button"
                    >
                      send
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
