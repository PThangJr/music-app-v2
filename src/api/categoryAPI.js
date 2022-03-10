import axiosClient from "./axiosClient";

const categoryAPI = {
  getCategories(payload) {
    const params = payload?.params;
    const url = "/categories";
    return axiosClient.get(url, { params });
  },
  getSongsOfRanking(payload) {
    let { params = {} } = payload;
    params = { ...params, sort: "-views" };
    const url = "/songs";
    return axiosClient.get(url, { params });
  },
  getSongsOfSinger(payload) {
    const singerSlug = payload?.singerSlug || "";
    const url = `/songs/singer/${singerSlug}`;
    return axiosClient.get(url);
  },
  getSongsOfAlbum(payload) {
    let albumSlug = payload?.albumSlug || "";
    const url = `/albums/songs/${albumSlug}`;
    return axiosClient.get(url);
  },
  createSong(data) {
    const url = "/songs";
    return axiosClient.post(url, data);
  },
  updateSong(payload) {
    const songId = payload?.songId || "";
    const data = payload?.data || {};
    console.log(`payload`, payload);
    const url = `/songs/${songId}`;
    return axiosClient.put(url, data);
  },
  deleteSong(songId) {
    const url = `/songs/${songId}`;
    return axiosClient.delete(url);
  },
};
export default categoryAPI;
