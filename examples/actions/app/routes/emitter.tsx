import { LoaderFunction } from '@remix-run/node';

import { EventStream } from '@remix-sse/server';
import { getSession } from '~/session.server';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const name = session.get('name');
  return new EventStream(request, (send) => {
    const g = setInterval(() => {
      send(JSON.stringify({ message: `Hello from remix-sse your name is : ${name}` }));
    }, 1000);


    return async () => {
      clearInterval(g);
    };
  });
};
