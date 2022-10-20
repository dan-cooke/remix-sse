# @remix-sse/core

This is the core library for implementing SSE and WebSocket routes.

# Classes

## `EventStream`

Extending the web fetch `Response`, you can return this from your resource route `loader` instead of a `Response` to initiate an EventStream.

# Hooks

## `useEventSource`

Use this hook to subscribe your UI to the `EventStream` you have returned from a resource route.
