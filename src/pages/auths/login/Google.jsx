import React from 'react';
import GoogleLogin from 'react-google-login';
const Google = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const handleLoginSuccess = (response) => {
    console.log(response);
  };
  const handleLoginFailure = (response) => {
    console.log(response);
  };
  return (
    <>
      <GoogleLogin
        className="login-google"
        clientId={clientId}
        buttonText="Đăng nhập bằng Google"
        isSignIn={true}
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
      />
    </>
  );
};

export default Google;
