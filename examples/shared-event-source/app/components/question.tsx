import { useSubscribe } from '@remix-sse/client';

export function Question() {
  const question = useSubscribe('/shared', 'question');
  return (
    <div>
      <h1>Question:</h1>
      {JSON.stringify(question)}
    </div>
  );
}
