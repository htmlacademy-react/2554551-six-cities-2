import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../lib/types/store';

const getSortedComments = (state: RootState) => {
  const commentsCopy = [...state.comments.comments];

  return commentsCopy.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

const getCommentResponseStatus = (state: RootState) =>
  state.comments.commentResponseStatus;

export const selectSortedComments = createSelector(
  [(state: RootState) => state],
  getSortedComments
);

export const selectCommentResponseStatus = createSelector(
  [(state: RootState) => state],
  getCommentResponseStatus
);
