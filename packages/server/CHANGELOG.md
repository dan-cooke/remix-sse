# @remix-sse/server

## 1.0.1

### Patch Changes

- c5eb797: Allow the callback passed to EventStream to be async

## 1.0.0

### Major Changes

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

- 08b640b: Changes the API of the `EventStream` send function to make the eventKey default to 'message'

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
