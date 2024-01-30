Overview
========

This document is intended as a way to track issues that have been found that
were particularly tricky to resolve.  The intention of doing this is to help any
other developer from taking a long time to resolve similar issues that they
find.

Issues
======

`Could not find \"store\" in the context of \"Connect(...)\"`
-------------------------------------------------------------

At first it was thought that this had something to do with the I18 component
used, but it was anything that was a container!  So, this had something to do
with using redux inside the rollup built library atoll-shared that was consumed
by atoll-core.

**Details**

As soon as the `Uncaught Invariant Violation: Invalid hook call` originating in
`useMemo` issue was resolved, this issue was encountered next.

{"status":"error","message":"Could not find \"store\" in the context of \"Connect(withI18nextTranslation(App))\". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to Connect(withI18nextTranslation(App)) in connect options.","stack":["Invariant Violation: Could not find \"store\" in the context of \"Connect(withI18nextTranslation(App))\". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to Connect(withI18nextTranslation(App)) in connect options.","at invariant (C:/Git/51ngul4r1ty/atoll-shared/node_modules/invariant/invariant.js:40:15)","at ConnectFunction (C:/Git/51ngul4r1ty/atoll-shared/node_modules/react-redux/lib/components/connectAdvanced.js:153:33)","at processChild (./node_modules/react-dom/cjs/react-dom-server.node.development.js:3090:14)","at resolve (./node_modules/react-dom/cjs/react-dom-server.node.development.js:3013:5)","at ReactDOMServerRenderer.render (./node_modules/react-dom/cjs/react-dom-server.node.development.js:3436:22)","at ReactDOMServerRenderer.read (./node_modules/react-dom/cjs/react-dom-server.node.development.js:3395:29)","at renderToString (./node_modules/react-dom/cjs/react-dom-server.node.development.js:3954:27)","at eval (webpack:///./src/server/middleware/serverRenderer.tsx?:26:90)","at Layer.handle [as handle_request] (./node_modules/express/lib/router/layer.js:95:5)","at trim_prefix (./node_modules/express/lib/router/index.js:317:13)"]}

**Resolution**

* Stopped using `npm link` and instead used `yalc` (see [Tools](./Tools.md) for
   details).


`Uncaught Invariant Violation: Invalid hook call` originating in `useMemo`
--------------------------------------------------------------------------

**Details**

Nothing was rendered and the stack trace displayed in the browser console was:

Uncaught Invariant Violation: Invalid hook call. Hooks can only be called inside
of the body of a function component. This could happen for one of the following
reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app

```
See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.
    at http://localhost:8501/static/vendor.7f3166c5.chunk.js:33239:26
    at resolveDispatcher (http://localhost:8501/static/vendor.7f3166c5.chunk.js:33242:5)
    at useMemo (http://localhost:8501/static/vendor.7f3166c5.chunk.js:33297:20)
    at ConnectFunction (http://localhost:8501/static/vendor.7f3166c5.chunk.js:30349:75)
    at renderWithHooks (http://localhost:8501/static/vendor.7f3166c5.chunk.js:68791:18)
    at updateFunctionComponent (http://localhost:8501/static/vendor.7f3166c5.chunk.js:70608:20)
    at updateSimpleMemoComponent (http://localhost:8501/static/vendor.7f3166c5.chunk.js:70551:10)
    at updateMemoComponent (http://localhost:8501/static/vendor.7f3166c5.chunk.js:70468:14)
    at beginWork$1 (http://localhost:8501/static/vendor.7f3166c5.chunk.js:72233:16)
    at HTMLUnknownElement.callCallback (http://localhost:8501/static/vendor.7f3166c5.chunk.js:54030:14)
```

**Resolution**

cd `atoll-shared`
run `npm link ../atoll-core/node_modules/react`

**Useful Resource**

https://reactjs.org/warnings/invalid-hook-call-warning.html


`npm ERR! Workspaces not supported for global packages`
-------------------------------------------------------

When using `npm run -w pakcages/web-app build` (or other npm scripts) you may
see this output when running on Windows (this doesn't appear to happen on Mac
OSX even for the same versions of Node and NPM).  You can probably ignore it.

**Details**

This error does not mean that anything has actually gone wrong- if your build is
failing it is probably due to a different message and you can ignore this
message.  However, if there are no other messages you may need to try updating
`node` or `npm` (make sure to use the versions specified in the latest docs).

```
Node Version
v16.14.2
npm ERR! Workspaces not supported for global packages

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\{your-user-here}\AppData\Local\npm-cache\_logs\2022-10-13T12_34_11_549Z-debug-0.log
```

**Resolution**

Use a Mac (or maybe Linux?) if you want the error to go away... but ignore it
otherwise!


`ModuleNotFoundError: Module not found: Error: Can't resolve '@atoll/shared'`
-----------------------------------------------------------------------------

In a monorepo this can actually be caused by a dependency module
(`@atoll/shared` in this case) not being built first.

**Details**

The error will look something like this (on Windows):

```
ModuleNotFoundError: Module not found: Error: Can't resolve '@atoll/shared' in 'D:\Git\atoll-mono\packages\web-app\src\client',ModuleNotFoundError: Module not found: Error: Can't resolve '@atoll/shared' in 'D:\Git\atoll-mono\packages\web-app\src\common'
[2022-10-13T12:29:40.876Z] Failed to compile client
```

If you look at the package.json you'll see that this dependency will output its
build artifacts in a specific folder.  The dependent module is actually looking
for those artifacts, although the error message isn't clear about this.

**Resolution**

Build the dependency first- in this particular case the issue was resolved by
using `npm run -w packages/shared build` and then rebuilding `packages/web-app`.
