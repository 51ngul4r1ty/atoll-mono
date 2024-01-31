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

Everyone contributing to this repo should read this document before doing
anything else: [Important](docs/Important.md)

For specialized instructions (to save you time trying to do various things):
[Dev HowTo](docs/Dev-HowTo.md)

Many code standards and conventions can be picked up from existing patterns in
the code but it is advisable to use this resource as well:
[Code Standards](docs/Code-Standards.md)

If you're looking for specific "Getting Started" instructions for any of the
sub-projects in this monorepo (like the VS Code extension) then look at those
specific README.md files.

Requirements
------------

1. Node v16.14.2
2. NPM v8.15.0
3. PostgreSQL 12.2 for storing data:
   `https://www.enterprisedb.com/downloads/postgres-postgresql-downloads`
     (Windows 10 / Mac OS X)
   `https://computingforgeeks.com/install-postgresql-12-on-ubuntu/`
     (Ubuntu with links to other distros)
4. VSCE v2.15.0 (for building VSIX file for VS Code extension)

Recommendations
---------------

VS Code is the editor of choice for this project (v1.71.2 or newer).
   - Make sure to install the recommended workspace extensions.

Running the App (using source code)
-----------------------------------

1. Set up dependencies:
   - at root level: `npm ci`
2. Build the app:
   - at root level: `npm run build-all`
3. Set up PostgreSQL (you can use these steps or do it the way `setup.sql`
   specifies - one inconsistency is "superuser" so it appears that it isn't
   actually needed and either "y" or "n" will do):
   - `sudo -u postgres psql`
   - `createuser --interactive`
     - superuser: "n"
     - allow to create databases: "y"
     - allow to create new roles: "y"
   - `\du` to see the user created
   - `ALTER USER atoll PASSWORD '{pwd}'` (pick a password- you'll use this
     later as well - `setup.sql` specifies `lim3atoll` but it is recommended
     that you change this for security reasons!)
   - `exit` (`\q` should work too)
   - `sudo service postgresql restart`
   - `sudo -u postgres createdb atoll`
     - if you see `could not change directory to ...` you can ignore that error
   - `sudo -u postgres psql`
   - `ALTER DATABASE atoll OWNER TO atoll;`
   - `\p` to see that the command was executed (it will repeat the line above)
   - `\q` to quit
4. Follow the incomplete steps in `setup.sql` (up to, but not including, the
   "RUN THE APP" step)
5. Set up environment variables:
   - set ATOLL_DATABASE_URL to the database connection string
     (it should look something like this replacing "{pwd}" with
      atoll user password: `postgres://atoll:{pwd}@localhost:5432/atoll`)
   - set ATOLL_DATABASE_USE_SSL to "true".
   - set ATOLL_AUTH_KEY to something unique for security reasons
     (come up with an obscure value that doesn't follow a typical pattern-
      you'll lever have to look this up so it can anything at all).
6. Run the app to create the database structure:
   - `npm start`
   - watch the output
   - if it was successful you'll see:
     "Database & tables created!"
   - kill the app.
7. Setting up atoll user in database:
   - at root level: `npm run setup-database`
   - if it was successful you'll see:
     "Executed SQL statement to set up test user account successfully."
8. Set up sample data:
   - use pgAdmin or psql to execute the script `data.sql`
9. Run the app to verify that everything is set up correctly:
   - at root level: `npm start`
   - console output will have something like
     `App is running: http://localhost:8500` at the start
     so you know what URL to use in the browser.
   - the sample script created a user with login `test` and password `atoll`, so
     you should be able to use those credentials to login

Running the App (using source code + Docker)
--------------------------------------------

1. At root level: `npm ci`
2. Build app and create docker image: `npm run docker-pkg:web-app`
3. Start docker containers using compose: `npm run start-docker:web-app`

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
