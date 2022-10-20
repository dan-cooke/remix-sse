import { useState, useEffect } from 'react';

/**
 * This hook is to be used in the Browser.
 * It will subscribe to your chosen event source
 *
 * @param url - URL of your desired EventSource
 * @returns
 */
export type UseEventSourceProps = {
  eventName?: string;
};
export function useEventSource(
  url: string,
  { eventName = 'message' }: UseEventSourceProps = {}
) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(url);
    eventSource.addEventListener(eventName, handler);

    function handler(event: MessageEvent) {
      setData((p) => [...p, event.data || 'unknown']);
    }

    return () => {
      eventSource.removeEventListener(eventName, handler);
    };
  }, [url]);

  return data;
}
