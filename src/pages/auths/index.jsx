import React from "react";
import "./styles.scss";
const AuthsPage = ({ children }) => {
  // const { isAuthenticate } = useSelector((state) => state.dataAuth);
  return <div className="auth-page">{children}</div>;
};

export default AuthsPage;
