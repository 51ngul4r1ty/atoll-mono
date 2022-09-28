Overview
========

This document is a quick starting point for this project that contains must-read
information.  At the end of this document you'll find a document index that will
link you to further information.

Project Goal
============

The goal of this project is to create a good agile project management tool that
adheres as closely to scrum best practices as possible.

Getting Started
===============

Everyone contributing to this repo should read this document before doing
anything else: [IMPORTANT.md](docs/IMPORTANT.md)

For specialized instructions (to save you time trying to do various things):
[DEV_HOWTO.md](docs/DEV_HOWTO.md)

Many code standards and conventions can be picked up from existing patterns in
the code but it is advisable to use this resource as well:
[CODE_STANDARDS.md](docs/CODE_STANDARDS.md)

Requirements
------------

1. Node v16.14.2
2. NPM v8.15.0
3. PostgreSQL 12.2 for storing data:
   `https://www.enterprisedb.com/downloads/postgres-postgresql-downloads`
     (Windows 10 / Mac OS X)
   `https://computingforgeeks.com/install-postgresql-12-on-ubuntu/`
     (Ubuntu with links to other distros)

Recommendations
---------------

VS Code is the editor of choice for this project (v1.71.2 or newer).
   - Make sure to install the recommended workspace extensions.

Running the App
---------------

1. At root level: `npm ci`
2. Setting up the Database: `npm run setup`
3. Starting the app: `npm start`

Working with the Monorepo
=========================

Adding Dependencies
-------------------

Please make sure to add the dependency at the right level.

You have 2 choices:
1. install it globally so that all packages can use that dependency (bear in
  mind that they will use the exact same version when it is global).  
  For example, `npm i prettier@latest -D`
2. install it at the workspace package level so that individual packages can
  either use a different version or not use it at all.  
  For example, `npm i websocket@1.0.31 -w packages/shared`

In general, if you're not sure, you should pick option 2.

Document Index
==============

End Users
---------

[USER_GUIDE.md](docs/USER_GUIDE.md) -
  An entrypoint for end users of Atoll.

Contributor Related
-------------------

[CODE_STANDARDS.md](docs/CODE_STANDARDS.md) -
  Read this!  
[CONVENTIONS.md](docs/CONVENTIONS.md) -
  Important naming conventions information.  
[ARCHITECTURE.md](docs/ARCHITECTURE.md) -
  Architecture related info  
[CODE_ARCHITECTURE.md](docs/CODE_ARCHITECTURE.md) -
  Code-level architecture related info  
[DEV_HOWTO.md](docs/DEV_HOWTO.md) -
  Contains details for how to implement things.  
[DEPENDENCIES.md](docs/DEPENDENCIES.md) -
  Detailed information about the npm packages used.  
[SCRIPTS.md](docs/SCRIPTS.md) -
  Detailed information about the build & npm scripts.  
[HISTORY.md](docs/HISTORY.md) -
  The past history of this project.  
[POLICIES.md](docs/POLICIES.md) -
  Github branch policies etc.  
[GLOSSARY.md](docs/GLOSSARY.md) -
  Glossary specific to this project.  
[ISSUES_RESOLVED.md](docs/ISSUES_RESOLVED.md) -
  This may be useful if you're running into problems.  
[DATA_MODEL.md](docs/dataModel/DATA_MODEL.md) -
  Mapping the requirements to the data model.  
[PROCESS.md](docs/PROCESS.md) -
  The index document for processes that should be followed.

Package Specific Docs
---------------------

[PKG_DESKTOP_APP.md](docs/PKG_DESKTOP_APP.md) -
  Introduction to the Electron desktop spp.  

Wiki
----

For additional information take a look at the wiki:
[Github Wiki](https://github.com/51ngul4r1ty/atoll-mono/wiki)
