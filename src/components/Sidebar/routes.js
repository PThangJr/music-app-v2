const routes = [
  {
    to: '/',
    name: 'Trang chủ',
    Icon: () => <i className="fas fa-house-user"></i>,
  },
  {
    to: '/bang-xep-hang',
    name: 'Bảng xếp hạng',
    Icon: () => <i className="fas fa-chart-bar"></i>,
  },
  {
    to: '/bai-hat',
    name: 'Bài hát',
    Icon: () => <i className="fas fa-music"></i>,
  },
  {
    to: '/the-loai',
    name: 'Thể loại',
    Icon: () => <i className="fas fa-archive"></i>,
  },
  {
    to: '/albums',
    name: 'Albums',
    Icon: () => <i className="fas fa-images"></i>,
  },

  {
    to: '/ca-si',
    name: 'Ca sĩ',
    Icon: () => <i className="fas fa-id-card"></i>,
  },
  {
    to: '/favorites',
    name: 'Favorites',
    Icon: () => <i className="fas fa-heart"></i>,
  },
  {
    to: '/auths/login',
    name: 'Đăng nhập',
    Icon: () => <i className="fas fa-sign-in-alt"></i>,
  },
  {
    to: '/auths/register',
    name: 'Đăng ký',
    Icon: () => <i className="fas fa-sign-out-alt"></i>,
  },
];
export default routes;
