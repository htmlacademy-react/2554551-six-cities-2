import { useAppDispatch } from '../../store';
import { Link } from 'react-router-dom';
import { CardImgAttributes } from '../../lib/types/card';
import { OfferPartial } from '../../lib/types/offer';
import { AppRoute } from '../../const';
import {
  getComments,
  getNearbyOffers,
  getOffer,
} from '../../store/api-actions';
import clsx from 'clsx';

type Props = {
  card: OfferPartial;
  imgAttributes: CardImgAttributes;
  inFavorites?: boolean;
};

const Card = ({ card, imgAttributes, inFavorites }: Props) => {
  const {
    id,
    isPremium,
    previewImage,
    price,
    isFavorite,
    rating,
    title,
    type,
  } = card;

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(getOffer(id));
    dispatch(getComments(id));
    dispatch(getNearbyOffers(id));
  };

  return (
    <>
      {isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : (
        ''
      )}
      <div
        className={clsx(imgAttributes.className, 'place-card__image-wrapper')}
      >
        <Link to={`${AppRoute.Offer}/${id}`} onClick={handleClick}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imgAttributes.width}
            height={imgAttributes.height}
            alt="Place image"
          />
        </Link>
      </div>
      <div
        className={clsx(
          inFavorites && 'favorites__card-info',
          'place-card__info'
        )}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={clsx(
              'place-card__bookmark-button',
              'button',
              isFavorite && 'place-card__bookmark-button--active'
            )}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </>
  );
};

export default Card;
