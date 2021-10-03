import React from "react";
import AdminHeader from "./AdminHeader";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import "./EditProductForm.css";
import { Link } from "react-router-dom";
import {
  productSaveThunkActionCreator,
  setProductEditSavedToFalse,
} from "../../redux/actions/ProductPublishActions";
import axios from "../../axiosApi";
import { productFetchThunkActionCreator } from "../../redux/actions/productActions";

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

class EditProductForm extends React.Component {
  state = {
    data: [],
    categories: [],
    // showSubCategoryField: false,
    subCategories: [],
    productInfo: null,
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

    axios
      .get("product/" + this.props.slug + "/")
      .then((res) => {
        this.setState({
          productInfo: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleNextClick = () => {
    this.props.setProductEditSavedToFalse();
  };

  render() {
    const { productSaveLoading, productSaved } = this.props;
    const { productInfo } = this.state;
    return (
      <div className="main product-form">
        <div className="content">
          <AdminHeader />
          <div className="custom-width">
            <h3 className="my-3" style={{ textAlign: "center" }}>
              Basic Info
            </h3>
            {!productInfo ? null : (
              <div className="col-11 col-md-5 mx-auto p-0">
                <Formik
                  initialValues={{
                    name: productInfo.name || "",
                    price: productInfo.price || "",
                    prev_price: productInfo.prev_price || "",
                    quantity: productInfo.quantity || "",
                    category: productInfo.category.name || "",
                    sub_category: productInfo.sub_category.name || "",
                  }}
                  validationSchema={basicInfoSchema}
                  enableReinitialize={true}
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
                    this.props.productSaveThunkActionCreator(payload);
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
                            //   showSubCategoryField: true,
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
                      {/* {this.state.showSubCategoryField ? ( */}
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
                      {/* // ) : null} */}
                      {errors.subcategory && touched.subcategory ? (
                        <p className="form-error">{errors.subcategory}</p>
                      ) : null}
                      {!productSaved ? (
                        <React.Fragment>
                          {productSaveLoading ? (
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
                      {productSaved ? (
                        <Link
                          to="/product/edit/description"
                          className="btn btn-block mt-2 custom-button"
                          onClick={this.handleNextClick}
                        >
                          Next
                        </Link>
                      ) : null}
                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productSaved: state.productPublishReducer.productSaved,
    productSaveLoading: state.productPublishReducer.productSaveLoading,
    subCategories: state.productPublishReducer.subCategories,
    slug: state._root.slg,
  };
};

export default connect(mapStateToProps, {
  productSaveThunkActionCreator,
  productFetchThunkActionCreator,
  setProductEditSavedToFalse,
})(EditProductForm);
