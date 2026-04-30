// externals
import { Draft } from "immer";

// interfaces/types
import type { ApiGetBffViewsPlanSuccessAction } from "../../../actions/apiBffViewsPlan";
import type { AnyFSA } from "../../../types/reactHelperTypes";
import type { BacklogItemsState } from "../backlogItemsReducerTypes";

// utils
import { mapApiItemsToEditableProductBacklogItems } from "../../../mappers/backlogItemMappers";
import { rebuildAllItems } from "./allBacklogItemsRebuilder";

export const handleGetBffViewsPlanSuccess = (action: AnyFSA, draft: Draft<BacklogItemsState>) => {
    const actionTyped = action as ApiGetBffViewsPlanSuccessAction;
    const { payload } = actionTyped;
    draft.items = mapApiItemsToEditableProductBacklogItems(payload.response.data.backlogItems, payload.response.data.milestones);
    draft.pushedItems = [];
    draft.addedItems = [];
    return rebuildAllItems(draft);
};
