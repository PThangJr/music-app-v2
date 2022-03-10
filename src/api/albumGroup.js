import axiosClient from "./axiosClient";

const albumGroupAPI = {
  getAlbumGroups(payload) {
    const params = payload?.params;
    const url = "/album_groups";
    return axiosClient.get(url, { params });
  },
};
export default albumGroupAPI;
