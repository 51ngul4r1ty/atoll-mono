Overview
========

This document is not intended as an all-encompassing story-splitting guidance
document.  Instead, it will focus on the mistakes teams make that cause problems
for overall estimation and work.

What is a User Story?
=====================

Aside from the typical definition of a user story it is best to think of it as
a useful bucket for grouping tasks to accomplish something that has business
value in isolation.  This is part of the INVEST principles- read up on it!  Do
not make it a technical thing- it is called a user story for a reason and it is
not a bucket for tech debt in isolation because that's not directly valuable to
a user (more later).

Golden Rules
============

* Keep stories whole if they have common work (load & save is a typical
  example- see `Example` section below).
* Big stories are OK!
* Failure is OK!

Common Work
===========

Often teams will split functionality up into multiple stories in order to
accomplish the work.  In the process they may take the split too far and end up
with two stories that have common work that necessitates doing one story before
the other so that the common work is done once and isn't duplicated.  We should
try to avoid that as much as possible.  So, in almost all cases you should keep
this work in one story.

The Pattern
-----------

1. Story 1:
   - Task #1: Common work (story 1 & 2)
   - Task #2: Unique work for story 1
2. Story 2:
   - Task #1: Common work (story 1 & 2)
   - Task #2: Unique work for story 2

Most teams identify this common work and break it out into a story:
1. Common Story
2. Story 1 (without common work)
3. Story 2 (without common work)

**What's the problem?** Story 1 and 2 are now dependent on the completion of
   "Common Story" so you have to flag them us "unable to work on this until
   Common Story is done" in some way.  That's problematic for parallel work and
   for managing a nice sequential backlog.

**How Should it Be Done?** Instead, tasks should be broken out from this main
  story.  The first task will be for the common work and the remaining tasks
  will implement what was previously broken out into story 1 and story 2.  So,
  instead of 3 stories you'll have a single cohesive story that has business
  value with 3 or more tasks to deliver it.

Example
-------

Let's say you're building a word processor (like Microsoft Word).  One essential
aspect of a word processor is loading and saving the document.  It is almost
guaranteed that teams will thinking of 2 stories for this:
* As a user, I can save a document, so that I don't lose my work.
* As a user, I can load a document, so that I can carry on with my work.

These 2 stories may seem like a good split but there are 2 problems with them:
1. They are not independent of each other.  You need a document to be saved
   first before you can load a document.  That inherently means you have to work
   on saving first and then do loading aftert that.  In Agile practices we would
   like to avoid dependencies.
2. There's actually common work in both- we need a common model for the document
   for its stored state.  The actual loading and saving will probably be trivial
   once we have that common model.  The common work means we can't really split
   this work up.

Big Stories Are OK
==================

Too often companies are fixated on story size.  They see a big story (let's say
the company/team sees 13 story points as a risk and always reduces stories down
to no more than 8 points).

Why is it bad to force a maximum story size?  See `Common Work` above for one
reason.  Stories start to lose their business value- they may even lose them
completely.

More About Business Value
-------------------------

You should strive to create stories that an end user will actually see is
forward progress.  Why?  A business cares most about getting value to customers
because customers pay the bills.  What a business wants to know is: how long
will it take me to get this business value to the customer and that's what
velocity should be able to tell you.

What about Tech Debt?  Tech Debt should be tackled with each story.  If you're
putting off Tech Debt as something that can be tackled later you're going to end
up disappointing customers in future (which in turn disappoints business
stakeholders).

Let's say you work on a story that you know requires you to refactor some code
to make it work better, but you rush it out to customers by not doing that tech
debt.  You're simply delaying the need to do that tech debt because it will
become harder and harder to accomplish.

Obviously we live in a real world and the scenario above will happen
occasionally (it should only happen occasionally for a short period of time- the
guidance here is a single sprint in isolation).  If it happens it is important
to tackle that tech debt at the next possible opportunity.  The best approach is
to make tackling tech debt a part of your definition of done.  To ensure tech
debt is not forgotten you should document it when tech debt is identified and
attempt to put some kind of story point value on it.
