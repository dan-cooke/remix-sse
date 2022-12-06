import { useState, useEffect, useRef } from 'react';
import { addNewEvent } from './discardOldEvents';

type UseEventSourceOptions<TKey extends string, TEvent> = {
  maxEventRetention?: number;
  deserialize?: Partial<Record<TKey, (serialized: string) => TEvent>>;
};
/**
 * This hook is to be used in the Browser.
 * It will subscribe to your chosen event source
 *
 * @param url - URL of your desired EventSource
 * @param events - you should pass a list of string keys that you will send from
 * your resource route
 * @example
 * // In the resource route
 * send('someKey', JSON.stringify(data))
 *
 * // On your client
 * useEventSource('/some-resource', ['someKey'])
 * @returns
 */
export function useEventSource<TKey extends string, TEvent>(
  url: string,
  events: TKey[],
  options: UseEventSourceOptions<TKey, TEvent> = {
    maxEventRetention: 50,
  }
): Record<TKey, TEvent[]> {
  const [data, setData] = useState<Record<TKey, TEvent[]>>({
    ...events.reduce(
      (acc, curr) => ({ ...acc, [curr]: [] }),
      {} as Record<TKey, TEvent[]>
    ),
  });
  const { maxEventRetention } = options;

  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!events) {
      throw Error('You have not passed any event keys to useEventSource');
    }

    if (!eventSourceRef.current) {
      eventSourceRef.current = new EventSource(url);
    }
    const eventSource = eventSourceRef.current;

    function handler(event: MessageEvent) {
      setData((previous) => ({
        ...previous,
        [event.type]: addNewEvent(
          options.deserialize?.[event.type]
            ? options.deserialize?.[event.type](event.data)
            : event.data,
          previous[event.type],
          maxEventRetention
        ),
      }));
    }

    const removeListeners = () => {
      events.forEach((e) => {
        eventSource.removeEventListener(e, handler);
      });
    };

    removeListeners();

    events.forEach((e) => {
      eventSource.addEventListener(e, handler);
    });

    return () => {
      removeListeners();
    };
  }, [url, events, maxEventRetention]);

  return data;
}
