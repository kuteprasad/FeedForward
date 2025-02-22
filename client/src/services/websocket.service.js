import { io } from "socket.io-client";
import { store } from "../store/store";
import {
  setConnected,
  setDisconnected,
  addNotification,
  setError,
} from "../store/slices/websocketSlice";

class WebSocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (this.socket) return;

    this.socket = io(import.meta.env.VITE_WEBSOCKET_API_URL);

    this.socket.on("connect", () => {
      store.dispatch(setConnected());
      console.log("Connected to WebSocket server");
    });

    this.socket.on("disconnect", () => {
      store.dispatch(setDisconnected());
      console.log("Disconnected from WebSocket server");
    });

    this.socket.on("notification", (message) => {
      try {
        const parsedMessage =
          typeof message === "string" ? JSON.parse(message) : message;
        const user = store.getState().auth.user;

        if (parsedMessage.to?.includes(user?.id)) {
          store.dispatch(addNotification(parsedMessage));
        }
      } catch (error) {
        store.dispatch(setError("Error processing notification"));
        console.error("Error parsing message:", error);
      }
    });

    this.socket.on("error", (error) => {
      store.dispatch(setError(error.message));
      console.error("WebSocket error:", error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
}

export const websocketService = new WebSocketService();
