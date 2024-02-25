import { renderHook, waitFor } from '@testing-library/react';
import { RemixSseContext, useEventSource } from '../';

describe('useEventSource', () => {
  it('should call setEventSource with the given url', async () => {
    let eventSources = {};
    const setEventSources = vi.fn().mockImplementation((setterFn) => {
      eventSources = setterFn(eventSources);
    })


    // stub the event source class
    const EventSource = vi.fn();
    vi.stubGlobal('EventSource', EventSource);

    renderHook(() => useEventSource('/test'), {
      wrapper: ({ children }) => (
        <RemixSseContext.Provider
          value={{ setEventSources, eventSources: {} }}
        >
          <div data-testid="eventSources">{JSON.stringify(eventSources)}</div>
          {children}
        </RemixSseContext.Provider>
      ),
    });

    await waitFor(() => {

      expect(eventSources).toEqual({ '/test': new EventSource('/test') })

      expect(EventSource).toHaveBeenCalledWith('/test');

    })

  });
});
