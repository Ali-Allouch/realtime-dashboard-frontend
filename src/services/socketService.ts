import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

class SocketService {
  public socket: Socket | null = null;

  connect(token: string) {
    this.socket = io(SOCKET_URL, {
      auth: { token },
      autoConnect: true,
    });

    this.socket.on("connect", () => {
      console.log("Connected to Real-time Server");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from Server");
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketService();
