export class GameTransport {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private url: string;
  
  constructor(
    private host: string,
    private roomId: string,
    private playerId: string,
    private onMessage: (data: any) => void
  ) {
    // e.g. wss://server.onrender.com/ws
    const protocol = this.host.includes('localhost') || this.host.includes('127.0.0.1') ? 'ws://' : 'wss://';
    this.url = `${protocol}${this.host}/ws`;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);
    
    this.ws.onopen = () => {
      console.log('Connected to Game Server');
      this.reconnectAttempts = 0;
      // Send SYNC
      this.ws?.send(JSON.stringify({ type: 'SYNC', roomId: this.roomId, playerId: this.playerId }));
    };
    
    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.onMessage(data);
      } catch (e) {
        console.error('Failed to parse WS message', e);
      }
    };
    
    this.ws.onclose = () => {
      console.log('Disconnected from Game Server');
      this.scheduleReconnect();
    };
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnect attempts reached');
      return;
    }
    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000);
    setTimeout(() => this.connect(), delay);
  }

  public sendAction(action: any, revision?: number) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'ACTION',
        roomId: this.roomId,
        playerId: this.playerId,
        revision,
        action
      }));
    }
  }

  public close() {
    if (this.ws) {
      this.ws.onclose = null; // Prevent reconnect
      this.ws.close();
      this.ws = null;
    }
  }
}
