import { useSubscribe } from 'remix-sse/dist/client/index.js';

export function Question() {
  const question = useSubscribe('/shared', 'question');
  return (
    <div>
      <h1>Question:</h1>
      {JSON.stringify(question)}
    </div>
  );
}
