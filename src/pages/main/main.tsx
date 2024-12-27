import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import {
  getSortedOffers,
  selectFilteredOffers,
  selectOffersResponseStatus,
} from '../../store/offers/offers.selectors';
import { AuthorizationStatus, ResponseStatus } from '../../const';
import { RootState } from '../../lib/types/store';
import { selectPlacesSorting } from '../../store/sorting/sorting.selectors';
import { getFavorites, getOffers } from '../../store/api-actions';
import { selectAuthorizationStatus } from '../../store/user/user.selectors';
import Header from '../../components/header/header';
import CityList from '../../components/city-list/city-list';
import Spinner from '../../components/spinner/spinner';
import ErrorMessage from '../../components/error-message/error-message';
import MainFull from '../../components/main-full/main-full';
import MainEmpty from '../../components/main-empty/main-empty';
import clsx from 'clsx';

type Props = { cityList: string[] };

const Main = ({ cityList }: Props) => {
  const placesSorting = useSelector(selectPlacesSorting);
  const offers = useSelector((state: RootState) =>
    getSortedOffers(selectFilteredOffers(state), placesSorting)
  );
  const offersResponseStatus = useSelector(selectOffersResponseStatus);
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOffers());
  }, [dispatch]);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(getFavorites());
    }
  }, [dispatch, authorizationStatus]);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main
        className={clsx(
          'page__main',
          'page__main--index',
          !offers.length && 'page__main--index-empty'
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
              !offers.length && 'cities__places-container--empty'
            )}
          >
            {offersResponseStatus === ResponseStatus.Pending && <Spinner />}

            {offersResponseStatus === ResponseStatus.Error && (
              <ErrorMessage message="Failed to load data" />
            )}

            {offersResponseStatus === ResponseStatus.Success &&
              (offers.length ? <MainFull /> : <MainEmpty />)}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
