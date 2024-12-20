import { memo, PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import clsx from 'clsx';

const HeaderLayout = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className={clsx(
                'header__logo-link',
                location.pathname === AppRoute.Main &&
                  'header__logo-link--active'
              )}
              to={AppRoute.Main}
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>

          {children}
        </div>
      </div>
    </header>
  );
};

export default memo(HeaderLayout);
