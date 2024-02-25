import { useSubscribe } from '@remix-sse/client';

export function Greeting() {
  const greeting = useSubscribe('/shared', 'greeting');
  return (
    <div>
      <h1>Greeting is:</h1>
      {JSON.stringify(greeting)}
    </div>
  );
}
