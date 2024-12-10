/* eslint-disable arrow-body-style */

import { SingleReview } from '../../lib/types/review';
import ReviewItem from '../review-item/review-item';

type Props = { reviews: SingleReview[] };

const ReviewList = ({ reviews }: Props) => {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
};

export default ReviewList;
