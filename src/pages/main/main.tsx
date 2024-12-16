import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { RootState } from '../../lib/types/store';
import { selectOffer } from '../../store/actions';
import {
  getSortedOffers,
  selectFilteredOffers,
} from '../../store/offers.selectors';
import Map from '../../components/map/map';
import CardList from '../../components/card-list/card-list';
import MainLayout from '../../components/main-layout/main-layout';
import PlacesSorting from '../../components/places-sorting/places-sorting';

type Props = {
  cityList: string[];
};

const Main = ({ cityList }: Props) => {
  const activeCity = useSelector((state: RootState) => state.activeCity);
  const placesSorting = useSelector((state: RootState) => state.placesSorting);
  const offers = useSelector((state: RootState) =>
    getSortedOffers(selectFilteredOffers(state), placesSorting)
  );
  const selectedOffer = useSelector((state: RootState) => state.selectedOffer);
  const dispatch = useAppDispatch();

  const handleOfferHover = (placeName: string | undefined) => {
    if (placeName === undefined) {
      dispatch(selectOffer(undefined));
    }

    const currentLocation = offers.find((offer) => offer.title === placeName);

    dispatch(selectOffer(currentLocation));
  };

  return (
    <div className="page page--gray page--main">
      <MainLayout cityList={cityList}>
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
      </MainLayout>
    </div>
  );
};

export default Main;
