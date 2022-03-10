import axiosClient from "./axiosClient";

const searchAPI = {
  search(payload) {
    const params = payload?.params;
    const url = `/search`;
    return axiosClient.get(url, { params });
  },
};
export default searchAPI;
