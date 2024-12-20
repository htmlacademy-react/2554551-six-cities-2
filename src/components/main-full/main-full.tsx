import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { RootState } from '../../lib/types/store';
import {
  getSortedOffers,
  selectFilteredOffers,
  selectSelectedOffer,
} from '../../store/offers/offers.selectors';
import { selectActiveCity } from '../../store/city/city.selectors';
import { selectPlacesSorting } from '../../store/sorting/sorting.selectors';
import { selectCurrentOffer } from '../../store/offers/offersSlice';
import Map from '../map/map';
import CardList from '../card-list/card-list';
import PlacesSorting from '../places-sorting/places-sorting';

const MainFull = () => {
  const activeCity = useSelector(selectActiveCity);
  const placesSorting = useSelector(selectPlacesSorting);
  const offers = useSelector((state: RootState) =>
    getSortedOffers(selectFilteredOffers(state), placesSorting)
  );
  const selectedOffer = useSelector(selectSelectedOffer);

  const dispatch = useAppDispatch();

  const handleOfferHover = (offerId: string | undefined) => {
    if (offerId === undefined) {
      dispatch(selectCurrentOffer());
    }

    const currentOffer = offers.find((offer) => offer.id === offerId);

    dispatch(selectCurrentOffer(currentOffer));
  };

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length} places to stay in {activeCity.name}
        </b>

        <PlacesSorting />

        <CardList
          offers={offers}
          cardType="offer"
          onCardMouseOver={handleOfferHover}
        />
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
    </>
  );
};

export default MainFull;
