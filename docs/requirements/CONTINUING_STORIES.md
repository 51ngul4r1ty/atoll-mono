Overview
========

Continuing stories (through a concept known as "backlog item parts") will
most likely result in changing estimates.  The system doesn't allow an estimate
to be increased in this scenario- the estimate can be the same or lower.  The
reason for this comes down to calculating an accurate velocity.

Essentially, it should be possible to use velocity to forecast delivery
timelines.  The idea is that the team estimates each item in the product
backlog, then it gets sorted in priority order and then a delivery estimate can
be determined based on the team velocity and the story point total.

Story points and velocity are team specific.  If the team estimates a story and
then discovers that it will take longer than estimated, their velocity should go
down as they fail to deliver that story in the forecasted time.  This will be
demonstrated in an example below.

Contuing Stories and Estimates (Example)
----------------------------------------

There are a couple of things that come into play here:
1. Estimates equate to business value added and as such they are a measure of
   forward progress towards delivering overall milestones.
2. Estimates should be a reliable measure of how close the team is to reaching
   that milestone.

As an example, let's say we have a team that has delivered the following
results:
* Sprint 1 - 25 points.
* Sprint 2 - 18 points.
* Sprint 3 - 23 points.  After 3 sprints we compute velocity as 22 points.
* Sprint 4
  - they plan 22 points into the sprint and this includes an 8 pointer
    that we will refer to as "Story A".
  - they do the work and at the end of sprint 4, "Story A" is started but
    incomplete.
  - the developer working on the story reviews with the team and determines
    that 3 story points have been achieved and there are 5 remaining points
    (fibonaccish numbers should be used so the only options are: 0 + 8, 5 + 3,
     or 3 + 5).
  - we are not able to count the story as representing anything towards velocity
    so the team's velocity becomes 18 + 23 + 14 => 18 1/3.
* Sprint 5
  - they plan 18 points into the sprint which includes the 5 remaining points.
  - at the end of this sprint the work is completed and the team receives the
    8 points added to their velocity (essentially 18 + 3 = 21 points).
  - now the team's velocity is 23 + 18 + 21 => 20 2/3.
* Sprint 6
  - they're now able to plan 20 points into this sprint.

Now, imagine they could re-estimate "Story A" as 13 points:
* Sprint 4
  - they plan 22 points into the sprint and this includes an 8 pointer
    that we will refer to as "Story A".
  - they do the work and at the end of sprint 4, "Story A" is started but
    incomplete.
  - the developer working on the story reviews with the team and determines
    that this was a bigger story than anticipated so they decide it should've
    been a 13 pointer.
  - this has a number of negative consequences:
    - estimates are no longer a commitment to deliver within a measurable
      timeframe
    - we've essentially gone backwards, because if we use a similar tecnnique as
      above, we'd allow the team to pick 0 + 13, 5 + 8, or 8 + 5.  They'd pick
      the 5 + 8 to represent it with a similar ratio.
  - we are not able to count the story as representing anything towards velocity
    so the team's velocity becomes 18 + 23 + 14 => 18 1/3.
* Sprint 5
  - they plan 18 points into the sprint which includes the 8 remaining points.
    - this time 10 points come from new stories vs 13 points last time
    - the team gets more of a buffer, but since they didn't complete the 8
      pointer in the allotted 8 points they already have one at the expense of
      overall decreased velocity, is this some kind of double accounting?!
  - at the end of this sprint the work is completed and the team receives the
    13 points added to their velocity (essentially 18 + 5 = 23 points).
  - however, let's assume they're not lazy, so they essentially had a forced
    underplan by 3 pts and they pull in and complete a 3 pointer.
  - so they've completed exactly the same stories, albeit with one that has
    an inflated estimate.
  - now the team's velocity is 23 + 18 + 23 (+3) => 22 1/3.
    - somehow they failed to deliver a story when they said they would be now
      they're back at the same velocity?!
* Sprint 6
  - they're now able to plan 22 points into this sprint.

Let's compare and contrast these 2 scenarios:

|                 | Disallowing Increased Estimate | Allowing Increased Estimate  |
|-----------------|--------------------------------|------------------------------|
| Final Velocity  | 20                             | 22                           |
| Starting Points | 101                            | 101                          |
| Achieved Points | 101                            | 106                          |
| Inflation       | 0                              | +5                           |
| S5 impact       | 21 -> 18 (reduced velocity)    | 21 -> 18 (reduced velocity)  |
| S5 new work     | 13 (carry over was 5)          | 10 (carry over was 8)        |
| Effect          | only 1 story affected in S5    | 2 stories affected in S5     |

If we allow the increased estimate developers may actually be more cautious and
that may result in decreased productivity.  Pulling a 3 pointer in at the end of
the sprint may seem risky (because they may not finish it up).  That effectively
decreases capacity by 3 points as a consequence.

It should be obvious from the table and this note above that it will have a
number of negative effects by allowing the increase of an estimate.
