Milestones
==========

Overview
--------

Milestones are just a way of making some key stories required for achieving a
particular milestone.  It doesn't have to include all of the stories that will
be delivered as part of that milestone, all it needs is at least one of the
stories.

Data Model
----------

### Master Table

The table that contains details about the milestone itself.

* ID - Unique identifier
* Name - This can be as simple as `Milestone 1` but is chosen by the user.
* TargetDate - As much as we would not like to tie releases to dates the reality
  is that businesses work this way and milestones are the way, in Atoll, that
  they can control this.  This is an aspirational goal rather than drop-dead
  date and the way it can be more easily reached is to simply drop required
  stories from a particular milestone.

### Detail Table

The table that represents the set of user stories associated with a milestone.

* ID
* Milestone_ID
* BacklogItem_ID
