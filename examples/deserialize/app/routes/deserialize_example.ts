import { LoaderFunction } from '@remix-run/node';

import { EventStream } from '@remix-sse/server';

export const loader: LoaderFunction = ({ request }) => {
  return new EventStream(request, (send) => {
    let gIndex = 0;
    let g = setInterval(() => {
      gIndex += 1;
      send((Math.random() * gIndex * 1000).toString(), { channel: 'assetValue' });
    }, 1000);

    let q = setInterval(() => {
      send(
        JSON.stringify([
          { stock: 'AAPL', latestPrice: Math.random() * 100 },
          {
            stock: 'TSLA',
            latestPrice: Math.random() * 100,
          },
        ]), {
        channel: 'holdingsArray'
      }
      );
    }, 500);

    return async () => {
      clearInterval(g);
      clearInterval(q);
    };
  });
};
