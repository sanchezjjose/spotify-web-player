import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from 'redux/store';

export interface DeviceIdState {
  value: null | string
}

const initialState: DeviceIdState = {
  value: null
}

export const slice = createSlice({
  name: 'deviceId',
  initialState,
  reducers: {
    updateDeviceId: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { updateDeviceId } = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectDeviceId = (state: AppState) => state.deviceIdSlice.value;

export default slice.reducer;
