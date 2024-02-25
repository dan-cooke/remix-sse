import { useEventStream } from '@remix-sse/client';

export function Greeting() {
  const greeting = useEventStream('/shared', { channel: 'greeting' });
  return (
    <div>
      <h1>Greeting is:</h1>
      {JSON.stringify(greeting)}
    </div>
  );
}
