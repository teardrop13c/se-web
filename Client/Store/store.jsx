import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.jsx'; 
import varReducer from './varSlice.jsx';
export const store = configureStore({
  reducer: {
    auth: authReducer, 
    var: varReducer
  },
});
