import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';

const initialState: any = {
  value: null
}

export const slice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    updatePlayer: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});

export const { updatePlayer } = slice.actions;

export const selectPlayer = (state: AppState) => state.playerSlice.value;

export default slice.reducer;
