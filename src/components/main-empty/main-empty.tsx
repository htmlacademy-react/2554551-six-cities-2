/* eslint-disable arrow-body-style */

import MainLayout from '../main-layout/main-layout';

type Props = {
  cityList: string[];
};

const MainEmpty = ({ cityList }: Props) => {
  return (
    <div className="page page--gray page--main">
      <MainLayout cityList={cityList}>
        <>
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">
                We could not find any property available at the moment in
                Dusseldorf
              </p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </>
      </MainLayout>
    </div>
  );
};

export default MainEmpty;
