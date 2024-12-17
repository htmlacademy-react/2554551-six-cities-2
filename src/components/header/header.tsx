/* eslint-disable arrow-body-style */
import { AuthorizationStatus } from '../../const';
import HeaderLayout from '../header-layout/header-layout';

type Props = { authorizationStatus: AuthorizationStatus };

const Header = ({ authorizationStatus }: Props) => {
  return (
    <HeaderLayout>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <a className="header__nav-link header__nav-link--profile" href="#">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>

              {authorizationStatus === 'AUTH' ? (
                <>
                  <span className="header__user-name user__name">
                    Oliver.conner@gmail.com
                  </span>
                  <span className="header__favorite-count">3</span>
                </>
              ) : (
                <span className="header__login">Sign in</span>
              )}
            </a>
          </li>
          {authorizationStatus === 'AUTH' ? (
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
