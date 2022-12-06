import { Greeting } from '~/components/greeting';
import { Question } from '~/components/question';
export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix-SSE</h1>
      <p>
        This is an example of sharing an event source - check your network tab
        and you'll see there is only one connection to the <code>/shared</code>{' '}
        resource route.
      </p>

      <Greeting />
      <Question />
    </div>
  );
}
