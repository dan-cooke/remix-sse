import { useSubscribe } from '../../../../src/client';

export function Greeting() {
  const { greeting } = useSubscribe('/shared', ['greeting']);
  return (
    <div>
      <h1>Greeting is:</h1>
      {greeting}
    </div>
  );
}
