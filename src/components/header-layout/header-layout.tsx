import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import clsx from 'clsx';

type Props = PropsWithChildren<{
  active?: boolean;
}>;

const HeaderLayout = ({ active, children }: Props) => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link
            className={clsx(
              'header__logo-link',
              active && 'header__logo-link--active'
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

export default HeaderLayout;
