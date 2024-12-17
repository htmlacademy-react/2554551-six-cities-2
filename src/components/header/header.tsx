import { useSelector } from 'react-redux';
import { RootState } from '../../lib/types/store';
import { AuthorizationStatus } from '../../const';
import HeaderLayout from '../header-layout/header-layout';

const Header = () => {
  const authorizationStatus = useSelector(
    (state: RootState) => state.authorizationStatus
  );
  const user = useSelector((state: RootState) => state.user);

  return (
    <HeaderLayout>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <a className="header__nav-link header__nav-link--profile" href="#">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>

              {authorizationStatus === AuthorizationStatus.Auth ? (
                <>
                  <span className="header__user-name user__name">
                    {user?.email}
                  </span>
                  <span className="header__favorite-count">3</span>
                </>
              ) : (
                <span className="header__login">Sign in</span>
              )}
            </a>
          </li>

          {authorizationStatus === AuthorizationStatus.Auth ? (
            <li className="header__nav-item">
              <a className="header__nav-link" href="#">
                <span className="header__signout">Sign out</span>
              </a>
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
