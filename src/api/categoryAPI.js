import axiosClient from './axiosClient';

const categoryAPI = {
  getCategories(payload) {
    const params = payload?.params;
    const url = '/categories';
    return axiosClient.get(url, { params });
  },
  getCategoryBySlug(slug) {
    const url = `/categories/${slug}`;
    return axiosClient.get(url);
  },
};
export default categoryAPI;
