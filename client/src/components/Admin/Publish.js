import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import AdminHeader from "./AdminHeader";
import "./Publish.css";
import { productPublishThunkActionCreator } from "../../redux/actions/ProductPublishActions";

class Publish extends React.Component {
  handlePublish = (e) => {
    // do something
    e.preventDefault();
    const data = { published: true };
    this.props.productPublishThunkActionCreator(data);
  };
  render() {
    const { published, publishing } = this.props;

    if (published) return <Redirect to="admin" />;
    return (
      <div className="main publish">
        <div className="content">
          <AdminHeader />
          <div className="custom-width mt-4" style={{ textAlign: "center" }}>
            <h3>Your product is now ready to go public</h3>

            {publishing ? (
              <button
                className="btn btn-md mt-3 custom-button"
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
                className="btn btn-md custom-button mt-3"
                onClick={this.handlePublish}
              >
                Publish
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    publishing: state.productPublishReducer.publishing,
    published: state.productPublishReducer.published,
  };
};

export default connect(mapStateToProps, { productPublishThunkActionCreator })(
  Publish
);
