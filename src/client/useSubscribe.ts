import { useEffect, useState } from 'react';
import { addNewEvent } from './addNewEvent';
import { useRemixSseContext } from './RemixSseProvider';

export type UseSubscribeOptions<TKey extends string, TEvent> = {
  maxEventRetention?: number;
  deserialize?: Partial<Record<TKey, (serialized: string) => TEvent>>;
};
export function useSubscribe<TKey extends string, TEvent>(
  url: string,
  events: TKey[],
  options: UseSubscribeOptions<TKey, TEvent> = {
    maxEventRetention: 50,
  }
) {
  const { maxEventRetention, deserialize } = options;
  const [data, setData] = useState<Record<TKey, TEvent[]>>({
    ...events.reduce(
      (acc, curr) => ({ ...acc, [curr]: [] }),
      {} as Record<TKey, TEvent[]>
    ),
  });

  const { eventSources } = useRemixSseContext();

  useEffect(() => {
    const eventSource = eventSources[url];

    if (!eventSource) return;

    function handler(event: MessageEvent) {
      setData((previous) => ({
        ...previous,
        [event.type]: addNewEvent(
          options.deserialize?.[event.type]
            ? deserialize?.[event.type](event.data)
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
    }, 100);

    return () => {
      removeListeners();
    };
  }, [url, events, maxEventRetention, eventSources]);

  console.log(data);

  return data;
}
