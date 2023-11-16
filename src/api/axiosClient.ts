import axios, { AxiosError, AxiosResponse } from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8181/api/v1",
    withCredentials: true

})


axiosClient.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )
  

axiosClient.interceptors.response.use((res) => res.data
,(error)=> {

    if(error && +error.response.status === 401){
      localStorage.removeItem("accessToken");
      window.location.href = '/login';
      
      return Promise.reject(error);
    }

    if(error && +error.response.status === 403){
      console.log("Bạn không có quyền truy cập");
      return Promise.reject(error);
    }
    return error?.response?.data ?? Promise.reject(error);

    // const status  = err && err.response && err.response.status || 500;

    // switch (status) {
    //     // authentication (token related issues)
    //     case 401: {
    //       return Promise.reject(err);
    //     }
  
    //     // forbidden (permission related issues)
    //     case 403: {
    //       //toast.error(`You don't have the permission to access this resource...`)
    //         return Promise.reject(err);
            
    //     }
  
    //     // bad request
    //     case 400: {
    //         return Promise.reject(err);
    //     }
  
    //     // not found
    //     case 404: {
    //         return Promise.reject(err);
    //     }
  
    //     // conflict
    //     case 409: {
    //         return Promise.reject(err);
    //     }
  
    //     // unprocessable
    //     case 422: {
    //         return Promise.reject(err);
    //     }
  
    //     // generic api error (server related) unexpected
    //     default: {
    //         return Promise.reject(err);
    //     }
    //   }
});

export default axiosClient;