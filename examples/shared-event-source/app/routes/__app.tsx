import { Outlet } from '@remix-run/react';
import { useEventSource } from '../../../../src/client/useEventSource';

export default function AppLayout() {
  // If you need to subscribe to events in this
  // component you could also use `useSse` here
  useEventSource('/shared');

  return <Outlet />;
}
