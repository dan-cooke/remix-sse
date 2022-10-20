import EventEmitter from 'events';
import { ClientRequest, ClientRequestArgs, IncomingMessage } from 'http';
import { URL } from 'url';
import WebSocket from 'ws';

type Address = string | URL;
type Options = WebSocket.ClientOptions | ClientRequestArgs;

export type SocketConfig = {
  address: Address;
  handleMessage: (rawData: WebSocket.RawData) => {
    eventName: string;
    message: string;
  };
  options?: Options;
  onClose?: (socket: WebSocket, code: number, reason: Buffer) => void;
  onOpen?: (socket: WebSocket) => void;
  onError?: (socket: WebSocket, err: Error) => void;
  onUpgrade?: (socket: WebSocket, request: IncomingMessage) => void;
  onPing?: (socket: WebSocket, data: Buffer) => void;
  onUnexpectedResponse?: (
    socket: WebSocket,
    request: ClientRequest,
    response: IncomingMessage
  ) => WebSocket;
};

export class RemixSocket extends EventEmitter {
  socket: WebSocket;
  public config: SocketConfig;

  constructor(config: SocketConfig) {
    super();
    this.config = config;
    this.connect();
  }

  disconnect() {
    this.socket.removeAllListeners();
    this.removeAllListeners();
    this.socket.close();
  }

  connect() {
    const { address, options, onOpen, onClose, onError, handleMessage } =
      this.config;
    this.socket = new WebSocket(address, options);
    this.socket.on('open', () => {
      onOpen?.(this.socket);
    });
    this.socket.on('close', (code, reason) => {
      onClose?.(this.socket, code, reason);
    });
    this.socket.on('message', (data) => {
      const { eventName, message } = handleMessage(data);
      this.emit(eventName, message);
    });
    this.socket.on('error', (err) => {
      if (onError) {
        return onError(this.socket, err);
      }
      this.onError(err);
    });
  }

  send(message: string) {
    this.socket.send(message);
  }

  onError(e) {
    console.log('Error:', e);
  }
}
