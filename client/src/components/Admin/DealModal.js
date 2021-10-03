import React from "react";
import Modal from "react-bootstrap/Modal";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import {
  dealSaveThunkAction,
  setDealSavedFalse,
} from "../../redux/actions/dealActions";

const dealSchema = Yup.object().shape({
  currentPrice: Yup.number().required("Required!"),
  dealPrice: Yup.number().required("Required!"),
  dealDuration: Yup.number().required("Required!"),
  dealQuantity: Yup.number().required("Required!"),
});

function DealModal(props) {
  const saving = props["saving"];
  const saved = props["saved"];
  const id = props["id"];
  const customProps = {
    currentprice: props["currentprice"],
    show: props["show"],
    onHide: props["onHide"],
  };

  const customHide = () => {
    props.onHide();
    props.setDealSavedFalse();
  };

  return (
    <Modal
      {...customProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>Hot Deal Form</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            currentPrice: props.currentprice || "",
            dealPrice: "",
            dealDuration: "",
            dealQuantity: "",
          }}
          enableReinitialize={true}
          validationSchema={dealSchema}
          onSubmit={(values) => {
            const payload = {
              id: id,
              deal_price: values["dealPrice"],
              deal_duration: values["dealDuration"],
              deal_quantity: values["dealQuantity"],
              type: "deal",
            };

            props.dealSaveThunkAction(payload);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-row deal-form">
                <div className="form-group col-md-3">
                  <label htmlFor="currentPrice">Current Price</label>
                  <Field
                    name="currentPrice"
                    type="number"
                    className="form-control"
                    id="currentPrice"
                    readOnly
                  />
                  {errors.currentPrice && touched.currentPrice ? (
                    <p>{errors.currentPrice}</p>
                  ) : null}
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="dealPrice">Deal Price</label>
                  <Field
                    name="dealPrice"
                    type="number"
                    className="form-control"
                    id="dealPrice"
                  />
                  {errors.dealPrice && touched.dealPrice ? (
                    <p>{errors.dealPrice}</p>
                  ) : null}
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="dealDuration">Deal Duration (Days)</label>
                  <Field
                    name="dealDuration"
                    type="number"
                    className="form-control"
                    id="dealDuration"
                  />
                  {errors.dealDuration && touched.dealDuration ? (
                    <p>{errors.dealDuration}</p>
                  ) : null}
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="dealQuantity">Deal Quantity</label>
                  <Field
                    name="dealQuantity"
                    type="number"
                    className="form-control"
                    id="dealQuantity"
                  />
                  {errors.dealQuantity && touched.dealQuantity ? (
                    <p>{errors.dealQuantity}</p>
                  ) : null}
                </div>
              </div>
              {!saved ? (
                <React.Fragment>
                  {" "}
                  {saving ? (
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
                      className="btn btn-block custom-button"
                    >
                      Save
                    </button>
                  )}
                </React.Fragment>
              ) : (
                <button
                  onClick={customHide}
                  className="btn btn-block custom-button"
                >
                  Close
                </button>
              )}
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    saving: state.dealReducer.saving,
    saved: state.dealReducer.saved,
  };
};

export default connect(mapStateToProps, {
  dealSaveThunkAction,
  setDealSavedFalse,
})(DealModal);
