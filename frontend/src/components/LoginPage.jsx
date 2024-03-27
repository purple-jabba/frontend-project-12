import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import img from '../assets/avatar.jpg';
import getPath from '../routes.js';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
      return values;
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={img} className="rounded-circle" alt="Войти" />
              </div>
              <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0" disabled={formik.isSubmitting}>
                <h1 className="text-center mb-4">Войти</h1>
                <div className="form-floating mb-3">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    className="form-control"
                    type="text"
                    name="username"
                    autoComplete="username"
                    placeholder="Ваш ник"
                    id="username"
                    required
                  />
                  <label htmlFor="username">Ваш ник</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="form-control"
                    type="password"
                    name="password"
                    autoComplete="password"
                    placeholder="Пароль"
                    id="password"
                    required
                  />
                  <label htmlFor="password">Пароль</label>
                </div>
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <NavLink to={getPath.notFoundPage()}>Регистрация</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
