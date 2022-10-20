# `remix-sse`

Server Side Events (SSE) and WebSockets made easy with Remix.

## Introduction

This monorepo contains several packages for working with SSE and Websockets.

- [@remix-sse/core](/libs/core/) - The base set of functionality, contains the most atomic building blocks for SSE/WebSockets

## Examples

Check out the [example projects](/examples/) for in-depth examples.

## Quick Start

Install the core lib

```
npm i @remix-sse/core
```

1. Setup your emitter route, here it is called `/routes/emitter.tsx` for simplicity

> Note: This **MUST** be a resource route, you cannot return a component from this route.

```.ts
import { EventStream } from '@remix-sse/core'
export const loader: LoaderFunction = ({ request }) => {

  // Return the EventStream from your route loader
  return new EventStream(request, (send) => {
    // In the init function, setup your SSE Event source

    // Connect to your server or "local" event emitter here
    // Check the example projects for more guidance

    // This is the EventStream cleanup function - make sure you close all active connections
    // and remove any event listeners.
    return () => {
      socket.disconnect();
    };
  });
};

```

2. Call the `useEventSource` hook in the browser to start receiving events.

```.ts
import { useEventSource } from '@remix-sse/core'
const data = useEventSource('/emitter');
```

## Development

Coming Soon

## Testing

Coming Soon

## Real documentation

Coming soon
