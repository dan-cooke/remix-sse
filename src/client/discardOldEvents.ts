export const addNewEvent = (event: any, events: any[], maxEvents: number) => {
  if (events.length > maxEvents) {
    return [...events.shift(), event];
  }
  return [...events, event];
};
