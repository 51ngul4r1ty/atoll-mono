Overview
========

This file is intended to document naming conventions that are not code related.
To find out about code standards use this document: [CODE_STANDARDS.md](
CODE_STANDARDS.md)

NPM Related
===========

NPM Scripts
-----------

Standard npm targets like `start` and `test` should perform the default actions
expected.  For now `npm start` starts up the web-app, while `test` runs the
tests for all of the packages.  This may seem inconsitent but it doesn't make
sense to start up the electron client app as well as the web app. 

Suffixes:
  * `{target}-pkg:{package-name}` when target executed for specific package.
  * `{target}-all` when target executed for all packages.

Special Targets:
  * `report` should be used for reports that are generated- if this target is
    used the operation should be stand-alone (i.e. it should generate the data
    and open the report for the developer to see).
  * `open` should be used for scripts that just open an existing document in the
    appropriate app.
