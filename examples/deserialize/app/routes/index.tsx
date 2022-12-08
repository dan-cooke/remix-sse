import { useEventSource, useSubscribe } from '../../../../src/client';
import { Holding } from './types';

type Greeting = {
  hello: string;
  index: number;
};
type Question = {
  question: string;
};
export default function Index() {
  // Setup event source
  useEventSource('/deserialize_example');

  // subscribe to relevant events

  // Deserialize values as you wish
  // type = number
  const assetValue = useSubscribe('/deserialize_example', 'assetValue', {
    deserialize: (raw) => Number(raw),
    returnLatestOnly: true,
  });

  // type: Holding[]
  const holdings = useSubscribe('/deserialize_example', 'holdingsArray', {
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
