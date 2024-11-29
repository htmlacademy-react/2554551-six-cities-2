import { SingleReview } from '../../lib/types.ts/review';

type Props = {
  review: SingleReview;
};

const ReviewItem = ({ review }: Props) => {
  const { imgPath, userName, rating, reviewText, dateTime, dateString } =
    review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={imgPath}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{userName}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{reviewText}</p>
        <time className="reviews__time" dateTime={dateTime}>
          {dateString}
        </time>
      </div>
    </li>
  );
};

export default ReviewItem;
