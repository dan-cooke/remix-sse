---
"@remix-sse/client": major
---

Changes the API for `useSubscribe` to make an eventKey default to 'message'

Using the library myself in a few projects, I have found that I don't usually need to send multiple events from the same emitter, and one eventKey usually suffices. This change will make it more ergonomic for single event emitters, while remaining flexible for multi event emitters

Previous usage:

```.tsx
const data = useSubscribe('/emitter', 'event-key')

```

New usage

```.tsx
const data = useSubscribe('/emitter', { eventKey: 'event-key'})
```

Or if you want use the default `eventKey: 'message'` you can omit it entirely

```.tsx
const data = useSubscribe('/emitter')
```
