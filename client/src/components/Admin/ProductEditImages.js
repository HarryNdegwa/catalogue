import React, { useState, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { connect } from "react-redux";
import { FaTrash } from "react-icons/fa";

import AdminHeader from "./AdminHeader";
import "./ProductEditImages.css";
import {
  productImgUploadThunkActionCreator,
  setProductImagesCount,
  setProductAllImgSavedFalse,
  setProductAllImgSavedTrue,
} from "../../redux/actions/ProductPublishActions";
import { Link } from "react-router-dom";
import axios from "../../axiosApi";
import { BASE_URL } from "../../axiosApi";
let processImageUrls = (data) => {
  const imgUrls = data.img_urls.split(",");
  const newImgUrls = imgUrls.map((d, idx) => {
    return `${BASE_URL}${d.substring(1)}`;
  });
  data.img_urls = newImgUrls;
  return data;
};

const ProductEditImages = (props) => {
  const [image, setImage] = useState("/d.jpeg");
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState();
  const [images, setEditImages] = useState([]);
  const [id, setId] = useState();

  const { slug, setProductImagesCount, setProductAllImgSavedTrue } = props;

  useEffect(() => {
    axios
      .get("product/" + slug + "/")
      .then((res) => {
        const data = processImageUrls(res.data);
        setEditImages(data.img_urls);
        setId(res.data.id);
        setProductImagesCount({ count: data.img_urls.length });
        setProductAllImgSavedTrue();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug, setProductImagesCount, setProductAllImgSavedTrue]);

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
      //   window.location.reload();
    }
  };

  const handleDelete = (e, img, id) => {
    axios
      .put(
        "delete/image/" + id + "/",
        { url: img },
        {
          headers: {
            Authorization: "Token " + props._id,
          },
        }
      )

      .then((res) => {
        props.setProductAllImgSavedFalse();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { productImgUploadLoading, productImagesCount, productAllImgSaved } =
    props;

  return (
    <div className="main product-form">
      <div className="content">
        <AdminHeader />
        <div className="custom-width">
          <h3 className="my-3" style={{ textAlign: "center" }}>
            Edit Images
          </h3>
          <div className="col-11 col-md-10 mx-auto p-0">
            <div className="row">
              {images.map((img, idx) => (
                <div className="col-6 col-md-3 my-2 edit-image" key={idx}>
                  <span
                    className="edit-trash"
                    onClick={(e) => handleDelete(e, img, id)}
                  >
                    <FaTrash style={{ color: "#d31c27", cursor: "pointer" }} />
                  </span>
                  <img src={img} width="100%" alt="" />
                </div>
              ))}
            </div>
          </div>
          <div className="col-11 col-md-10 mx-auto p-0">
            <div style={{ width: "100%" }}>
              {productImagesCount < 4 ? (
                <React.Fragment>
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
                      <img
                        style={{ width: "100%" }}
                        src={cropData}
                        alt="cropped"
                      />
                    ) : null}
                  </div>
                </React.Fragment>
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
    slug: state._root.slg,
    _id: state._root._id,
  };
};

export default connect(mapStateToProps, {
  productImgUploadThunkActionCreator,
  setProductImagesCount,
  setProductAllImgSavedFalse,
  setProductAllImgSavedTrue,
})(ProductEditImages);
