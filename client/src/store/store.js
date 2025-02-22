import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import langReducer from './slices/langSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    lang: langReducer,
  },
});