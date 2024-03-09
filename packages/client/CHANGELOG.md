# @remix-sse/client

## 1.0.1

### Patch Changes

- c5eb797: Allow the callback passed to EventStream to be async

## 1.0.0

### Major Changes

- 08b640b: Changes the API for `useSubscribe` to make an eventKey default to 'message'

  Using the library myself in a few projects, I have found that I don't usually need to send multiple events from the same emitter, and one eventKey usually suffices. This change will make it more ergonomic for single event emitters, while remaining flexible for multi event emitters

  ## How to migrate

  ```diff
  --- const data = useSubscribe('/emitter', 'event-key')
  +++ const data = useSubscribe('/emitter', { eventKey: 'event-key'})
  ```

  Or if you want use the default `eventKey: 'message'` you can omit it entirely

  ```.tsx
  const data = useSubscribe('/emitter')
  ```

- 7178870: Split up the single `remix-sse` package into 2 seperate packages `@remix-sse/client` and `@remix-sse/server`

  ## Why

  Exporting both the client and server code from a single package has never sat well with me, at the start I got by releasing a single package: remix-sse for server code and remix-sse/client for client code.

  This works fine if you are trasnpiling CommonJS imports, but at some point recently create-remix has started every project with type: "module" (ES Modules).

  So this made our import paths quite ugly:
  `remix-sse/client/index.js` -

  Not to mention this uglier syntax was less discoverable now by language servers.

  ## How to migrate

  - Find and replace `import 'remix-sse/client'` -> `import '@remix-sse/client'`
  - Find and replace `import 'remix-sse'` -> `import '@remix-sse'`

- 3159987: - `useSubscribe` changed to take an `EventSource`

  - new `useEventStream` hook to be superseed `useSubscribe` as the ergonomic way of listening to events
  - removed `useEventSource`
  - removed `RemixSseProvider`

  # No more boilerplate

  I wasn't happy with the amount of boilerplate even after making several changes like [making the eventKey default to 'message'](https://github.com/dan-cooke/remix-sse/commit/08b640be243af59bd62dbff15f93ee6a09d3fb71)

  The library should not provide the context, if users want to share their event sources across their app they are free to do so, but `remix-sse` should not care about this.

  So the following changes all have the intention of making the library easier to get started with.

  ### How to migrate

  ### `useSubscribe` now takes an `EventSource`

  ```diff
  --- const data = useSubscribe('/emitter', 'event-key')
  +++ const data = useSubscribe(new EventSource('/emitter'), { eventKey: 'event-key'})
  ```

  This was purely to make room for the next change

  ### `useEventStream` is the MVP now

  Use this hook wherever possible, it will create the EventSource for you and call `useSubscribe` making sure
  to not duplicate Eventsources to the same URL using a simple map.

  ```.tsx

  const data = useEventStream('/emitter')

  ```

  ### Removed the context and useEventStream

  No need for a context, we can just store a url -> event source map globally
