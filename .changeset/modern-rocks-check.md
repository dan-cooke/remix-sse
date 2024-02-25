---
"@remix-sse/server": major
---
Changes the API of the `EventStream` send function to make the eventKey default to 'message'

Using the library myself in a few projects, I have found that I don't usually need to send multiple events from the same emitter, and one eventKey usually suffices. This change will make it more ergonomic for single event emitters, while remaining flexible for multi event emitters


## How to migrate
The first argument of send is now just the data string you wish to send.

- If you want to allow multiple events from the same emitter you can specify an `eventKey` in the second argument
- Otherwise you can just omit the eventKey all together
```diff

export const loader: LoaderFunction = ({ request }) => {
  return new EventStream(request, (send) => {
    let gIndex = 0;
    let g = setInterval(() => {
      gIndex += 1;
---   send('message', JSON.stringify({ hello: 'world', index: gIndex }));
+++   send(JSON.stringify({ hello: 'world', index: gIndex }));
    }, 1000);


    return async () => {
      clearInterval(g);
    };
  });
};
```

