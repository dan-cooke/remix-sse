import { createCookieSessionStorage } from "@remix-run/node"

const { getSession, commitSession } = createCookieSessionStorage({
  cookie: {
    name: '__session',
    sameSite: 'lax',
    path: '/',
  }
})
export {
  getSession,
  commitSession
}
