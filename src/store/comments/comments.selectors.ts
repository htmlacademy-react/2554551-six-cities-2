import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../lib/types/store';

const getSortedComments = (state: RootState) => {
  const commentsCopy = [...state.comments.comments];

  return commentsCopy
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);
};

const getComment = (state: RootState) => state.comments.comment;

const getCommentResponseStatus = (state: RootState) =>
  state.comments.commentResponseStatus;

export const selectSortedComments = createSelector(
  [(state: RootState) => state],
  getSortedComments
);

export const selectComment = createSelector(
  [(state: RootState) => state],
  getComment
);

export const selectCommentResponseStatus = createSelector(
  [(state: RootState) => state],
  getCommentResponseStatus
);
