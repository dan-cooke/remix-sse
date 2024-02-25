export type SendFunctionOptions = {
  channel: string;
}
export type SendFunction = (data: string, options?: SendFunctionOptions) => void;
export type CleanupFunction = () => void;
export type InitFunction = (send: SendFunction) => CleanupFunction;
