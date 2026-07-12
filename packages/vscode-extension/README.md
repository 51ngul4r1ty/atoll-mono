Atoll VS Code Extension
=======================

Atoll is an agile project management app specifically geared to teams using Scrum.  It is an opinionated implementation
that makes it easy for teams to follow best practices.  Unlike many other tools like Rally, Jira, etc. it doesn't offer
a highly customizable system.  Instead, it aims to do high quality Scrum as well as possible and to guide your team in
the right direction by making it harder to do Scrum "wrong."  This extension makes it very convenient for you, as a
developer working primarily with source code, to use Atoll without leaving VS Code.  Scrum ceremonies, like "standup",
"refinement meetings", etc. will still need to be done using the app though.

Features
--------

* Connect/disconnect from Atoll server.
* Select stories & tasks to work on from the current sprint.
* Start/stop/switch tasks easily.

Requirements
------------

You will need to set up an Atoll server- or use one that's hosted and available publicly or through VPN.

Extension Settings
------------------

(to be added)

Known Issues
------------

(none at this time)

Release Notes
-------------

(still under development)

Contributing
------------

### Getting Started

* `npm install -g @vscode/vsce`

### Managing Monorepo Dependency Versions

* If you are not seeing changes you've made related to `@atoll/client-sdk`
  appearing in the VS Code extension then the problem may be the version of the
  dependency in the package.json file for the extension.  Working in this
  monorepo requires you to update the version to match exactly.

### Troubleshooting Build Issues

#### "npm error code ELSPROBLEMS"

This error is related to the "Managing Monorepo Dependency Versions" topic
above.  To get more information use `npm list --production` in the
vscode-extension folder.  Usually the issue is just a mismatching version
number.
