import { PropsWithChildren } from 'react';
import { AuthorizationStatus } from '../../const';
import Header from '../header/header';
import CityList from '../city-list/city-list';
import clsx from 'clsx';

type Props = PropsWithChildren<{ empty?: boolean; cityList: string[] }>;

const MainLayout = ({ empty, cityList, children }: Props) => (
  <div className="page page--gray page--main">
    <Header authorizationStatus={AuthorizationStatus.Auth} />

    <main
      className={clsx(
        'page__main',
        'page__main--index',
        empty && 'page__main--index-empty'
      )}
    >
      <h1 className="visually-hidden">Cities</h1>

      <div className="tabs">
        <section className="locations container">
          <CityList cityList={cityList} />
        </section>
      </div>

      <div className="cities">
        <div
          className={clsx(
            'cities__places-container',
            'container',
            empty && 'cities__places-container--empty'
          )}
        >
          {children}
        </div>
      </div>
    </main>
  </div>
);

export default MainLayout;
