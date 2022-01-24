import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';

const initialState: any = {
  value: {
    paused: true
  }
}

export const slice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    playerState: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});

export const { playerState } = slice.actions;

export const selectPlayerState = (state: AppState) => state.playerStateSlice.value;

export default slice.reducer;
