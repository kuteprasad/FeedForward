import { createSlice } from '@reduxjs/toolkit';
import i18n from '../../config/i18next';

const langSlice = createSlice({
  name: 'lang',
  initialState: {
    current: localStorage.getItem('language') || 'en'
  },
  reducers: {
    setLanguage: (state, { payload }) => {
      state.current = payload;
      localStorage.setItem('language', payload);
      i18n.changeLanguage(payload);
    }
  }
});

export const { setLanguage } = langSlice.actions;
export default langSlice.reducer;