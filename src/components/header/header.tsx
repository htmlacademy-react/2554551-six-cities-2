import { memo } from 'react';
import { useSelector } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Link, useLocation } from 'react-router-dom';
import {
  selectAuthorizationStatus,
  selectUser,
} from '../../store/user/user.selectors';
import { selectFavorites } from '../../store/favorites/favorites.selectors';
import HeaderLayout from '../header-layout/header-layout';

const Header = () => {
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const user = useSelector(selectUser);
  const favorites = useSelector(selectFavorites);

  const location = useLocation();
  const navigateTo =
    location.pathname === AppRoute.Favorites ? AppRoute.Main : location;

  const style = {
    backgroundImage: `url(${user?.avatarUrl || ''})`,
    borderRadius: '20px',
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
              <div
                className="header__avatar-wrapper user__avatar-wrapper"
                style={user ? style : {}}
              >
                {''}
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
              <Link className="header__nav-link" to={navigateTo}>
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

export default memo(Header);
