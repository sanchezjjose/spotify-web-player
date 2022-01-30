import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';

export interface CredentialsState {
  accessToken: null | string,
  refreshToken: null | string
}

const initialState: CredentialsState = {
  accessToken: null,
  refreshToken: null
}

export const slice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    updateCredentials: (state, action: PayloadAction<any>) => {
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
    },
  },
});

export const { updateCredentials } = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCredentials = (state: AppState) => state.credentialsSlice;

export default slice.reducer;
