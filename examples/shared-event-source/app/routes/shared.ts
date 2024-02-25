import type { LoaderFunction } from '@remix-run/node';

import { EventStream } from '@remix-sse/server';

export const loader: LoaderFunction = ({ request }) => {
  return new EventStream(request, (send) => {
    let gIndex = 0;
    let qIndex = 0;
    let g = setInterval(() => {
      gIndex += 1;
      send(JSON.stringify({ hello: 'world', index: gIndex }), { eventKey: 'greeting' });
    }, 1000);

    let q = setInterval(() => {
      qIndex += 1;
      send(JSON.stringify({ hello: 'world', index: qIndex }), { eventKey: 'question' });
    }, 1000);

    return async () => {
      clearInterval(g);
      clearInterval(q);
    };
  });
};
