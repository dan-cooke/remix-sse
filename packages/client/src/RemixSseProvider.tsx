import { createContext, useContext, useState } from 'react';

export const RemixSseContext = createContext<{
  eventSources: Record<string, EventSource>;
  setEventSources: React.Dispatch<
    React.SetStateAction<Record<string, EventSource>>
  >;
}>(null);

export function RemixSseProvider({ children }: React.PropsWithChildren) {
  const [eventSources, setEventSources] = useState({});
  return (
    <RemixSseContext.Provider value={{ eventSources, setEventSources }}>
      {children}
    </RemixSseContext.Provider>
  );
}

export function useRemixSseContext() {
  const context = useContext(RemixSseContext);

  if (!context) throw Error('No RemixSseProvider found');

  return context;
}
