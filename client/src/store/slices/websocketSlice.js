import { createSlice } from "@reduxjs/toolkit";

const websocketSlice = createSlice({
  name: "websocket",
  initialState: {
    notifications: [],
    isConnected: false,
    error: null,
  },
  reducers: {
    setConnected: (state, action) => {
      state.isConnected = true;
    },
    setDisconnected: (state) => {
      state.isConnected = false;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setConnected,
  setDisconnected,
  addNotification,
  clearNotifications,
  setError,
} = websocketSlice.actions;

export default websocketSlice.reducer;
