import { useSelector } from 'react-redux';
import { RootState } from '../../lib/types/store';
import { AuthorizationStatus, ResponseStatus } from '../../const';
import { selectSortedComments } from '../../store/reviews.selectors';
import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import CardList from '../../components/card-list/card-list';
import Header from '../../components/header/header';
import Spinner from '../../components/spinner/spinner';
import OfferImage from '../../components/offer-image/offer-image';
import clsx from 'clsx';
import styles from './offer.module.css';

const Offer = () => {
  const offer = useSelector((state: RootState) => state.offer);
  const reviews = useSelector(selectSortedComments);
  const nearbyOffers = useSelector((state: RootState) => state.nearbyOffers);
  const offerResponseStatus = useSelector(
    (state: RootState) => state.offerResponseStatus
  );
  const activeCity = useSelector((state: RootState) => state.activeCity);
  const authorizationStatus = useSelector(
    (state: RootState) => state.authorizationStatus
  );

  return (
    <div className="page">
      <Header />

      {offerResponseStatus === ResponseStatus.Pending && (
        <div className={styles.loading}>
          <Spinner />
        </div>
      )}

      {offer ? (
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offer.images.map((src) => (
                  <OfferImage src={src} key={src} />
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {offer.isPremium && (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{offer.title}</h1>
                  <button
                    className={clsx(
                      'offer__bookmark-button',
                      'button',
                      offer.isFavorite && 'place-card__bookmark-button--active'
                    )}
                    type="button"
                  >
                    <svg
                      className="offer__bookmark-icon"
                      width="31"
                      height="33"
                    >
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">
                      {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                    </span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${offer.rating * 20}%` }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">
                    {offer.rating}
                  </span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {offer.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms} bedroom{offer.bedrooms > 1 ? 's' : ''}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    max {offer.maxAdults} adult{offer.maxAdults > 1 ? 's' : ''}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{offer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((good) => (
                      <li className="offer__inside-item" key={good}>
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div
                      className={clsx(
                        'offer__avatar-wrapper',
                        'user__avatar-wrapper',
                        offer.host.isPro && 'offer__avatar-wrapper--pro'
                      )}
                    >
                      <img
                        className="offer__avatar user__avatar"
                        src={offer.host.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{offer.host.name}</span>
                    {offer.host.isPro && (
                      <span className="offer__user-status">Pro</span>
                    )}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{offer.description}</p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">
                    Reviews &middot;{' '}
                    <span className="reviews__amount">{reviews.length}</span>
                  </h2>
                  <ReviewList reviews={reviews} />

                  {authorizationStatus === AuthorizationStatus.Auth && (
                    <ReviewForm />
                  )}
                </section>
              </div>
            </div>
            <section className="offer__map map">
              <Map
                city={activeCity}
                locations={nearbyOffers.map((nearby) => nearby.location)}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <CardList offers={nearbyOffers} cardType="near" />
            </section>
          </div>
        </main>
      ) : (
        ''
      )}
    </div>
  );
};

export default Offer;
