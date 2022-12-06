import { useSse } from '../../../../src/client';
export default function Index() {
  const { greeting, question } = useSse('/basic', ['greeting', 'question'], {
    deserialize: {
      greeting: (serialized: string) =>
        JSON.parse(serialized) as {
          hello: string;
          index: number;
        },
      question: (serialized: string) =>
        JSON.parse(serialized) as {
          question: string;
        },
    },
  });

  console.log(greeting, question);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix-SSE</h1>
      <p>
        This example shows the experimental deserialize feature. Check you're
        console and you will see JS objects have been deserialized from the JSON
        sent from the route.
      </p>

      <h2>Hello Events:</h2>
      {JSON.stringify(greeting)}

      <h2>Question Events</h2>
      {JSON.stringify(question)}
    </div>
  );
}
