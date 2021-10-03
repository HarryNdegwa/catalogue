import {
  PRODUCT_INFO_SAVE_START,
  PRODUCT_INFO_SAVE_SUCCESS,
  PRODUCT_INFO_SAVE_ERROR,
  PRODUCT_SAVE_START,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_ERROR,
  UPLOAD_START,
  UPLOAD_SUCCESS,
  UPLOAD_ERROR,
  PUBLISH_START,
  PUBLISH_SUCCESS,
  PUBLISH_ERROR,
  PUBLISHED_FALSE,
  PRODUCT_EDIT_START,
  PRODUCT_EDIT_SAVED_FALSE,
  SET_PRODUCT_IMAGES_COUNT,
  SET_PRODUCT_IMAGES_SAVED_FALSE,
  SET_PRODUCT_IMAGES_SAVED_TRUE,
} from "./actionsType";
import axios from "../../axiosApi";
import { persistSlug } from "./rootActions";

const productEditStart = (data) => {
  return {
    type: PRODUCT_EDIT_START,
    data: data,
  };
};

const productInfoSaveStart = () => {
  return {
    type: PRODUCT_INFO_SAVE_START,
  };
};

const productInfoSaveSuccess = (data) => {
  return {
    type: PRODUCT_INFO_SAVE_SUCCESS,
    data: data,
  };
};

const productInfoSaveError = () => {
  return {
    type: PRODUCT_INFO_SAVE_ERROR,
  };
};

const productSaveStart = () => {
  return {
    type: PRODUCT_SAVE_START,
  };
};

const productSaveSuccess = () => {
  return {
    type: PRODUCT_SAVE_SUCCESS,
  };
};

const productSaveError = () => {
  return {
    type: PRODUCT_SAVE_ERROR,
  };
};

const productImageUploadStart = () => {
  return {
    type: UPLOAD_START,
  };
};

const productImageUploadSuccess = () => {
  return {
    type: UPLOAD_SUCCESS,
  };
};

const productImageUploadError = () => {
  return {
    type: UPLOAD_ERROR,
  };
};

const publishStart = () => {
  return {
    type: PUBLISH_START,
  };
};

const publishSuccess = () => {
  return {
    type: PUBLISH_SUCCESS,
  };
};

const publishError = () => {
  return {
    type: PUBLISH_ERROR,
  };
};

export const setProductEditSavedToFalse = () => {
  return {
    type: PRODUCT_EDIT_SAVED_FALSE,
  };
};

export const setProductImagesCount = (data) => {
  return {
    type: SET_PRODUCT_IMAGES_COUNT,
    data: data,
  };
};

export const setProductAllImgSavedFalse = () => {
  return {
    type: SET_PRODUCT_IMAGES_SAVED_FALSE,
  };
};

export const setProductAllImgSavedTrue = () => {
  return {
    type: SET_PRODUCT_IMAGES_SAVED_TRUE,
  };
};

const setPublishedToFalse = () => {
  return {
    type: PUBLISHED_FALSE,
  };
};

export const productBasicSaveThunkActionCreator = (data) => {
  return (dispatch, getState) => {
    dispatch(productInfoSaveStart());
    axios
      .post("products/", data, {
        headers: {
          Authorization: "Token " + getState()._root._id,
        },
      })
      .then((res) => {
        dispatch(productInfoSaveSuccess({ id: res.data.id }));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(productInfoSaveError());
      });
  };
};

export const productSaveThunkActionCreator = (data) => {
  return (dispatch, getState) => {
    dispatch(productSaveStart());
    axios
      .put("product/" + getState().productPublishReducer.id + "/", data, {
        headers: {
          Authorization: "Token " + getState()._root._id,
        },
      })
      .then((res) => {
        dispatch(persistSlug(res.data.slug));
        dispatch(productSaveSuccess());
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(productSaveError());
      });
  };
};

export const productImgUploadThunkActionCreator = (data) => {
  return (dispatch, getState) => {
    dispatch(productImageUploadStart());
    axios
      .post("upload/", data, {
        headers: {
          Authorization: "Token " + getState()._root._id,
        },
      })
      .then((res) => {
        console.log(res.response);
        dispatch(productImageUploadSuccess());
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(productImageUploadError());
      });
  };
};

export const productPublishThunkActionCreator = (data) => {
  return (dispatch, getState) => {
    dispatch(publishStart());
    axios
      .put("product/" + getState().productPublishReducer.id + "/", data, {
        headers: {
          Authorization: "Token " + getState()._root._id,
        },
      })
      .then((res) => {
        dispatch(publishSuccess());
        setTimeout(() => {
          dispatch(setPublishedToFalse());
        }, 3000);
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(publishError());
      });
  };
};

export const productEditStartThunkAction = (data) => {
  return (dispatch, getState) => {
    dispatch(productEditStart({ id: data.id }));
  };
};
