import axios, { AxiosError, AxiosResponse } from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8181/api/v1",

})

axiosClient.defaults.withCredentials = true; //help allow to send cookie to browser

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`
      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )
  

axiosClient.interceptors.response.use(function (response: AxiosResponse):any{
    return response.data;
}, function(err: AxiosError){
    const status  = err && err.response && err.response.status || 500;

    switch (status) {
        // authentication (token related issues)
        case 401: {
          alert("Unauthorized the user. Please login...");
          return Promise.reject(err);
        }
  
        // forbidden (permission related issues)
        case 403: {
           // alert("You don't permission to access this resource...");
            return Promise.reject(err);
        }
  
        // bad request
        case 400: {
            return Promise.reject(err);
        }
  
        // not found
        case 404: {
            return Promise.reject(err);
        }
  
        // conflict
        case 409: {
            return Promise.reject(err);
        }
  
        // unprocessable
        case 422: {
            return Promise.reject(err);
        }
  
        // generic api error (server related) unexpected
        default: {
            return Promise.reject(err);
        }
      }
});

export default axiosClient;