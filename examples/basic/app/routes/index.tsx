import { useSse } from '../../../../src/client';
export default function Index() {
  const { greeting, question } = useSse('/basic', ['greeting', 'question']);

  // You can pass returnLatestOnly if you don't care about retaining events
  const { greeting: mostRecentGreeting } = useSse('/basic', ['greeting'], {
    returnLatestOnly: true,
  });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix-SSE</h1>

      <h2>Greetings:</h2>
      {greeting}

      <h2>Questions:</h2>
      {question}

      <h2>Most Recent Greeting:</h2>
      {mostRecentGreeting}
    </div>
  );
}