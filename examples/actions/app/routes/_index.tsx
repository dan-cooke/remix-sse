import { type ActionFunction, type MetaFunction, json } from '@remix-run/node';
import { Form, redirect } from '@remix-run/react';
import { commitSession, getSession } from '~/session.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};


export const action: ActionFunction = async ({ request }) => {

  const formData = await request.formData()
  const session = await getSession(request.headers.get('Cookie'))

  session.set('name', formData.get('name'));

  return redirect('/greeting', {
    headers: {
      'Set-Cookie': await commitSession(session)
    },
  })
}


export default function Index() {


  return (
    <Form method="post">
      <h1>Click the button to trigger the event source</h1>
      <input type="text" name="name" />
      <button type="submit">Trigger</button>
    </Form>
  );
}
