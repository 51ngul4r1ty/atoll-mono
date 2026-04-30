// externals
import { Draft } from "immer";

// consts/enums
import { ReorderBacklogItemAction } from "../../../actions/backlogItemActions";

// interfaces/types
import type { AnyFSA } from "../../../types/reactHelperTypes";
import type { BacklogItemsState, BacklogItemWithSource } from "../backlogItemsReducerTypes";

export const handleReorderBacklogItem = (action: AnyFSA, draft: Draft<BacklogItemsState>) => {
    const actionTyped = action as ReorderBacklogItemAction;
    let idx = 0;
    let sourceItemIdx: number = null;
    let targetItemIdx: number = null;
    let sourceItem: BacklogItemWithSource = null;
    draft.allItems.forEach((item) => {
        if (item.id === actionTyped.payload.sourceItemId) {
            sourceItem = item;
            sourceItemIdx = idx;
        }
        if (item.id === actionTyped.payload.targetItemId) {
            targetItemIdx = idx;
        }
        idx++;
    });
    if (sourceItemIdx !== null && targetItemIdx !== null && sourceItemIdx !== targetItemIdx) {
        if (sourceItemIdx < targetItemIdx) {
            // move down, move below target item
            draft.allItems.splice(targetItemIdx, 0, sourceItem);
            draft.allItems.splice(sourceItemIdx, 1);
        } else {
            // move up, move above target item
            draft.allItems.splice(sourceItemIdx, 1);
            draft.allItems.splice(targetItemIdx, 0, sourceItem);
        }
    } else if (sourceItemIdx !== null && targetItemIdx === null) {
        // re-order moved item to end of list
        draft.allItems.push(sourceItem);
        draft.allItems.splice(sourceItemIdx, 1);
    }
};
