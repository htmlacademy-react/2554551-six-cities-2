import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../store';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { login } from '../../store/api-actions';
import { UserAuth, UserDataValidity } from '../../lib/types/user';
import {
  AppRoute,
  AuthorizationStatus,
  CityName,
  ResponseStatus,
} from '../../const';
import {
  selectAuthorizationStatus,
  selectLoginResponseStatus,
} from '../../store/user/user.selectors';
import { selectCity } from '../../store/city/citySlice';
import HeaderLayout from '../../components/header-layout/header-layout';
import styles from './login.module.css';

const cities = Object.keys(CityName);
const randomCity = cities[Math.floor(Math.random() * cities.length)];
const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d).+$/i;

const Login = () => {
  const [formData, setFormData] = useState<UserAuth>({
    email: '',
    password: '',
  });

  const isValid: UserDataValidity = {
    email: emailRegEx.test(formData.email) || !formData.email,
    password: passwordRegEx.test(formData.password) || !formData.password,
  };
  const canSubmit =
    Object.values(isValid).every((val) => val) &&
    formData.email &&
    formData.password;

  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const loginResponseStatus = useSelector(selectLoginResponseStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(formData));
  };

  const handleSelectCity = () => {
    dispatch(selectCity(randomCity));
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authorizationStatus, navigate]);

  return (
    <div className="page page--gray page--login">
      <HeaderLayout />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleChangeValue}
                />
                {!isValid.email && (
                  <p className={styles.error}>Incorrect email</p>
                )}
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChangeValue}
                />
                {!isValid.password && (
                  <p className={styles.error}>Incorrect password</p>
                )}
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={!canSubmit}
              >
                Sign in
              </button>
              {loginResponseStatus === ResponseStatus.Error && (
                <p className={styles.error}>Something went wrong</p>
              )}
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Main}
                onClick={handleSelectCity}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;
