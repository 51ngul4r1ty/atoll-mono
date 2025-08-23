Overview
========

Everyone contributing to this repo should read this document before doing
anything else: [Important](docs/Important.md)

For specialized instructions with development related tasks (to save you time
trying to do various things): [Dev HowTo](docs/Dev-HowTo.md)

Many code standards and conventions can be picked up from existing patterns in
the code but it is advisable to use this resource as well:
[Code Standards](docs/Code-Standards.md)

If you're looking for specific "Getting Started" instructions for any of the
sub-projects in this monorepo (like the VS Code extension) then look at those
specific README.md files.

Requirements
------------

1. Node v18.20.5 (see `Running the App (using source code)` below)
2. NPM v10.2.3
3. PostgreSQL 16.3 for storing data:
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

1. Ensure the expected version of Node is active- you can use `nvm use` if you
   have that installed or an equivalent method (use .nvmrc to see actual
   supported version).
2. Set up dependencies:
   - at root level: `npm ci`  
     >**NOTE**: If you use VS Code "Terminal" you may start out in a project
       subfolder (like `web-app`), so make sure you're in the root folder!
3. Build the app:
   - at root level: `npm run build-all`
4. Set up PostgreSQL (you can use these steps or do it the way `setup.sql`
   specifies - one inconsistency is "superuser" so it appears that it isn't
   actually needed and either "y" or "n" will do):
   - `sudo -u postgres createuser --interactive`
     - role: `atoll`
     - superuser: `n`
     - allow to create databases: `y`
     - allow to create new roles: `y`
   - `sudo -u postgres psql`
   - `\du` to see the user created
   - `ALTER USER atoll PASSWORD '{pwd}'` (pick a password- you'll use this
     later as well - `setup.sql` specifies `lim3atoll` but it is recommended
     that you change this for security reasons!)
   - `exit` (`\q` should work too)
   - Restart PostgreSQL server
     - Linux: `sudo service postgresql restart`
     - Mac: `sudo -u postgres /Library/PostgreSQL/16/bin/pg_ctl -D /Library/PostgreSQL/16/data restart`
   - `sudo -u postgres createdb atoll`
     - if you see `could not change directory to ...` you can ignore that error
   - `sudo -u postgres psql`
   - `ALTER DATABASE atoll OWNER TO atoll;`
   - `\p` to see that the command was executed (it will repeat the line above)
   - `\q` to quit
5. If you'd like to restore from a backup using pgAdmin 4, you can do that at
   this step.  However, first time set up will require you to follow the
   incomplete steps in `setup.sql` (up to, but not including, the "RUN THE APP"
   step).
6. Set up environment variables:
   - set ATOLL_DATABASE_URL to the database connection string
     (it should look something like this replacing "{pwd}" with
      atoll user password: `postgres://atoll:{pwd}@localhost:5432/atoll`)
   - set ATOLL_DATABASE_USE_SSL to "true".
   - set ATOLL_AUTH_KEY to something unique for security reasons
     (come up with an obscure value that doesn't follow a typical pattern-
      you'll lever have to look this up so it can anything at all).
7. Run the app to create the database structure:
   - at root level: `npm start`
   - watch the output
   - if it was successful you'll see:
     "Database & tables created!"
   - kill the app (if you haven't restored from backup).
8. Only needed if you've not restored from backup:
   1. Setting up atoll user in database (not needed if you've restored from
      backup):
      - at root level: `npm run setup-database`
      - if it was successful you'll see:
        "Executed SQL statement to set up test user account successfully."
   2. Set up sample data (not needed if you've restored from
      backup):
      - use pgAdmin or psql to execute the script `data.sql`
   3. Run the app:
      - at root level: `npm start`
9. Verify that the app is running successfully:
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

Rules About PRs
===============

Small PRs
---------

Always ensure that your PR contains only the changes needed to implement the
task described for the issue or story.  This achieves the following:  
1. Smaller PRs allow reviewers to focus on the actual changes so that they don't
   miss potential issues- this is the most important thing.
2. Looking back on changes historically makes it easier to reason about.

It may actually be necessary to go back and refine a PR after the fact.

Each PR Must Have a Work Item
-----------------------------

This is important because it allows us to measure progress.  The work items
can be analyzed and we can get useful information from them.  For example, if
we find that we're spending a lot of time bug fixing in a particular package
that can highlight that there are issues in that part of the code.
