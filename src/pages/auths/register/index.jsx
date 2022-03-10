import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Button from "../../../components/Button";
import InputField from "../../../components/Form/FormField/InputField";
import { fetchRegister } from "../authSlice";
import "./styles.scss";
const schema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Username không được để trống!")
    .min(3, "Username ít nhất có 3 ký tự!")
    .max(15, "Username không quá 12 ký tự")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9]+\S$/i,
      "Username không có ký tự đặc biệt, khoảng trắng"
    ),

  email: yup.string().trim().required("Email không được để trống!"),
  password: yup
    .string()
    .trim()
    .required("Mật khẩu không được để trống!")
    .min(6, "Mật khẩu ít nhất có 6 ký tự!")
    .max(12, "Password không quá 12 ký tự"),
  cf_password: yup
    .string()
    .trim()
    .required("Xác nhận mật khẩu không được để trống!")
    .oneOf([yup.ref("password")], "Xác nhận mật khẩu không trùng khớp!"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // React hook form for Validate value
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      cf_password: "",
      rules: false,
    },
    resolver: yupResolver(schema),
  });
  const { register, formState, handleSubmit } = form;
  const { isAuthenticate, errors, message } = useSelector(
    (state) => state.auths
  );

  useEffect(() => {
    if (isAuthenticate) {
      navigate(-1);
    }
  }, [isAuthenticate, message, navigate]);
  const handleRegister = (data) => {
    // console.log(data);
    dispatch(fetchRegister(data));
  };
  const errorMessages = {
    username: formState.errors?.username?.message || errors?.message?.username,
    email: formState.errors?.email?.message || errors?.message?.email,
    password: formState.errors?.password?.message || errors?.message?.password,
    cf_password: formState.errors?.cf_password?.message,
  };
  return (
    <form className="auths-form" onSubmit={handleSubmit(handleRegister)}>
      <h3 className="auths-form__header">Đăng ký</h3>
      <InputField
        name="username"
        type="username"
        id="username"
        label="Nhập Username:"
        fullWidth
        register={register("username")}
        error={errorMessages.username}
      />
      <InputField
        name="email"
        type="email"
        id="email"
        label="Nhập Email:"
        fullWidth
        register={register("email")}
        error={errorMessages.email}
      />
      <InputField
        name="password"
        type="password"
        id="password"
        label="Nhập mật khẩu:"
        fullWidth
        register={register("password")}
        error={errorMessages.password}

        // error="Mật khẩu không đúng"
      />
      <InputField
        name="cf_password"
        type="password"
        id="cf_password"
        label="Xác nhận mật khẩu:"
        fullWidth
        register={register("cf_password")}
        error={errorMessages.cf_password}

        // error="Mật khẩu không đúng"
      />
      <Button className="btn--orange" fullWidth>
        {/* <LoadingDotCircle /> */}
        Đăng nhập
      </Button>
      <div className="auths-form-note">
        (*) Bạn đã có tài khoản ?
        <Link className="auths-form-note__link" to="/auths/login">
          Đăng nhập ngay
        </Link>
      </div>
    </form>
  );
};

export default RegisterPage;
