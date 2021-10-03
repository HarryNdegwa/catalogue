import React from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import "./Contact.css";
import TopHeader from "../TopHeader/TopHeader";
import MainHeader from "../MainHeader/MainHeader";
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";
import Footer from "../Footer/Footer";
import { AiOutlineMail } from "react-icons/ai";
import { FiSmartphone } from "react-icons/fi";
import { ImLocation } from "react-icons/im";
import { contactSendThunkAction } from "../../redux/actions/contactActions";

const contactSchema = Yup.object().shape({
  name: Yup.string().required("Required!"),
  email: Yup.string().email().required("Required!"),
  message: Yup.string().required("Required!"),
});

class Contact extends React.Component {
  render() {
    const { sendingContact, contactSent } = this.props;
    return (
      <div className="main">
        <div className="content">
          <TopHeader />
          <MainHeader />
          <SecondaryHeader />
          <div className="custom-width">
            {!contactSent ? (
              <div className="row mt-3 contact-wrapper">
                <div className="col-md-6">
                  <div>
                    <h5 style={{ textTransform: "uppercase" }}>Get In Touch</h5>
                    <p className="my-2">
                      Our passionate customer care team is looking forward to
                      hear from you.
                    </p>
                  </div>

                  <ul>
                    <li>
                      <span
                        className="mr-2"
                        style={{ fontSize: "35px", color: "#d31c27" }}
                      >
                        <AiOutlineMail />
                      </span>
                      <span>contact@electro.com</span>
                    </li>
                    <li>
                      <span
                        className="mr-2"
                        style={{ fontSize: "35px", color: "#d31c27" }}
                      >
                        <FiSmartphone />
                      </span>
                      <span>+254799204524</span>
                    </li>
                    <li>
                      <span
                        className="mr-2"
                        style={{ fontSize: "35px", color: "#d31c27" }}
                      >
                        <ImLocation />
                      </span>
                      <span>Applewood Adams, Ngong Road</span>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6 contact-form-wrapper">
                  <div className="contact-form">
                    <h5 style={{ textTransform: "uppercase" }}>
                      Say Something
                    </h5>
                    <div>
                      <Formik
                        initialValues={{ name: "", email: "", message: "" }}
                        validationSchema={contactSchema}
                        onSubmit={(values) => {
                          this.props.contactSendThunkAction(values);
                        }}
                      >
                        {({ errors, touched }) => (
                          <Form className="form-group">
                            <label>Name</label>
                            <Field
                              className="form-control"
                              // style={{ width: "100%" }}
                              name="name"
                              type="text"
                            />
                            {errors.name && touched.name ? (
                              <p className="form-error">{errors.name}</p>
                            ) : null}

                            <label>Email</label>
                            <Field
                              className="form-control"
                              name="email"
                              type="email"
                            />
                            {errors.email && touched.email ? (
                              <p className="form-error">{errors.email}</p>
                            ) : null}

                            <label>Message</label>
                            <Field
                              className="form-control"
                              name="message"
                              type="text"
                              as="textarea"
                              rows="3"
                            />
                            {errors.message && touched.message ? (
                              <p className="form-error">{errors.message}</p>
                            ) : null}
                            {sendingContact ? (
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
                                className="btn btn-block custom-button mt-3"
                              >
                                Send
                              </button>
                            )}
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <p className="mt-4">
                  Thank you for contacting us,we will get back to you soon!
                </p>
              </div>
            )}
          </div>
        </div>
        {contactSent ? null : <div id="contact-footer"></div>}

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sendingContact: state.contactReducer.sendingContact,
    contactSent: state.contactReducer.contactSent,
  };
};

export default connect(mapStateToProps, { contactSendThunkAction })(Contact);
