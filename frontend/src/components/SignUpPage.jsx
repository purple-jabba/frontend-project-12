import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { addLogInInfo, logOut } from '../slices/authSlice.js';
import img from '../assets/avatar_1.jpg';
import getPath from '../routes.js';

const SignUpPage = () => {
  const { t } = useTranslation();
  const [userExists, setExistUser] = useState(false);
  const dispatch = useDispatch();
  const inputEl = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputEl.current.focus();
  }, [userExists]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required(t('yup.required'))
        .min(3, t('yup.minAndMax'))
        .max(20, t('yup.minAndMax'))
        .trim(),
      password: yup
        .string()
        .required(t('yup.required'))
        .min(6, t('yup.min'))
        .trim(),
      confirmPassword: yup
        .string()
        .test(
          'confirmPassword',
          t('yup.confirmPassword'),
          (password, context) => password === context.parent.password,
        ),
    }),
    onSubmit: async (values) => {
      setExistUser(false);
      try {
        const { username, password } = values;
        const result = await axios.post(getPath.signUpPath(), { username, password });
        const { data } = result;
        dispatch(logOut());
        dispatch(addLogInInfo({ data }));
        navigate(getPath.chatPage());
      } catch (error) {
        formik.setSubmitting(false);
        if (error.response.status === 409) {
          setExistUser(true);
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
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={img} className="rounded-circle" alt={t('mainComponents.registration')} />
              </div>
              <form onSubmit={formik.handleSubmit} className="w-50" disabled={formik.isSubmitting}>
                <h1 className="text-center mb-4">{t('mainComponents.registration')}</h1>
                <div className="form-floating mb-3">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    className={userExists || (formik.errors.username && formik.touched.username) ? 'form-control is-invalid' : 'form-control'}
                    type="text"
                    name="username"
                    autoComplete="username"
                    placeholder={t('mainComponents.username')}
                    id="username"
                    required
                    disabled={formik.isSubmitting}
                    ref={inputEl}
                  />
                  <label className="form-label" htmlFor="username">{t('mainComponents.username')}</label>
                  {formik.errors.username && formik.touched.username ? <div className="invalid-tooltip">{formik.errors.username}</div> : null}
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className={userExists || (formik.errors.password && formik.touched.password) ? 'form-control is-invalid' : 'form-control'}
                    type="password"
                    name="password"
                    autoComplete="password"
                    placeholder={t('mainComponents.password')}
                    id="password"
                    required
                    disabled={formik.isSubmitting}
                  />
                  <label className="form-label" htmlFor="password">{t('mainComponents.password')}</label>
                  {formik.errors.password && formik.touched.password ? <div className="invalid-tooltip">{formik.errors.password}</div> : null}
                </div>
                <div className="form-floating mb-4">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    className={userExists || (formik.errors.confirmPassword && formik.touched.confirmPassword) ? 'form-control is-invalid' : 'form-control'}
                    type="password"
                    name="confirmPassword"
                    autoComplete="confirmPassword"
                    placeholder={t('mainComponents.confirmPassword')}
                    id="confirmPassword"
                    required
                    disabled={formik.isSubmitting}
                  />
                  <label className="form-label" htmlFor="confirmPassword">{t('mainComponents.confirmPassword')}</label>
                  {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className="invalid-tooltip">{formik.errors.confirmPassword}</div> : null}
                  {userExists ? <div className="invalid-tooltip">{t('mainComponents.alreadyHaveAccount')}</div> : null}
                </div>
                <button disabled={formik.isSubmitting} type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('mainComponents.signUp')}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
