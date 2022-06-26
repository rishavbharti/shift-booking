import { configureStore } from '@reduxjs/toolkit';
import shifts from './slice/shiftsSlice';

export const store = configureStore({
  reducer: { shifts },
});
