export type SendFunction = (event: string, data: string) => void;
export type CleanupFunction = () => void;
export type InitFunction = (send: SendFunction) => CleanupFunction;
