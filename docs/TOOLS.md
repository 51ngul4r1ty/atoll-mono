**CURRENT TOOLS**
=================

Overview
========

This document is intended as a place to document tools that have been chosen
and why they were chosen.  If it seems as if there's a better tool then this
information can be used to verify that the requirements listed below have been
met.  If the requirements are not met then there need to be other compelling
reasons to displace the existing tool.

NPM Workspaces
==============

Multiple repos and `yalc` were previously used, but this almost always resulted
in concurrent PRs to at least two of the repos... so it made no sense to carry
on this way.

PostgreSQL
==========

`PostgreSQL` is a good general-purpose SQL database.  It is very capable and
can even handle document data so you get the best of both worlds (NoSQL and
SQL).

See "Getting Started" in README.md for more information about the version to
use.

**DEPRECATED TOOLS**
====================

Yalc
====

`yalc` is an npm module that can be installed globally to easily work with
multiple npm modules (in particular atoll core and shared repos).  It is also
included in each atoll related repo as dev dependency.  The `sync` npm script
can be used in `atoll-shared` to build and publish the latest code for use in
`atoll-core`.

**Date Chosen**: November 7, 2019

**Date Deprecated**: October 13, 2022

Why It Was Initially Chosen
---------------------------

* Initially we were using `npm link` but we ran into a number of problems
  using it.  See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for more
  information.

Why It Was Deprecated
---------------------

* No longer needed because monorepo contains all dependencies in one place.


NPM Link Check
==============

`npm-link-check` is an npm module that is installed globally to make it easy
to determine whether a module has any npm linked modules.

**Date Deprecated**: November 7, 2019

Why It Was Initially Chosen
---------------------------

* It works on Windows, Linux and Mac OS X

Why It Was Deprecated
---------------------

* After switching to `yalc` we dropped `npm link` so this utility was no
  longer useful.

Alternatives Reviewed
---------------------

* `link-status` - didn't work on Windows
