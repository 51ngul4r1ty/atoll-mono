Overview
========

This document is a quick starting point for this project that contains must-read
information.  At the end of this document you'll find a document index that will
link you to further information.

Project Goal
============

The goal of this project is to create a good agile project management tool that
adheres as closely to scrum best practices as possible.

Getting Started (for Contributors)
==================================

See [Contributing Guide](./CONTRIBUTING.md) for detais.

Working with the Monorepo
=========================

Adding Dependencies
-------------------

This monorepo uses npm workspaces.  If you're unfamiliar with using workspaces
we recommend you read the npm documentation first.  Some tips are provided
below, but it is best that you understand how they work fully.

Please make sure to add the dependency at the right level.

You have 2 choices:
1. install it globally so that all packages can use that dependency (bear in
  mind that they will use the exact same version when it is global).  
  For example, `npm i prettier@latest -D`
2. install it at the workspace package level so that individual packages can
  either use a different version or not use it at all.  
  For example, `npm i websocket@1.0.31 -w packages/shared`

In general, if you're not sure, you should pick option 2.

If you wish to refresh packages for a specific workspace you can use something
like: `npm i -w=packages/vscode-extension`

Document Index
==============

End Users
---------

[User Guide](docs/User-Guide.md) -
  An entrypoint for end users of Atoll.

Contributor Related
-------------------

[Code Standards](docs/Code-Standards.md) -
  Read this!  
[Conventions](docs/Conventions.md) -
  Important naming conventions information.  
[Architecture](docs/Architecture.md) -
  Architecture related info  
[Code Architecture](docs/Code-Architecture.md) -
  Code-level architecture related info  
[Dev HowTo](docs/Dev-HowTo.md) -
  Contains details for how to implement things.  
[Dependencies](docs/Dependencies.md) -
  Detailed information about the npm packages used.  
[Scripts](docs/Scripts.md) -
  Detailed information about the build & npm scripts.  
[History](docs/History.md) -
  The past history of this project.  
[Policies](docs/Policies.md) -
  Github branch policies etc.  
[Glossary](docs/Glossary.md) -
  Glossary specific to this project.  
[Troubleshooting](docs/Troubleshooting.md) -
  This may be useful if you're running into problems.  
[Data Model](docs/dataModel/Data-Model.md) -
  Mapping the requirements to the data model.  
[Process](docs/Process.md) -
  The index document for processes that should be followed.

[Github Wiki](https://github.com/51ngul4r1ty/atoll-mono/wiki)
