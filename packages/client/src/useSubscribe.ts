import { useEffect, useState } from 'react';
import { addNewEvent } from './addNewEvent';
import type { DeserializeFn, EventOptions, UseSubscribeReturn } from './types';

export function useSubscribe<
  TReturnLatest extends boolean,
  TDeserialize extends DeserializeFn | never
>(
  eventSource: EventSource | undefined,
  options: EventOptions<TReturnLatest, TDeserialize> = {
    maxEventRetention: 50,
    eventKey: 'message',
  }
): UseSubscribeReturn<TReturnLatest, TDeserialize> {
  const { deserialize, maxEventRetention, returnLatestOnly, eventKey } = options;
  const [data, setData] =
    useState<UseSubscribeReturn<TReturnLatest, TDeserialize>>(null);

  useEffect(() => {

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
      eventSource.removeEventListener(eventKey ?? "message", handler);
    };

    const addListener = () => {
      eventSource.addEventListener(eventKey ?? "message", handler);
    };

    removeListener();
    addListener();

    return () => {
      removeListener();
    };
  }, [eventKey, options, deserialize, maxEventRetention, returnLatestOnly, eventSource]);

  return data as any;
}
