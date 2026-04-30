import { Draft } from "immer";
import { LinkedList } from "../../../utils/linkedList";
import { addSource, addSourceToPushedItem } from "./addedItemEnrichers";
import { BacklogItemModel } from "../../../types/backlogItemTypes";

// interfaces/types
import type { PushBacklogItemModel } from "../../../middleware/wsMiddleware";
import type { BacklogItemsState, BacklogItemWithSource } from "../backlogItemsReducerTypes";

// consts/enums
import { PushOperationType } from "../../../types/pushEnums";
import { Source, PushState } from "../../enums";

export const mapPushedToBacklogItem = (pushedItem: Partial<PushBacklogItemModel>): BacklogItemWithSource => ({
    acceptanceCriteria: pushedItem.acceptanceCriteria,
    notes: pushedItem.notes,
    acceptedAt: pushedItem.acceptedAt,
    createdAt: pushedItem.createdAt,
    estimate: pushedItem.estimate,
    externalId: pushedItem.externalId,
    finishedAt: pushedItem.finishedAt,
    friendlyId: pushedItem.friendlyId,
    id: pushedItem.id,
    instanceId: undefined,
    partIndex: pushedItem.partIndex,
    projectId: pushedItem.projectId,
    reasonPhrase: pushedItem.reasonPhrase,
    releasedAt: pushedItem.releasedAt,
    rolePhrase: pushedItem.rolePhrase,
    source: Source.Pushed,
    startedAt: pushedItem.startedAt,
    status: pushedItem.status,
    storyEstimate: pushedItem.storyEstimate,
    storyPhrase: pushedItem.storyPhrase,
    totalParts: pushedItem.totalParts,
    type: pushedItem.type,
    unallocatedParts: pushedItem.unallocatedParts,
    unallocatedPoints: pushedItem.unallocatedPoints,
    updatedAt: pushedItem.updatedAt,
    saving: false
});

export const addPushedAddedItemsToAllItems = (draft: Draft<BacklogItemsState>, allItems: LinkedList<BacklogItemWithSource>) => {
    const pushedAddedItems = draft.pushedItems.filter((item) => item.operation === PushOperationType.Added);
    const pushedItems = pushedAddedItems.map((item) => addSourceToPushedItem(item.item, Source.Pushed));
    pushedItems.forEach((pushedItem) => {
        const itemData = mapPushedToBacklogItem(pushedItem);
        // TODO: Consider turning on the strict options below for debug mode - so that we catch issues during dev
        //       but prevent the app from blowing up for this non-critical function in prod
        if (pushedItem.prevBacklogItemId) {
            allItems.addItemAfter(pushedItem.id, pushedItem.prevBacklogItemId, itemData, {
                throwErrorForDups: false,
                requireItemIdExistance: false
            });
        } else {
            allItems.addItemBefore(pushedItem.id, pushedItem.nextBacklogItemId, itemData, {
                throwErrorForDups: false,
                requireItemIdExistance: false
            });
        }
    });
};

export const addPushedRemovedItemsToAllItemsArray = (draft: Draft<BacklogItemsState>, allItems: BacklogItemWithSource[]) => {
    const pushedRemovedItems = draft.pushedItems.filter((item) => item.operation === PushOperationType.Removed);
    const pushedRemovedItemsById = {} as { [key: string]: BacklogItemModel };
    pushedRemovedItems.forEach((data) => {
        const item = data.item as BacklogItemModel;
        pushedRemovedItemsById[item.id] = item;
    });

    allItems.forEach((item) => {
        if (pushedRemovedItemsById[item.id]) {
            item.pushState = PushState.Removed;
        }
    });
};

export const addPushedUpdatedItemsToAllItemsArray = (draft: Draft<BacklogItemsState>, allItems: BacklogItemWithSource[]) => {
    const pushedUpdatedItems = draft.pushedItems.filter((item) => item.operation === PushOperationType.Updated);
    const pushedUpdatedItemsById = {} as { [key: string]: BacklogItemModel };
    pushedUpdatedItems.forEach((data) => {
        const item = data.item as BacklogItemModel;
        pushedUpdatedItemsById[item.id] = item;
    });

    allItems.forEach((item) => {
        if (pushedUpdatedItemsById[item.id]) {
            item.pushState = PushState.Changed;
        }
    });
};

export const rebuildAllItems = (draft: Draft<BacklogItemsState>): void => {
    const allItems = new LinkedList<BacklogItemWithSource>();

    const addedItems = draft.addedItems.map((item) => addSource(item, Source.Added));
    allItems.addArray2("id", "instanceId", addedItems);

    const loadedItems = draft.items.map((item) => addSource(item, Source.Loaded));
    allItems.addArray("id", loadedItems);

    addPushedAddedItemsToAllItems(draft, allItems);

    const allItemsArray = allItems.toArray();

    addPushedUpdatedItemsToAllItemsArray(draft, allItemsArray);
    addPushedRemovedItemsToAllItemsArray(draft, allItemsArray);

    draft.allItems = allItemsArray;
};
