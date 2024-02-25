import { Outlet } from '@remix-run/react';
import { useEventSource } from '@remix-sse/client';

export default function AppLayout() {
  useEventSource('/shared');

  return <Outlet />;
}
