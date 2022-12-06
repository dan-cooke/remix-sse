import { useSse } from '../../../../src/client';
export default function Index() {
  const { greeting, question } = useSse('/basic', ['greeting', 'question']);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix-SSE</h1>

      <h2>Hello Events:</h2>
      {greeting}

      <h2>Question Events</h2>
      {question}
    </div>
  );
}
