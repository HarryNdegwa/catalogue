import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { connect } from "react-redux";

import AdminHeader from "./AdminHeader";
import "./ProductImages.css";
import { productImgUploadThunkActionCreator } from "../../redux/actions/ProductPublishActions";
import { Link } from "react-router-dom";

const ProductImages = (props) => {
  const [image, setImage] = useState("/d.jpeg");
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState();
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };

    if (typeof files !== undefined && Object.keys(files).length > 0) {
      reader.readAsDataURL(files[0]);
    }
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const uploadImage = (e, id) => {
    if (cropData) {
      // make a post request
      const data = { product: id, image: cropData };
      props.productImgUploadThunkActionCreator(data);
    }
  };

  const { productImgUploadLoading, productAllImgSaved, id } = props;

  return (
    <div className="main product-form">
      <div className="content">
        <AdminHeader />
        <div className="custom-width">
          <h3 className="my-3" style={{ textAlign: "center" }}>
            Images
          </h3>
          <div className="col-11 col-md-10 mx-auto p-0">
            <div style={{ width: "100%" }}>
              <input type="file" onChange={onChange} />
              <br />
              <br />
              <Cropper
                style={{ width: "100%" }}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                guides={true}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
              />
            </div>

            {productAllImgSaved ? (
              <Link to="/publish" className="btn btn-block custom-button">
                Next
              </Link>
            ) : (
              <button
                onClick={getCropData}
                className="btn btn-block custom-button mt-4"
              >
                Crop Image
              </button>
            )}

            <div className="my-2">
              {cropData ? (
                <img style={{ width: "100%" }} src={cropData} alt="cropped" />
              ) : null}
            </div>

            {cropData ? (
              <React.Fragment>
                {productImgUploadLoading ? (
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
                  <React.Fragment>
                    {productAllImgSaved ? (
                      <Link
                        to="/publish"
                        className="btn btn-block custom-button mb-3"
                      >
                        Next
                      </Link>
                    ) : (
                      <button
                        onClick={(e) => uploadImage(e, id)}
                        className="btn btn-block custom-button mb-3"
                      >
                        Upload
                      </button>
                    )}
                  </React.Fragment>
                )}
              </React.Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    productImagesCount: state.productPublishReducer.productImagesCount,
    productImgUploadLoading:
      state.productPublishReducer.productImgUploadLoading,
    productAllImgSaved: state.productPublishReducer.productAllImgSaved,
    id: state.productPublishReducer.id,
  };
};

export default connect(mapStateToProps, { productImgUploadThunkActionCreator })(
  ProductImages
);
