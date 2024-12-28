import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { UserAuth, UserDataValidity } from '../../lib/types/user';
import { selectLoginResponseStatus } from '../../store/user/user.selectors';
import { ResponseStatus } from '../../const';
import { login } from '../../store/api-actions';
import styles from './login-form.module.css';

const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d).+$/i;

const LoginForm = () => {
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

  const loginResponseStatus = useSelector(selectLoginResponseStatus);

  const dispatch = useAppDispatch();

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(formData));
  };

  return (
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
        {!isValid.email && <p className={styles.error}>Incorrect email</p>}
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
  );
};

export default LoginForm;
