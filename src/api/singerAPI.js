import axiosClient from "./axiosClient";

const singerAPI = {
  getSingers(payload) {
    const params = payload?.params;
    const url = `/singers`;
    return axiosClient.get(url, { params });
  },
  getSingerBySlug(slug) {
    let url = `/singers/${slug}`;
    return axiosClient.get(url);
  },
};
export default singerAPI;
