import { combineReducers } from '@reduxjs/toolkit';

import credentialsSlice from 'redux/reducers/credentialsSlice';
import deviceIdSlice from 'redux/reducers/deviceIdSlice';
import playerStateSlice from 'redux/reducers/playerStateSlice';

export default combineReducers({
  credentialsSlice,
  deviceIdSlice,
  playerStateSlice
});
