import type { InitFunction, SendFunction } from './types';

export class EventStream extends Response {
  constructor(request: Request, init: InitFunction) {
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const send: SendFunction = (data, options) => {
          controller.enqueue(encoder.encode(`event: ${options?.channel ?? 'message'}\n`));
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        };
        const cleanup = await init(send);

        let closed = false;
        const close = () => {
          if (closed) return;
          cleanup();
          closed = true;
          request.signal.removeEventListener('abort', close);
          controller.close();
        };

        request.signal.addEventListener('abort', close);
        if (request.signal.aborted) {
          close();
        }
      },
    });

    const headers = new Headers();
    headers.append('Content-Type', 'text/event-stream');
    super(stream, { headers });
  }
}
