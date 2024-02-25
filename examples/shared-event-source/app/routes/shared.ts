import { LoaderFunction } from '@remix-run/node';

import { EventStream } from '@remix-sse/server';

export const loader: LoaderFunction = ({ request }) => {
  return new EventStream(request, (send) => {
    let gIndex = 0;
    let g = setInterval(() => {
      gIndex += 1;
      send('message', JSON.stringify({ hello: 'world', index: gIndex }));
    }, 1000);


    return async () => {
      clearInterval(g);
    };
  });
};
