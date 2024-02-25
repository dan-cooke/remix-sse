import { act, renderHook, waitFor } from "@testing-library/react";
import { RemixSseContext, useSubscribe } from "../";

describe('useSubscribe', () => {

  describe('when no options are passed', () => {
    it('should return an array of all messages sent to the event source with key "message"', async () => {
      let sendEvent;
      let eventKey;
      let eventSources = {
        '/test': {
          addEventListener: vi.fn().mockImplementation((key, fn) => {
            eventKey = key;
            sendEvent = fn;
          }),
          removeEventListener: vi.fn(),
          close: vi.fn(),
          onopen: vi.fn(),
          onerror: vi.fn(),
          onmessage: vi.fn(),
          onclose: vi.fn(),
          url: '/test',
          readyState: 1,
          CONNECTING: 0 as const,
          OPEN: 1 as const,
          CLOSED: 2 as const,
          withCredentials: false,
          dispatchEvent: vi.fn()
        }
      };
      const setEventSources = vi.fn().mockImplementation((setterFn) => {
        eventSources = setterFn(eventSources);
      })

      const { result } = renderHook(() => useSubscribe('/test'), {
        wrapper: ({ children }) => (
          <RemixSseContext.Provider
            value={{ setEventSources, eventSources }}>
            {children}
          </RemixSseContext.Provider>
        ),
      });


      act(() => {

        sendEvent({ data: 'something' })
        sendEvent({ data: 'another' })
      })

      expect(eventKey).toEqual('message');

      await waitFor(() => {
        expect(result.current).toEqual(['something', 'another']);
      })

    });
  });

  describe('when returnLatestOnly is true', () => {
    it('should return the latest message sent to the event source', async () => {
      let sendEvent;
      let eventKey;
      let eventSources = {
        '/test': {
          addEventListener: vi.fn().mockImplementation((key, fn) => {
            eventKey = key;
            sendEvent = fn;
          }),
          removeEventListener: vi.fn(),
          close: vi.fn(),
          onopen: vi.fn(),
          onerror: vi.fn(),
          onmessage: vi.fn(),
          onclose: vi.fn(),
          url: '/test',
          readyState: 1,
          CONNECTING: 0 as const,
          OPEN: 1 as const,
          CLOSED: 2 as const,
          withCredentials: false,
          dispatchEvent: vi.fn()
        }
      };
      const setEventSources = vi.fn().mockImplementation((setterFn) => {
        eventSources = setterFn(eventSources);
      })

      const { result } = renderHook(() => useSubscribe('/test', { returnLatestOnly: true }), {
        wrapper: ({ children }) => (
          <RemixSseContext.Provider
            value={{ setEventSources, eventSources }}>
            {children}
          </RemixSseContext.Provider>
        ),
      });

      act(() => {

        sendEvent({ data: 'something' })
        sendEvent({ data: 'another' })
      })

      expect(eventKey).toEqual('message');

      await waitFor(() => {
        expect(result.current).toEqual('another');
      })

    });
  });
});

