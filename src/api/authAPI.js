import axiosClient from "./axiosClient";

const authAPI = {
  login(data) {
    const url = "/auths/login";
    return axiosClient.post(url, data);
  },
  register(data) {
    const url = "/auths/register";
    return axiosClient.post(url, data);
  },
};
export default authAPI;
