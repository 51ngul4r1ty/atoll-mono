Overview
========

This "Data Catalog" is intended as a place to describe the entities and what they contain.
While the "Data Model" docs provide context for why the entities exist that relates more to
business requirements, this catalog is purely a technical description of what the entities
are and what the fields contain.

This isn't intended as an all-encompassing definition of the entities.  It merely covers
details that cannot easily be determined by common sense.

Entities
========

Entity Overview
---------------

1. `appuser`  
  The users that have access to the app- passwords are hashed to prevent them
  from being revealed to others.
2. `backlogitem`  
  The basic backlog item details- whether it is a story or an issue all will be
  in this table.  A backlog item can be grouped in other backlogs, but that
  grouping information is not stored here.  Currently `sprintbacklogitem` and
  `productbacklogitem` provide this grouping data, but others may be added.
3. `backlogitempart`  
  Each `backlogitem` has at least one part but can be split into more as needed
  by the users.
4. `backlogitemtag`  
  Future use: `backlogitem` instances can be tagged with a user-defined tag
  (50 characters long currently).
5. `counter`  
  Internal IDs are GUIDs so they're not very user-friendly.  To allow items to
  be more easily identified by users the `counter` entity exists to track the
  last used counter numbers (specific to a `project` and backlog item type).
  The `counter` entity relies on `projectsettings` to determine the counter
  value format (a separate prefix for issues and stories is configured per
  project, usually `i-` and `s-`).
6. `productbacklogitem`  
  This represents the product backlog and is essentially a linked list to allow
  it to be easily sequenced without requiring much overhead (millions of rows
  could in theory be stored in it would support easy paging through this list).
7. `project`  
  Multiple projects can be stored in this collection and the user can switch
  between projects easily using this list.
8. `projectsettings`  
  As mentioned above this contains the configuration for a project.  Currently
  only the `counter` configuration is stored, but this will be expanded in
  future.
9. `sprint`  
  The list of sprints is stored in this collection- and references the `project`
  entity.
10. `sprintbacklogitem`  
  Each sprint has its own list of backlog items- the sprint does not actually
  reference the backlog item itself, but rather a part of the backlog item.
11. `usersettings`  
  A user's preferences - currently only the selected project and theme.  This
  will be expanded in future.

Fields for `backlogitem`
------------------------

* `externalId` - When a backlog item is also stored in an external system this
  ID will be populated.  If it is not populated the `friendlyId` field will
  instead be shown to the user.  For example, `gh-323`.
* `friendlyId` - Every backlogitem will have a "friendly" ID that is easy to a
  human to reason about and discuss (for example, `i-123` for an issue or
  `s-456` for a story).
* `acceptanceCriteria` - Markdown data that contains the acceptance criteria for
  a story or the repo steps of an issue.  This is an optional field that will be
  populated with `null` if not provided.
* `rolePhrase` - For example, `As a devops engineer` or
  `As a developer using VS Code`.
* `storyPhrase` - For example, `I can deploy to Heroku` or `I can login`.
* `reasonPhrase` - For example,
  for an issue - `without seeing a "self signed certificate" error`
  or for a story - `so that I can correct bad data`
* `estimate` - Best practice story points: 0.25, 0.50, 1.00, 2.00, 3.00, 5.00,
  8.00, 13.00, 20.00, etc. (Atoll is strict about the standard fibonaccish
  number system used by Scrum).
* `type` - 'story' or 'issue'
* `projectId` - foreign key reference to the `project` entity that this backlog
  item belongs to.
* `status` - The overall status of a backlog item.  For an item that has
   multiple parts the status of the final part will determine the overall status
   of the backlog item.
   - `null` (treated the same as "N" - see below)
   - "N" (not started)
   - "P" (in progress)
   - "D" (done)
   - "A" (accepted)
   - "R" (released)
* `totalParts`
   - Used mainly for display purposes, this should correlate with the number
     of `backlogitempart` items that related to this `backlogitem`.

Fields for `backlogitempart`
----------------------------

* `externalId` - Similar to `backlogitem`, but this ID is constructed by the
  system by appending `-{part number}` to the `externalId` from the matching
  `backlogitem`.
* `backlogitemId` - Foreign key reference to the associated `backlogitem`.
* `partIndex` - The part number starting with `1` and increment by `1` for each
  additional part (this number is required to be unique).
* `points` - Each part has an estimate but it cannot be more than the original
  backlog item's estimate.
* `status` - Same as `backlogitem`.