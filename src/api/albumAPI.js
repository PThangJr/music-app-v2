import axiosClient from "./axiosClient";

const albumAPI = {
  getAlbums(payload) {
    const params = payload?.params;
    let url = `/albums`;
    if (payload?.subUrl) {
      url = `/albums${payload.subUrl}`;
    }
    return axiosClient.get(url, { params });
  },
  getAlbumsOfAlbumGroups(payload) {
    const data = payload?.data;
    const params = payload?.params;
    const url = `/albums/album_groups`;
    return axiosClient.post(url, data, { params });
  },
};
export default albumAPI;
