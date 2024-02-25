export type SendFunctionOptions = {
  eventKey: string;
}
export type SendFunction = (data: string, options?: SendFunctionOptions) => void;
export type CleanupFunction = () => void;
export type InitFunction = (send: SendFunction) => CleanupFunction;
