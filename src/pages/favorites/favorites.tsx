import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { AppRoute, ResponseStatus } from '../../const';
import { Link } from 'react-router-dom';
import { selectCity } from '../../store/city/citySlice';
import {
  selectFavorites,
  selectFavoritesResponseStatus,
} from '../../store/favorites/favorites.selectors';
import FavoriteCard from '../../components/favorite-card/favorite-card';
import Header from '../../components/header/header';
import Spinner from '../../components/spinner/spinner';
import ErrorMessage from '../../components/error-message/error-message';

const Favorites = () => {
  const favorites = useSelector(selectFavorites);
  const favoritesResponseStatus = useSelector(selectFavoritesResponseStatus);
  const cities = Array.from(new Set(favorites.map((item) => item.city.name)));

  const dispatch = useAppDispatch();

  const handleSelectCity = (city: string) => {
    dispatch(selectCity(city));
  };

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            {favoritesResponseStatus === ResponseStatus.Pending && <Spinner />}

            {favoritesResponseStatus === ResponseStatus.Error && (
              <ErrorMessage message="Something went wrong" />
            )}

            <ul className="favorites__list">
              {!!favorites.length &&
                cities.map((city) => (
                  <li
                    className="favorites__locations-items"
                    key={city}
                    onClick={() => handleSelectCity(city)}
                  >
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link
                          className="locations__item-link"
                          to={AppRoute.Main}
                        >
                          <span>{city}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favorites
                        .filter((favorite) => favorite.city.name === city)
                        .map((card) => (
                          <FavoriteCard key={card.id} card={card} />
                        ))}
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link to={AppRoute.Main}>
          <span className="footer__logo-link">
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="64"
              height="33"
            />
          </span>
        </Link>
      </footer>
    </div>
  );
};

export default Favorites;
