---
"@remix-sse/client": major
---

- `useSubscribe` changed to take an `EventSource`
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

