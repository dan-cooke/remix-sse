import { useEventStream, useSubscribe } from '@remix-sse/client';

export function Question() {
  const question = useEventStream('/shared', { eventKey: 'question' });
  return (
    <div>
      <h1>Question:</h1>
      {JSON.stringify(question)}
    </div>
  );
}
