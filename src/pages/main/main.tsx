import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { RootState } from '../../lib/types/store';
import { City } from '../../lib/types/city';
import { SingleOffer } from '../../lib/types/offer';
import { selectOffer } from '../../store/actions';
import Map from '../../components/map/map';
import CardList from '../../components/card-list/card-list';
import CityList from '../../components/city-list/city-list';

type Props = {
  cityList: City[];
};

const Main = ({ cityList }: Props) => {
  const [filteredOffers, setFilteredOffers] = useState<SingleOffer[]>([]);

  const offers = useSelector((state: RootState) => state.offerList);
  const activeCity = useSelector((state: RootState) => state.activeCity);
  const selectedOffer = useSelector((state: RootState) => state.selectedOffer);

  const dispatch = useAppDispatch();

  const handleOfferHover = (placeName: string | undefined) => {
    if (placeName === undefined) {
      dispatch(selectOffer(undefined));
    }

    const currentLocation = filteredOffers.find(
      (offer) => offer.title === placeName
    );

    dispatch(selectOffer(currentLocation));
  };

  useEffect(() => {
    setFilteredOffers(
      offers.filter((offer) => offer.city.name === activeCity.name)
    );
  }, [offers, activeCity]);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList cityList={cityList.map((cityItem) => cityItem.name)} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {filteredOffers.length} places to stay in {activeCity.name}
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
                offers={filteredOffers}
                cardType="offer"
                onCardMouseOver={handleOfferHover}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={activeCity}
                  locations={filteredOffers.map((offer) => offer.location)}
                  selectedLocation={selectedOffer?.location}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
