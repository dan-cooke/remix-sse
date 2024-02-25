import type { MetaFunction } from '@remix-run/node';
import {
  useEventStream,
} from '@remix-sse/client';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  // By default, useSubscribe will return an array of all messages sent to the event source with key "message"
  const greetings = useEventStream('/basic');

  // You could also use the returnLatestOnly option to only return the most recent message
  const mostRecentGreeting = useEventStream('/basic', {
    channel: 'message', // default is 'message'
    returnLatestOnly: true,
  });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix-SSE</h1>

      <h2>Greetings:</h2>
      {JSON.stringify(greetings)}

      <h2>Most Recent Greeting:</h2>
      {JSON.stringify(mostRecentGreeting)}
    </div>
  );
}
