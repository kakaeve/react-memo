import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer } from 'redux-injectors';
import { loadMemoData, saveMemoData } from 'store/localStorage';
import { createOptimisticUniqueName } from 'typescript';
import { MemoState } from './types';

export const initialState: MemoState = {
  search: '',
  memolist: loadMemoData(),
};

const slice = createSlice({
  name: 'memo',
  initialState: initialState,
  reducers: {
    addMemo: {
      reducer: (state, action: PayloadAction<MemoItem>) => {
        state.memolist.push(action.payload);
        for (const memo of state.memolist) {
          if (memo.id === action.payload.id) continue;
          if (memo.selected) memo.selected = false;
        }
        saveMemoData(state.memolist);
      },
      prepare: (content: string, preview: string) => {
        const id = nanoid();
        return {
          payload: {
            id: id,
            content: content,
            preview: preview,
            selected: true,
            create_at: new Date().toString(),
          },
        };
      },
    },
    selectMemo(state, action: PayloadAction<{ id: string }>) {
      const id = action.payload.id;

      for (const memo of state.memolist) {
        if (memo.id === id) continue;
        if (memo.selected) memo.selected = false;
      }

      const memo = state.memolist.find(memo => memo.id === id);
      if (memo) memo.selected = true;
      saveMemoData(state.memolist);
    },
    saveMemo(
      state,
      action: PayloadAction<{ content: string; preview: string }>,
    ) {
      const content = action.payload.content;
      const preview = action.payload.preview;

      const memo = state.memolist.find(memo => memo.selected);
      if (memo) {
        memo.content = content;
        memo.preview = preview;
        memo.create_at = new Date().toString();
      }
      saveMemoData(state.memolist);
    },
    deleteMemo(state, action: PayloadAction) {
      const filteredMemos = state.memolist.filter(memo => memo.selected);
      state.memolist = filteredMemos;

      const sortedMemos = [...state.memolist].sort(
        (a, b) =>
          new Date(b.create_at).getTime() - new Date(a.create_at).getTime(),
      );
      if (sortedMemos.length > 0) {
        const memo = state.memolist.find(memo => memo.id === sortedMemos[0].id);
        if (memo) memo.selected = true;
      }

      saveMemoData(state.memolist);
    },
    searchMemo(state, action: PayloadAction<{ search: string }>) {
      state.search = action.payload.search;
    },
  },
});

export const { actions: MemoActions } = slice;

export const useMemoSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { MemoActions };
};
