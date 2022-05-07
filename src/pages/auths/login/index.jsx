import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Button from '../../../components/Button';
import InputField from '../../../components/Form/FormField/InputField';
import LoadingDotCircle from '../../../components/Loading/LoadingDotCircle';
import { fetchLogin } from '../authSlice';
import Google from './Google';
import './styles.scss';
const LoginPage = () => {
  const schema = yup.object().shape({
    email: yup.string().required('Email không được để trống!').email(),
    password: yup
      .string()
      .required('Password không được để trống!')
      .trim()
      .min(6, 'Password không được ngắn hơn 6 ký tự')
      .max(12, 'Password không được dài hơn 12 ký tự'),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', password: '' });
  const auths = useSelector((state) => state.auths);
  const { isAuthenticate, isLoading, errors, message } = auths;

  const handleChangeInput = (values) => {
    if (errors?.message) {
    }
    setData({ ...data, ...values });
  };
  useEffect(() => {
    // If user login successfully
    if (isAuthenticate) {
      // History go back
      navigate(-1);
    }
  }, [isAuthenticate, navigate]);

  //React hook form
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { register, formState } = form;

  const handleLogin = (data) => {
    dispatch(fetchLogin(data));
  };

  // console.log(formState.errors);
  return (
    <form className="auths-form" onSubmit={form.handleSubmit(handleLogin)}>
      <h3 className="auths-form__header">Đăng nhập</h3>
      <InputField
        name="email"
        type="email"
        id="email"
        label="Nhập Email:"
        fullWidth
        onChange={handleChangeInput}
        disabled={isLoading}
        error={formState.errors?.email?.message || errors?.message?.email}
        register={register('email', {
          // onBlur: (e) => console.log(e),
        })}
      ></InputField>

      <InputField
        name="password"
        type="password"
        id="password"
        label="Nhập Password:"
        fullWidth
        onChange={handleChangeInput}
        disabled={isLoading}
        error={formState.errors?.password?.message || errors?.message?.password}
        register={register('password')}

        // error="Mật khẩu không đúng"
      ></InputField>
      <Button className="btn--green btn--auth " fullWidth disabled={isLoading}>
        {isLoading && <LoadingDotCircle />}
        Đăng nhập
      </Button>
      {/* <Google /> */}

      <div className="auths-form-note">
        (*) Nếu bạn chưa có tài khoản ?
        <Link className="auths-form-note__link" to={!isLoading && '/auths/register'}>
          Đăng ký ngay
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
