import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';

export const baseSelector = (state: RootState) => state.memo;

const MemoListSelector = createSelector(baseSelector, state =>
  [...state.memolist]
    .sort(
      (a, b) =>
        new Date(b.create_at).getTime() - new Date(a.create_at).getTime(),
    )
    .filter(memo => memo.content.includes(state.search)),
);

const SelectedMemoListSelector = createSelector(baseSelector, state =>
  state.memolist.find(memo => memo.selected),
);

const SearchMemoSelector = createSelector(baseSelector, state =>
  state.search !== undefined ? state.search : '',
);

export { MemoListSelector, SelectedMemoListSelector, SearchMemoSelector };
