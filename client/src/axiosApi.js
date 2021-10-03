import axios from "axios";

import { history } from "./index";

export const BASE_URL = "https://harrison65.pythonanywhere.com/api/";
// export const BASE_URL = "http://localhost:8000/api/";

let counter = 5;

let axiosInstance = axios.create({
  baseURL: BASE_URL,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (
      originalRequest.url === `${BASE_URL}login/` &&
      error.response.data.detail === "Invalid Token"
    ) {
      originalRequest.headers["Authorization"] = "";
      return axiosInstance(originalRequest);
    }
    if (error.response === undefined) {
      while (counter > 0) {
        counter--;
        axiosInstance(originalRequest);
      }
      history.push("/");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
