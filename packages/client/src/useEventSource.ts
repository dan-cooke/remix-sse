import { useEffect, useRef } from 'react';
import { useRemixSseContext } from './RemixSseProvider';

export const useEventSource = (url: string) => {
  const { eventSources, setEventSources } = useRemixSseContext();
  const createdRef = useRef<EventSource>();
  useEffect(() => {
    if (createdRef.current) return;
    if (url && !eventSources[url]) {
      const eventSource = new EventSource(url);
      createdRef.current = eventSource;
      setEventSources((prev) => ({ ...prev, [url]: eventSource }));
    }
  }, [url, eventSources, setEventSources]);
};
