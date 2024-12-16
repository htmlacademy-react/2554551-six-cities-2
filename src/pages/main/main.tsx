import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { RootState } from '../../lib/types/store';
import { selectOffer } from '../../store/actions';
import { getFilteredOffersByCity } from '../../store/offers.selectors';
import { AuthorizationStatus } from '../../const';
import Map from '../../components/map/map';
import CardList from '../../components/card-list/card-list';
import MainLayout from '../../components/main-layout/main-layout';

type Props = {
  cityList: string[];
};

const Main = ({ cityList }: Props) => {
  const activeCity = useSelector((state: RootState) => state.activeCity);
  const offers = useSelector((state: RootState) =>
    getFilteredOffersByCity(state.offerList, activeCity.name)
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
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li
                  className="places__option places__option--active"
                  tabIndex={0}
                >
                  Popular
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: low to high
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: high to low
                </li>
                <li className="places__option" tabIndex={0}>
                  Top rated first
                </li>
              </ul>
            </form>

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
