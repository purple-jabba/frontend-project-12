import { useState, useRef, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { addLogInInfo } from '../slices/authSlice.js';
import img from '../assets/avatar.jpg';
import getPath from '../routes.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const [loginFailed, setFailedLogin] = useState(false);
  const dispatch = useDispatch();
  const inputEl = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputEl.current.focus();
  }, [loginFailed]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required(t('yup.required')),
      password: yup.string().required(t('yup.required')),
    }),
    onSubmit: async (values) => {
      setFailedLogin(false);
      try {
        const { username, password } = values;
        const result = await axios.post(getPath.loginPath(), { username, password });
        const { data } = result;
        dispatch(addLogInInfo({ data }));
        navigate(getPath.chatPage());
      } catch (error) {
        formik.setSubmitting(false);
        if (error.response.status === 401) {
          setFailedLogin(true);
          inputEl.current.select();
        } else {
          toast.error(t('toastify.connectionError'));
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={img} className="rounded-circle" alt={t('mainComponents.login')} />
              </div>
              <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0" disabled={formik.isSubmitting}>
                <h1 className="text-center mb-4">{t('mainComponents.login')}</h1>
                <div className="form-floating mb-3">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    className={loginFailed ? 'form-control is-invalid' : 'form-control'}
                    type="text"
                    name="username"
                    autoComplete="username"
                    placeholder={t('mainComponents.yourUserName')}
                    id="username"
                    required
                    disabled={formik.isSubmitting}
                    ref={inputEl}
                  />
                  <label htmlFor="username">{t('mainComponents.yourUserName')}</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className={loginFailed ? 'form-control is-invalid' : 'form-control'}
                    type="password"
                    name="password"
                    autoComplete="password"
                    placeholder={t('mainComponents.password')}
                    id="password"
                    required
                    disabled={formik.isSubmitting}
                  />
                  <label htmlFor="password">{t('mainComponents.password')}</label>
                  {loginFailed ? <div className="invalid-tooltip">{t('mainComponents.failedLogin')}</div> : null}
                </div>
                <button disabled={formik.isSubmitting} type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('mainComponents.login')}</button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('mainComponents.noAccount')}</span>
                {' '}
                <NavLink to={getPath.signUpPage()}>{t('mainComponents.registration')}</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
