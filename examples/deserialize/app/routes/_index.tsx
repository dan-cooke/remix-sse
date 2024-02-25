import type { MetaFunction } from '@remix-run/node';
import {
  useEventStream,
} from '@remix-sse/client';
import type { Holding } from './types';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {

  // Deserialize values as you wish
  // type = number
  const assetValue = useEventStream('/deserialize_example', {
    eventKey: 'assetValue',
    deserialize: (raw) => Number(raw),
    returnLatestOnly: true,
  });

  // type: Holding[]
  const holdings = useEventStream('/deserialize_example', {
    eventKey: 'holdingsArray',
    deserialize: (raw) => JSON.parse(raw) as Holding[],
    returnLatestOnly: true,
  });

  console.log(assetValue, holdings);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix-SSE</h1>
      <p>
        This example shows the experimental deserialize feature. Check you're
        console and you will see JS objects have been deserialized from the JSON
        sent from the route.
      </p>

      <h2>Asset Value:</h2>
      {JSON.stringify(assetValue)}

      <h2>Holdings</h2>
      {JSON.stringify(holdings)}
    </div>
  );
}
