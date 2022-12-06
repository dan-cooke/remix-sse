import { useSubscribe } from '../../../../src/client';

export function Question() {
  const { question } = useSubscribe('/shared', ['question']);
  return (
    <div>
      <h1>Question:</h1>
      {question}
    </div>
  );
}
