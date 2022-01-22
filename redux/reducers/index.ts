import { combineReducers } from '@reduxjs/toolkit';

import credentialsSlice from 'redux/reducers/credentialsSlice';
import deviceIdSlice from 'redux/reducers/deviceIdSlice';
import playerSlice from 'redux/reducers/playerSlice';

export default combineReducers({
  credentialsSlice,
  deviceIdSlice,
  playerSlice
});
