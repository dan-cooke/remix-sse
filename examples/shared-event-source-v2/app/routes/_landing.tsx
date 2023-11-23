import { Outlet } from '@remix-run/react';
import { useEventSource } from 'remix-sse/dist/client/index.js';

export default function AppLayout() {
  useEventSource('/shared');

  return <Outlet />;
}
