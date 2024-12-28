import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
import {
  selectAuthorizationStatus,
  selectUser,
} from '../../store/user/user.selectors';
import { selectFavorites } from '../../store/favorites/favorites.selectors';
import { logout } from '../../store/api-actions';
import HeaderLayout from '../header-layout/header-layout';
import styles from './header.module.css';

const Header = () => {
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const user = useSelector(selectUser);
  const favorites = useSelector(selectFavorites);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <HeaderLayout>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={
                authorizationStatus === AuthorizationStatus.Auth
                  ? AppRoute.Favorites
                  : AppRoute.Login
              }
            >
              <div className="header__avatar-wrapper user__avatar-wrapper">
                {user ? (
                  <img
                    className={styles.avatar}
                    src={user?.avatarUrl}
                    alt="avatar"
                  />
                ) : null}
              </div>

              {authorizationStatus === AuthorizationStatus.Auth ? (
                <>
                  <span className="header__user-name user__name">
                    {user?.email}
                  </span>
                  <span className="header__favorite-count">
                    {favorites.length}
                  </span>
                </>
              ) : (
                <span className="header__login">Sign in</span>
              )}
            </Link>
          </li>

          {authorizationStatus === AuthorizationStatus.Auth ? (
            <li className="header__nav-item">
              <Link
                className="header__nav-link"
                to={AppRoute.Login}
                onClick={handleLogout}
              >
                <span className="header__signout">Sign out</span>
              </Link>
            </li>
          ) : (
            ''
          )}
        </ul>
      </nav>
    </HeaderLayout>
  );
};

export default Header;
