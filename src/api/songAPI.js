import axiosClient from './axiosClient';

const songsAPI = {
  getSongs(payload) {
    const params = payload?.params;
    let url = `/songs`;
    if (payload?.subUrl) {
      url = `/songs${payload.subUrl}`;
    }
    return axiosClient.get(url, { params });
  },
  getSongsOfRanking(payload) {
    let { params = {} } = payload;
    params = { sort: '-views slug', limit: params.limit || 100, page: params.page || 1 };
    const url = '/songs';
    return axiosClient.get(url, { params });
  },
  getSongsOfSinger(payload) {
    const singerSlug = payload?.singerSlug || '';
    const url = `/songs/singer/${singerSlug}`;
    return axiosClient.get(url);
  },
  getSongsOfAlbum(payload) {
    let albumSlug = payload?.albumSlug || '';
    const url = `/albums/songs/${albumSlug}`;
    return axiosClient.get(url);
  },
  createSong(data) {
    const url = '/songs';
    return axiosClient.post(url, data);
  },
  updateSong(payload) {
    const songId = payload?.songId || '';
    const data = payload?.data || {};
    // console.log(`payload`, payload);
    const url = `/songs/${songId}`;
    return axiosClient.put(url, data);
  },
  updateViewsOfSong(payload) {
    const id = payload?.id || '';
    const data = payload?.data || {};
    const url = `/songs/${id}/views/update`;
    return axiosClient.put(url, data);
  },
  deleteSong(id) {
    const url = `/songs/${id}`;
    return axiosClient.delete(url);
  },
};
export default songsAPI;
