import React from "react";
import AdminHeader from "./AdminHeader";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import "./ProductForm.css";
import { Link } from "react-router-dom";
import { productBasicSaveThunkActionCreator } from "../../redux/actions/ProductPublishActions";
import axios from "../../axiosApi";

const basicInfoSchema = Yup.object().shape({
  name: Yup.string().required("Required!"),
  price: Yup.number().required("Required!"),
  prev_price: Yup.number().required("Required!"),
  quantity: Yup.number().required("Required!"),
  category: Yup.string().required("Required!"),
  sub_category: Yup.string().required("Required!"),
});

const filterCategories = (subcategories) => {
  let result = [];
  let map = new Map();
  for (var item of subcategories) {
    if (!map.has(item.category.name)) {
      map.set(item.category.name, true); // set any value to Map
      result.push({
        id: item.category.id,
        name: item.category.name,
      });
    }
  }
  return result;
};

const handleSubCategory = (subcategories, value) => {
  let results = subcategories.filter((c) => {
    if (c.category.name === value) {
      return { id: c.id, name: c.name };
    }
    return c;
  });
  return results;
};

class ProductForm extends React.Component {
  state = {
    data: [],
    categories: [],
    showSubCategoryField: false,
    subCategories: [],
  };
  componentDidMount() {
    axios
      .get("categories/")
      .then((res) => {
        let categories = filterCategories(res.data);
        this.setState({
          data: res.data,
          categories: categories,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  render() {
    const { productInfoSaveLoading, productInfoSaved } = this.props;
    return (
      <div className="main product-form">
        <div className="content">
          <AdminHeader />
          <div className="custom-width">
            <h3 className="my-3" style={{ textAlign: "center" }}>
              Basic Info
            </h3>
            <div className="col-11 col-md-5 mx-auto p-0">
              <Formik
                initialValues={{
                  name: "",
                  price: "",
                  prev_price: "",
                  quantity: "",
                  category: "",
                  sub_category: "",
                }}
                validationSchema={basicInfoSchema}
                onSubmit={(values) => {
                  if (Object.keys(values).length === 0) {
                    return;
                  }
                  const payload = { ...values };
                  payload["category"] = {
                    name: values.category,
                  };
                  payload["sub_category"] = {
                    name: values.sub_category,
                    category: {
                      name: values.category,
                    },
                  };
                  this.props.productBasicSaveThunkActionCreator(payload);
                }}
              >
                {({ errors, touched, handleChange }) => (
                  <Form className="basic-info-form form-group">
                    <label htmlFor="name">Name</label>
                    <Field
                      name="name"
                      type="text"
                      className="form-control auth-field"
                    />
                    {errors.name && touched.name ? (
                      <p className="form-error">{errors.name}</p>
                    ) : null}

                    <label htmlFor="price">Price</label>
                    <Field
                      name="price"
                      type="text"
                      className="form-control auth-field"
                    />
                    {errors.price && touched.price ? (
                      <p className="form-error">{errors.price}</p>
                    ) : null}

                    <label htmlFor="prev_price">Previous Price</label>
                    <Field
                      name="prev_price"
                      type="text"
                      className="form-control auth-field"
                    />
                    {errors.prev_price && touched.prev_price ? (
                      <p className="form-error">{errors.prev_price}</p>
                    ) : null}

                    <label htmlFor="quantity">Quantity</label>
                    <Field
                      name="quantity"
                      type="text"
                      className="form-control auth-field"
                    />
                    {errors.quantity && touched.quantity ? (
                      <p className="form-error">{errors.quantity}</p>
                    ) : null}

                    <label htmlFor="category">Category</label>
                    <select
                      as="select"
                      name="category"
                      type="text"
                      className="form-control auth-field"
                      onChange={(e) => {
                        handleChange(e);

                        this.setState({
                          subCategories: handleSubCategory(
                            this.state.data,
                            e.target.value
                          ),
                          showSubCategoryField: true,
                        });
                      }}
                    >
                      <option>---choose category---</option>
                      {this.state.categories.map((category, key) => (
                        <option key={key} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>

                    {errors.category && touched.category ? (
                      <p className="form-error">{errors.category}</p>
                    ) : null}

                    {this.state.showSubCategoryField ? (
                      <React.Fragment>
                        {" "}
                        <label htmlFor="sub_category">Sub Category</label>
                        <Field
                          as="select"
                          name="sub_category"
                          type="text"
                          className="form-control auth-field"
                        >
                          <option>---choose sub-category---</option>
                          {this.state.subCategories.map((category, key) => (
                            <option key={key} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </Field>
                      </React.Fragment>
                    ) : null}

                    {errors.subcategory && touched.subcategory ? (
                      <p className="form-error">{errors.subcategory}</p>
                    ) : null}

                    {!productInfoSaved ? (
                      <React.Fragment>
                        {productInfoSaveLoading ? (
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
                            Save
                          </button>
                        )}
                      </React.Fragment>
                    ) : null}

                    {productInfoSaved ? (
                      <Link
                        to="/product/description"
                        className="btn btn-block mt-2 custom-button"
                      >
                        Next
                      </Link>
                    ) : null}
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

const mapStateToProps = (state) => {
  return {
    productInfoSaveLoading: state.productPublishReducer.productInfoSaveLoading,
    productInfoSaved: state.productPublishReducer.productInfoSaved,
    subCategories: state.productPublishReducer.subCategories,
  };
};

export default connect(mapStateToProps, {
  productBasicSaveThunkActionCreator,
})(ProductForm);
