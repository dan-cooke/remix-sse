import { useEventStream } from '@remix-sse/client';

export function Question() {
  const question = useEventStream('/shared', { channel: 'question' });
  return (
    <div>
      <h1>Question:</h1>
      {JSON.stringify(question)}
    </div>
  );
}
