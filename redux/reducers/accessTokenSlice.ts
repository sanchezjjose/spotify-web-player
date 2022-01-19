import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';

export interface AccessTokenState {
  value: null | string
}

const initialState: AccessTokenState = {
  value: null
}

export const slice = createSlice({
  name: 'accessToken',
  initialState,
  reducers: {
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { updateAccessToken } = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAccessToken = (state: AppState) => state.accessTokenSlice.value;

export default slice.reducer;
