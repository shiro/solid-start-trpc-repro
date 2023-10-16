# Solid Start TRPC repro

There seems to be a bug in Solid Start when used with trpc that results in the server crashing on request.

This was reproduced by at least 1 other person on the discord, with node versions `18.6.0` and `20.8.0`, so the version is probably not relevant.

Some observations:

- works fine in dev, crashes only in production
- happens even if the `src/routes/api` directory is removed, so it's not related with the backend API code
- error goes away when the trpc query in the `src/routes/index.tsx` is removed - error probably happens when the trpc query is SSR-ed.
- crashes on both `renderAsync` and `renderStream`, but not `renderSync` (in `src/entry-server.tsx`)
- downgrading `@trpc/server` and `@trpc/client` by 1 version doesn't fix it
- happens with both `solid-trpc@0.1.0-sssr.8` (solid start build) and `solid-trpc@0.0.12-rc.3` (general build) - see the `trpc-beta` branch for the code


## Steps to reproduce

```
yarn
yarn build && yarn start
# go to 'http://localhost:3000/' and observe the server crashing
```

## Error output

```
 solid-start start
 version  0.3.6
 adapter  node


  ➜  Page Routes:
     └─ http://localhost:3000/

  ➜  API Routes:
     None! 👻

Listening on port 3000
file:///home/shiro/tmp/test/my-app/dist/server.js:38779
:return "\\n";case"\r":return "\\r";case"\b":return <...very long source code dump>

m [Error]: Unsupported type "[object Response]"
    at Gt (file:///home/shiro/tmp/test/my-app/dist/server.js:38779:18111)
    at R (file:///home/shiro/tmp/test/my-app/dist/server.js:38779:18302)
    at wr (file:///home/shiro/tmp/test/my-app/dist/server.js:38779:14289)
    at Ar (file:///home/shiro/tmp/test/my-app/dist/server.js:38779:15261)
    at Gt (file:///home/shiro/tmp/test/my-app/dist/server.js:38779:17504)
    at R (file:///home/shiro/tmp/test/my-app/dist/server.js:38779:18302)
    at wr (file:///home/shiro/tmp/test/my-app/dist/server.js:38779:14289)
    at Ke (file:///home/shiro/tmp/test/my-app/dist/server.js:38779:15509)
    at Gt (file:///home/shiro/tmp/test/my-app/dist/server.js:38779:17997)
    at R (file:///home/shiro/tmp/test/my-app/dist/server.js:38779:18302) {
  value: Response {
    [Symbol(realm)]: null,
    [Symbol(state)]: {
      aborted: false,
      rangeRequested: false,
      timingAllowPassed: true,
     ... <lots more properties>
  }
Node.js v20.8.0
```
