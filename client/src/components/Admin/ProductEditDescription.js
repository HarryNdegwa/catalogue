import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import htmlToDraft from "html-to-draftjs";

import { productSaveThunkActionCreator } from "../../redux/actions/ProductPublishActions";
import AdminHeader from "./AdminHeader";
import "./ProductDescription.css";
import axios from "../../axiosApi";

class ProductEditDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  componentDidMount() {
    axios
      .get("product/" + this.props.slug + "/")
      .then((res) => {
        const html = res.data.description;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const editorState = EditorState.createWithContent(contentState);
          this.setState({
            editorState: editorState,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleDescSave = (e, id) => {
    e.preventDefault();
    const data = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );

    if (data !== "") {
      this.props.productSaveThunkActionCreator({ description: data });
    } else {
      return;
    }
  };

  render() {
    const { editorState } = this.state;
    const { productSaved, productSaveLoading, id } = this.props;
    return (
      <div className="main product-form">
        <div className="content">
          <AdminHeader />
          <div className="custom-width">
            <h3 className="my-3" style={{ textAlign: "center" }}>
              Description
            </h3>
            <div className="col-11 col-md-10 mx-auto p-0">
              <Editor
                editorState={editorState}
                wrapperClassName="description-editor"
                editorClassName="editor-content-section"
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                  image: {
                    className: "test",
                    component: undefined,
                    popupClassName: undefined,
                    urlEnabled: true,
                    uploadEnabled: true,
                    alignmentEnabled: true,
                    uploadCallback: undefined,
                    previewImage: false,
                    inputAccept:
                      "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                    alt: { present: false, mandatory: false },
                    defaultSize: {
                      height: "auto",
                      width: "auto",
                    },
                  },
                }}
              />
              {!productSaved ? (
                <React.Fragment>
                  {productSaveLoading ? (
                    <button
                      className="btn btn-block mt-2 mb-3 custom-button"
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
                      className="btn btn-block mt-2 mb-3 custom-button"
                      onClick={(e) => this.handleDescSave(e, id)}
                    >
                      Save
                    </button>
                  )}
                </React.Fragment>
              ) : (
                <Link
                  to="/product/edit/images"
                  className="btn btn-block mt-2 mb-3 custom-button"
                >
                  Next
                </Link>
              )}
            </div>
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
    id: state.productPublishReducer.id,
    slug: state._root.slg,
  };
};

export default connect(mapStateToProps, { productSaveThunkActionCreator })(
  ProductEditDescription
);
