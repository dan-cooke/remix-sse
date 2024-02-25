---
"@remix-sse/client": major
"@remix-sse/server": major
---
Split up the single `remix-sse` package into 2 seperate packages `@remix-sse/client` and `@remix-sse/server`


## Why
Exporting both the client and server code from a single package has never sat well with me, at the start I got by releasing a single package: remix-sse for server code and remix-sse/client for client code.

This works fine if you are trasnpiling CommonJS imports, but at some point recently create-remix has started every project with type: "module" (ES Modules).

So this made our import paths quite ugly:
`remix-sse/client/index.js` - 

Not to mention this uglier syntax was less discoverable now by language servers.

## How to migrate
- Find and replace `import 'remix-sse/client'` -> `import '@remix-sse/client'`
- Find and replace `import 'remix-sse'` -> `import '@remix-sse'`
