import React from "react";
import axios from "axios";

import React, { Component } from "react";

let axios = axios;

const errorHandler = (WrappedComponent, axios) => {
  return class EH extends Component {
    state = {
      error: null,
    };

    componentDidMount() {
      //   const cancelToken = axios.cancelToken;
      //   this.source = cancelToken.source();

      //   Note: you can cancel several requests with the same cancel token.

      this.axiosInstance = axios.create({
        baseUrl: "/",
        timeout: 5000,
      });

      this.axiosInstance.cancelToken = this.source.token;

      this.axiosInstance;

      // Set axios interceptors
      this.axiosInstance.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });

      this.axiosInstance.interceptors.response.use(
        (res) => res,
        (error) => {
          alert("Error happened");
          this.setState({ error });
        }
      );
    }

    // componentWillUnmount() {
    //   // Remove handlers, so Garbage Collector will get rid of if WrappedComponent will be removed
    //   //   Makes the interceptor have no effect on the request or response
    //   axios.interceptors.request.eject(this.requestInterceptor);
    //   axios.interceptors.response.eject(this.responseInterceptor);

    //   //   we want to cancel the request here
    //   this.source.cancel();
    // }

    //     axios.get('/user/12345')
    //   .catch(function (error) {
    //     if (error.response) {
    //       // The request was made and the server responded with a status code
    //       // that falls out of the range of 2xx
    //       console.log(error.response.data);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //     } else if (error.request) {
    //       // The request was made but no response was received
    //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //       // http.ClientRequest in node.js
    //       console.log(error.request);
    //     } else {
    //       // Something happened in setting up the request that triggered an Error
    //       console.log('Error', error.message);
    //     }
    //     console.log(error.config);
    //   });

    render() {
      let renderSection = this.state.error ? (
        <div>Error</div>
      ) : (
        //   pass the axios instance here as props
        <WrappedComponent {...this.props} />
      );
      return renderSection;
    }
  };
};

export default errorHandler;
