import { useEffect, useState } from 'react';
import { addNewEvent } from './addNewEvent';
import { useRemixSseContext } from './RemixSseProvider';
import type { DeserializeFn, EventOptions, UseSubscribeReturn } from './types';

export function useSubscribe<
  TReturnLatest extends boolean,
  TDeserialize extends DeserializeFn | undefined
>(
  url: string,
  eventKey: string,
  options: EventOptions<TReturnLatest, TDeserialize> = {
    maxEventRetention: 50,
  }
): UseSubscribeReturn<TReturnLatest, TDeserialize> {
  const { eventSources } = useRemixSseContext();
  const { deserialize, maxEventRetention, returnLatestOnly } = options;
  const [data, setData] =
    useState<UseSubscribeReturn<TReturnLatest, TDeserialize>>(null);

  useEffect(() => {
    const eventSource = eventSources[url];

    if (!eventSource) return;

    function handler(event: MessageEvent) {
      setData((previous) => {
        const newEventData = deserialize
          ? deserialize?.(event.data)
          : event.data;

        if (returnLatestOnly) {
          return newEventData;
        }

        if (Array.isArray(previous)) {
          return addNewEvent(newEventData, previous, maxEventRetention);
        }

        if (!previous) {
          return addNewEvent(newEventData, [], maxEventRetention);
        }

        return previous;
      });
    }

    const removeListener = () => {
      eventSource.removeEventListener(eventKey, handler);
    };

    const addListener = () => {
      eventSource.addEventListener(eventKey, handler);
    };

    removeListener();
    addListener();

    return () => {
      removeListener();
    };
  }, [url, eventKey, options, eventSources, deserialize, maxEventRetention, returnLatestOnly]);

  return data as any;
}
