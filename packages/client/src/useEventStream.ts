import { useEffect, useRef, useState } from 'react';
import { useSubscribe } from './useSubscribe';
import type { DeserializeFn, EventOptions } from './types';

/**
 * A handy wrapper around `useSubscribe` that creates an `EventSource` for you.
 *
 * Note: this will store the `EventSource` in a map, so if you create multiple
 * `EventSource` instances with the same URL, it will only create one.
 *
 * This allows you to re-use the same `EventSource` instance across multiple
 * components without the need for context.
 *
 * @param url The URL to create an `EventSource` from.
 * @param options Options for the event stream.
 * @returns The data from the event stream.
 **/
export function useEventStream<
  TReturnLatest extends boolean,
  TDeserialize extends DeserializeFn | never
>(
  url: string,
  options?: EventOptions<TReturnLatest, TDeserialize>
) {
  const createdRef = useRef(false);
  const [source, setSource] = useState<EventSource | undefined>(undefined);
  useEffect(() => {
    if (createdRef.current || sources.get(url)) return;
    let _source = new EventSource(url);
    sources.set(url, _source);
    setSource(_source);
    createdRef.current = true;
  }, [url]);
  return useSubscribe(source, options);
}

const sources = new Map<string, EventSource>();
