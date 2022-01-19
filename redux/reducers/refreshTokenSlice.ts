import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from 'redux/store';

export interface RefreshTokenState {
  value: null | string
}

const initialState: RefreshTokenState = {
  value: null
}

export const slice = createSlice({
  name: 'refreshToken',
  initialState,
  reducers: {
    updateRefreshToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { updateRefreshToken } = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectRefreshToken = (state: AppState) => state.refreshTokenSlice.value;

export default slice.reducer;
