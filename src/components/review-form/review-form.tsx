import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { ResponseStatus } from '../../const';
import { NewComment } from '../../lib/types/comment';
import { createComment } from '../../store/api-actions';
import { selectOffer } from '../../store/offers/offers.selectors';
import { selectCommentResponseStatus } from '../../store/comments/comments.selectors';

const ReviewForm = () => {
  const [formData, setFormData] = useState<NewComment>({
    comment: '',
    rating: 0,
  });

  const isValid =
    formData.comment.trim().length > 50 &&
    formData.comment.trim().length < 300 &&
    formData.rating > 0;

  const offer = useSelector(selectOffer);
  const commentResponseStatus = useSelector(selectCommentResponseStatus);

  const dispatch = useAppDispatch();

  const handleChangeValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (offer) {
      dispatch(createComment({ ...formData, offerId: offer?.id }));
    }
  };

  useEffect(() => {
    if (commentResponseStatus === ResponseStatus.Success) {
      setFormData({ comment: '', rating: 0 });
    }
  }, [commentResponseStatus, dispatch]);

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((num) => (
          <React.Fragment key={num}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={num}
              id={`${num}-stars`}
              type="radio"
              checked={num === formData.rating}
              onChange={handleChangeValue}
            />
            <label
              htmlFor={`${num}-stars`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleChangeValue}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            !isValid || commentResponseStatus === ResponseStatus.Pending
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
