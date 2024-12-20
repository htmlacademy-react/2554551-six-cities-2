import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { RootState } from '../../lib/types/store';
import {
  getSortedOffers,
  selectFilteredOffers,
  selectOffersResponseStatus,
  selectSelectedOffer,
} from '../../store/offers/offers.selectors';
import { getOffers } from '../../store/api-actions';
import { ResponseStatus } from '../../const';
import { selectActiveCity } from '../../store/city/city.selectors';
import { selectPlacesSorting } from '../../store/sorting/sorting.selectors';
import { selectCurrentOffer } from '../../store/offers/offersSlice';
import Map from '../../components/map/map';
import CardList from '../../components/card-list/card-list';
import MainLayout from '../../components/main-layout/main-layout';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import Spinner from '../../components/spinner/spinner';
import ErrorMessage from '../../components/error-message/error-message';

type Props = {
  cityList: string[];
};

const Main = ({ cityList }: Props) => {
  const activeCity = useSelector(selectActiveCity);
  const placesSorting = useSelector(selectPlacesSorting);
  const offers = useSelector((state: RootState) =>
    getSortedOffers(selectFilteredOffers(state), placesSorting)
  );
  const offersResponseStatus = useSelector(selectOffersResponseStatus);
  const selectedOffer = useSelector(selectSelectedOffer);

  const dispatch = useAppDispatch();

  const handleOfferHover = (offerId: string | undefined) => {
    if (offerId === undefined) {
      dispatch(selectCurrentOffer());
    }

    const currentOffer = offers.find((offer) => offer.id === offerId);

    dispatch(selectCurrentOffer(currentOffer));
  };

  useEffect(() => {
    dispatch(getOffers());
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      <MainLayout cityList={cityList}>
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {offers.length} places to stay in {activeCity.name}
          </b>

          <PlacesSorting />

          {offersResponseStatus === ResponseStatus.Pending && <Spinner />}

          {offersResponseStatus === ResponseStatus.Error && (
            <ErrorMessage message="Failed to load data" />
          )}

          {offersResponseStatus === ResponseStatus.Success && (
            <CardList
              offers={offers}
              cardType="offer"
              onCardMouseOver={handleOfferHover}
            />
          )}
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map
              city={activeCity}
              locations={offers.map((offer) => offer.location)}
              selectedLocation={selectedOffer?.location}
            />
          </section>
        </div>
      </MainLayout>
    </div>
  );
};

export default Main;
