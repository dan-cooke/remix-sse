# `remix-sse`

Server Side Events (SSE) and WebSockets for Remix, made easy.

# Installation

```
npm i remix-sse
```

# Usage

1. Setup your emitter route, here it is called `/routes/emitter.tsx` for simplicity

> Note: This **MUST** be a resource route, you cannot return a component from this route.

```.ts
import { EventStream } from 'remix-sse'
export const loader: LoaderFunction = ({ request }) => {

  // Return the EventStream from your route loader
  return new EventStream(request, (send) => {
    // In the init function, setup your SSE Event source

    const ws = new WebSocket('ws://your-socket')


    // You can send events to the client via the `send` function
    send({ foo: 'bar' })

    ws.addEventListener('message', (msg) =>{
	// The loader remains open as a readable stream, so you can send data asynchronously as well
	send(msg)
    })

    return () => {
      // Return a cleanup function
      socket.disconnect();
    };
  });
};
```

2. Call the `useEventSource` hook in the browser to start receiving events.

````.ts
import { useEventSource } from 'remix-sse/client'

const data = useEventSource('/emitter');

```
````
