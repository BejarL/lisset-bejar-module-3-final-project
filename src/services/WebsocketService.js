export class WebsocketService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.ws = null;
    this.shouldReconnect = true;
  }

  connect(endpoint, token) {
    const url = `${this.baseUrl}/${endpoint}?token=${token}`;
    this.ws = new WebSocket(url);

    this.ws.onopen = () => console.log("WebSocket connection established");

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received data:", data);
      // Handle real-time data updates here
    };

    this.ws.onclose = () => {
      console.log("WebSocket connection closed");
      if (this.shouldReconnect) {
        setTimeout(() => this.connect(endpoint, token), 5000); // Attempt to reconnect after 5 seconds
      }
    };

    this.ws.onerror = (error) =>
      console.error("WebSocket encountered an error:", error);
  }

  disconnect() {
    this.shouldReconnect = false; // Prevent reconnection after intentional disconnect
    if (this.ws) {
      this.ws.close();
    }
  }
}