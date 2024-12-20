import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { OfferPartial } from '../../lib/types/offer';
import FavoriteCard from '../../components/favorite-card/favorite-card';
import Header from '../../components/header/header';

type Props = { favorites: OfferPartial[] };

const Favorites = ({ favorites }: Props) => {
  const cities = Array.from(new Set(favorites.map((item) => item.city.name)));

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.map((city) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
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
