import {
  PRODUCT_INFO_SAVE_START,
  PRODUCT_INFO_SAVE_SUCCESS,
  PRODUCT_INFO_SAVE_ERROR,
  PRODUCT_SAVE_START,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_ERROR,
  UPLOAD_START,
  UPLOAD_ERROR,
  UPLOAD_SUCCESS,
  PUBLISH_START,
  PUBLISH_SUCCESS,
  PUBLISH_ERROR,
  PUBLISHED_FALSE,
  PRODUCT_EDIT_START,
  PRODUCT_EDIT_SAVED_FALSE,
  SET_PRODUCT_IMAGES_COUNT,
  SET_PRODUCT_IMAGES_SAVED_FALSE,
  SET_PRODUCT_IMAGES_SAVED_TRUE,
} from "../actions/actionsType";

const productPublish = {
  productInfoSaveLoading: false,
  productInfoSaved: false,
  id: "",
  productSaveLoading: false,
  productSaved: false,
  productImagesCount: 0,
  productImgUploadLoading: false,
  productAllImgSaved: false,
  publishing: false,
  published: false,
};

export const productPublishReducer = (state = productPublish, action) => {
  switch (action.type) {
    case PRODUCT_INFO_SAVE_START:
      return { ...state, productInfoSaveLoading: true };
    case PRODUCT_EDIT_START:
      return {
        ...state,
        id: action.data.id,
      };
    case PRODUCT_EDIT_SAVED_FALSE:
      return {
        ...state,
        productSaved: false,
      };
    case PRODUCT_INFO_SAVE_SUCCESS:
      return {
        ...state,
        productInfoSaveLoading: false,
        productInfoSaved: true,
        id: action.data.id,
      };
    case PRODUCT_INFO_SAVE_ERROR:
      return { ...state, productInfoSaveLoading: false };
    case PRODUCT_SAVE_START:
      return {
        ...state,
        productSaveLoading: true,
      };
    case PRODUCT_SAVE_SUCCESS:
      return {
        ...state,
        productSaveLoading: false,
        productSaved: true,
      };

    case SET_PRODUCT_IMAGES_SAVED_FALSE:
      return { ...state, productAllImgSaved: false };

    case SET_PRODUCT_IMAGES_SAVED_TRUE:
      return {
        ...state,
        productAllImgSaved: state.productImagesCount === 4 ? true : false,
      };

    case PRODUCT_SAVE_ERROR:
      return {
        ...state,
        productSaveLoading: false,
      };
    case UPLOAD_START:
      return { ...state, productImgUploadLoading: true };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        productImgUploadLoading: false,
        productImagesCount: (state.productImagesCount += 1),
        productAllImgSaved: state.productImagesCount === 4 ? true : false,
      };
    case UPLOAD_ERROR:
      return { ...state, productImgUploadLoading: false };
    case SET_PRODUCT_IMAGES_COUNT:
      return { ...state, productImagesCount: action.data.count };

    case PUBLISH_START:
      return { ...state, publishing: true };
    case PUBLISH_SUCCESS:
      return {
        ...state,
        publishing: false,
        published: true,
        productInfoSaveLoading: false,
        productInfoSaved: false,
        id: "",
        productSaveLoading: false,
        productSaved: false,
        productImagesCount: 0,
        productImgUploadLoading: false,
        productAllImgSaved: false,
      };
    case PUBLISH_ERROR:
      return { ...state, publishing: false };
    case PUBLISHED_FALSE:
      return { ...state, published: false };
    default:
      return state;
  }
};
