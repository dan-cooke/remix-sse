import { act, renderHook, waitFor } from "@testing-library/react";
import { useSubscribe } from "../";

describe('useSubscribe', () => {

  describe('when no options are passed', () => {
    it('should return an array of all messages sent to the event source with key "message"', async () => {
      let sendEvent;
      let channel;
      let eventSources = {
        '/test': {
          addEventListener: vi.fn().mockImplementation((key, fn) => {
            channel = key;
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

      const { result } = renderHook(() => useSubscribe(eventSources['/test']));


      act(() => {

        sendEvent({ data: 'something' })
        sendEvent({ data: 'another' })
      })

      expect(channel).toEqual('message');

      await waitFor(() => {
        expect(result.current).toEqual(['something', 'another']);
      })

    });
  });

  describe('when returnLatestOnly is true', () => {
    it('should return the latest message sent to the event source', async () => {
      let sendEvent;
      let channel;
      let eventSources = {
        '/test': {
          addEventListener: vi.fn().mockImplementation((key, fn) => {
            channel = key;
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

      const { result } = renderHook(() => useSubscribe(eventSources['/test'], { returnLatestOnly: true }));

      act(() => {

        sendEvent({ data: 'something' })
        sendEvent({ data: 'another' })
      })

      expect(channel).toEqual('message');

      await waitFor(() => {
        expect(result.current).toEqual('another');
      })

    });
  });
});

