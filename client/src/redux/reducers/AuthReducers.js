import {
  LOGIN_LOADING,
  LOGIN_FAIL,
  _LOGIN_SUCCESS,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from "../actions/actionsType";

const auth = {
  loginLoading: false,
  loginError: "",
  registerLoading: false,
  registerError: "",
};

const authReducer = (state = auth, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return { ...state, loginLoading: true, loginError: "" };
    case _LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginError: "",
      };
    case LOGIN_FAIL:
      return { ...state, loginLoading: false, loginError: action.data };
    case REGISTER_LOADING:
      return { ...state, registerLoading: true };
    case REGISTER_SUCCESS:
      return { ...state, registerLoading: false, registerError: "" };
    case REGISTER_ERROR:
      return { ...state, registerLoading: false, registerError: action.data };
    default:
      return state;
  }
};

export default authReducer;
