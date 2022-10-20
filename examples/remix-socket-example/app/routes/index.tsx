import { useEventSource } from '@remix-sse/core';

export default function Index() {
  const data = useEventSource('/emitter');
  console.log(data);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix SSE</h1>
      {JSON.stringify(data)}
    </div>
  );
}
