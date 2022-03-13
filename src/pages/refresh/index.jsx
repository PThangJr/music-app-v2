import { Navigate } from 'react-router-dom';

const RefreshPage = () => {
  localStorage.clear();
  return <Navigate to="/" />;
};

export default RefreshPage;
