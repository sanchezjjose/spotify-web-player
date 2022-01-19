import { combineReducers } from '@reduxjs/toolkit';

import accessTokenSlice from 'redux/reducers/accessTokenSlice';
import refreshTokenSlice from 'redux/reducers/refreshTokenSlice';
import deviceIdSlice from 'redux/reducers/deviceIdSlice';

export default combineReducers({
  accessTokenSlice,
  refreshTokenSlice,
  deviceIdSlice
});
