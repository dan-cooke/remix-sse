export type InitFunction = (send: SendFunction) => CleanupFunction;
export type SendFunction = (event: string, data: string) => void;
export type CleanupFunction = () => void;
