import { useEventStream } from "@remix-sse/client";

export default function Greeting() {
  const greeting = useEventStream("/emitter");


  return (
    <div>
      {JSON.stringify(greeting)}
    </div>
  )

}
