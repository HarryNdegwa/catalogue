import axios from "axios";

const BASE_URL = "http://google.com/";

// axios is amazing.
// lets got for global config, This is how it is done
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.get["Accept"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

// custom instance
// is similar to global config but it is scoped to specific component eg

import axios from "axios";

const customInstance = axios.create({
  baseURL: BASE_URL,
});

// component specific config
customInstance.defaults.headers.get["Accept"] = "application/json";
customInstance
  .get("/data")
  .then((res) => {
    console.log(res);
  })
  .catch(err);

// axios interceptors are handy for removing the general global config from custom instances
// or global config eg
import axios from "axios";

const otherInstance = axios.create({
  baseURL: BASE_URL,
});

// setup the request interceptor
otherInstance.interceptors.requert.use(
  function (config) {
    // do something to config
    if (config.baseURL === "https://axios-app.firebaseio.com/users.json") {
      // config.timeout = 4000;
      config.headers.get["accept"] = "application/json";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// response interceptor
otherInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
