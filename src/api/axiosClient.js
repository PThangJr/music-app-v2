import axios from "axios";
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_LINK_API || "http://localhost:5000/api/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log(config);
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(response);
    return response.data; //Dữ liệu
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(error.response);
    if (error.response.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    }
    return Promise.reject(error.response);
  }
);

export default axiosClient;
