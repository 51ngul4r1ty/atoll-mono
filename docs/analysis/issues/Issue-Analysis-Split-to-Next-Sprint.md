Overview
========

This analysis is related to [Github Issue `#511`](https://github.com/51ngul4r1ty/atoll-core/issues/511).

How Split to Next Sprint Works
------------------------------

The "Split to Next Sprint" menu item that's shown when the user right-clicks on
the sprint backlog item triggers a sequence of redux actions that have "steps"
named as follows:
1. ITEM_DETAIL_CLICK_STEP_1_NAME (1-GetSprintDetails)
2. ITEM_DETAIL_CLICK_STEP_2_NAME (2-GetNextSprintDetails)
3. ITEM_DETAIL_CLICK_STEP_3_NAME (3-GetNextSprintBacklogItems)

What these do:
1. Gets the details for the sprint associated with the backlog item
   - this triggers processSprintDataForItemDetailClickStep1
2. Gets the details for the next sprint (this is not working correctly because
   it gets a sprint from a different project some of the time- depending on data
   insertion sequence)
   - this triggers processSprintDataForItemDetailClickStep2
3. etc.

The problem is that the first step uses fetchNextSprint and this doesn't take
project ID into account at all- it simply looks at the sprint start date!!

