import { useEventSource } from './useEventSource';
import { useSubscribe, UseSubscribeOptions } from './useSubscribe';

export type UseSseOptions<
  TKey extends string,
  TEvent,
  TLatestOnly extends boolean
> = UseSubscribeOptions<TKey, TEvent, TLatestOnly>;
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
 * useSse('/some-resource', ['someKey'])
 * @returns
 */
export function useSse<
  TKey extends string,
  TEvent,
  TLatestOnly extends boolean
>(
  url: string,
  events?: TKey[],
  options: UseSseOptions<TKey, TEvent, TLatestOnly> = {
    maxEventRetention: 50,
  }
) {
  useEventSource(url);
  return useSubscribe(url, events, options);
}
