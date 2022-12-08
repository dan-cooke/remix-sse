import { Outlet } from '@remix-run/react';
import { useEventSource } from '../../../../src/client/useEventSource';

export default function AppLayout() {
  useEventSource('/shared');

  return <Outlet />;
}
