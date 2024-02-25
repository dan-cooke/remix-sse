export type DeserializeFn = (raw: string) => any;

export type EventOptions<
  TReturnLatest extends boolean,
  TDeserialized extends DeserializeFn | never
> = {
  maxEventRetention?: number;
  eventKey?: string;
  returnLatestOnly?: TReturnLatest;
  deserialize?: TDeserialized;
};

export type LatestOrAllEvents<
  TEvent extends string | any,
  TReturnLatest extends boolean | undefined
> = [TReturnLatest] extends [true] ? TEvent : TEvent[];

export type Deserialized<TDeserialized extends DeserializeFn> =
  undefined extends TDeserialized ? string : ReturnType<TDeserialized>;

export type UseSubscribeReturn<
  TReturnLatest extends boolean,
  TDeserialized extends DeserializeFn | never
> = LatestOrAllEvents<Deserialized<TDeserialized>, TReturnLatest> | null;
