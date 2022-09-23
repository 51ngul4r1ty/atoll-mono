Overview
========

This file is merely a starting point for this project.  It should link to various
other documents in the `docs` folder that will provide detailed information.

Requirements
============

1. Node v16.14.2
2. NPM v8.15.0

Getting Started
===============

Adding Dependencies
-------------------

Please make sure to add the dependency at the right level.

You have 2 choices:
1. install it globally so that all packages can use that dependency (bear in mind
  that they will use the exact same version when it is global).  
  For example, `npm i prettier@latest -D`
2. install it at the workspace package level so that individual packages can either
  use a different version or not use it at all.  
  For example, `npm i websocket@1.0.31 -w packages/shared`

In general, if you're not sure, you should pick option 2.
