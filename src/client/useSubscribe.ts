import { useEffect, useState } from 'react';
import { addNewEvent } from './addNewEvent';
import { useRemixSseContext } from './RemixSseProvider';

export type UseSubscribeOptions<
  TKey extends string,
  TEvent extends string | any,
  TReturnLatest extends boolean
> = {
  maxEventRetention?: number;
  returnLatestOnly?: TReturnLatest;
  deserialize?: Partial<Record<TKey, (serialized: string) => TEvent>>;
};

export type LatestOrAllEvents<
  TKey extends string,
  TEvent extends string | any,
  TReturnLatest extends boolean | undefined
> = [TReturnLatest] extends [true]
  ? Record<TKey, TEvent>
  : Record<TKey, TEvent[]>;

export function useSubscribe<
  TKey extends string,
  TEvent extends string | any,
  TReturnLatest extends boolean
>(
  url: string,
  events: TKey[],
  options: UseSubscribeOptions<TKey, TEvent, TReturnLatest> = {
    maxEventRetention: 50,
  }
): [TReturnLatest] extends [true]
  ? Record<TKey, TEvent>
  : Record<TKey, TEvent[]> {
  const { maxEventRetention, deserialize, returnLatestOnly } = options;
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

  if (returnLatestOnly) {
    return Object.entries(data).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: (value as TEvent[]).pop() }),
      {} as any
    );
  }

  return data as any;
}
