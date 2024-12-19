import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../lib/types/store';

export const selectAllComments = (state: RootState) => state;

const getSortedComments = (state: RootState) => {
  const commentsCopy = [...state.comments];

  return commentsCopy.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const selectSortedComments = createSelector(
  [selectAllComments],
  getSortedComments
);
