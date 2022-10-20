import { LoaderFunction } from '@remix-run/node';
import { EventStream } from '@remix-sse/core';
import { RemixSocket } from '@remix-sse/emitter-remix-socket';

export const EVENT_NAME = 'message';
export const loader: LoaderFunction = ({ request }) => {
  return new EventStream(request, (send) => {
    // In the init function, setup your SSE Event source

    // In this example I will use the RemixSocket from the util package
    // to create a WebSocket connection.
    const socket = new RemixSocket({
      // Open a connection with the postman echo util
      // This service does not send data, only echoes back what clients send.
      address: 'wss://ws.postman-echo.com/raw',
      onOpen: () => {
        // Because no data is sent by default - we will start sending messages to
        // "simulate" events as soon as the connection is established.
        let i = 0;
        setInterval(() => {
          socket.send('Event:' + i++);
        }, 500);
      },
      // The handle message function is required for RemixSocket
      // Its purpose is to generate an "Event" that the EventEmitter
      // listener can pick up.
      handleMessage: (raw: any) => {
        return {
          // I am calling this event message, but you could parse the event from the raw data here instead
          eventName: EVENT_NAME,
          message: raw.toString(),
        };
      },
    });

    // Listen for this event coming through
    socket.on(EVENT_NAME, (message: any) => {
      // You could also circumvent this method, and just send directly from `handleMessage`
      send(EVENT_NAME, message);
    });

    // This is the EventStream cleanup function - make sure you close all active connections
    // and remove any event listeners.
    return () => {
      socket.disconnect();
    };
  });
};
