import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import websocketReducer from "./slices/websocketSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    websocket: websocketReducer,
  },
});
