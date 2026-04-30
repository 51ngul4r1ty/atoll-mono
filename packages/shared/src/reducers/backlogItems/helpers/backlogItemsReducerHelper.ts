// externals
import { Draft } from "immer";

// interfaces/types
import type {
    BacklogItemPartAndSprintWithUiState,
    BacklogItemsState,
    EditableBacklogItem,
    SaveableBacklogItem
} from "../backlogItemsReducerTypes";
import type { BacklogItem } from "../../../types/backlogItemTypes";
import type {
    BacklogItemEditableFields,
    BacklogItemInstanceEditableFields
} from "../../../components/organisms/forms/backlogItemFormTypes";
import type { BacklogItemPart } from "../../../types/backlogItemPartTypes";

// utils
import { mapApiItemToBacklogItem } from "../../../mappers/backlogItemMappers";
import { ApiBacklogItem } from "../../../types/apiModelTypes";
import { rebuildAllItems } from "./allBacklogItemsRebuilder";

export const idsMatch = (item1: BacklogItem, item2: BacklogItemEditableFields): boolean => {
    const item2withInstanceId = item2 as BacklogItemInstanceEditableFields;
    const instanceIdMatch = !!item1.instanceId && item1.instanceId === item2withInstanceId.instanceId;
    const idMatch = !!item1.id && item1.id === item2withInstanceId.id;
    return instanceIdMatch || idMatch;
};

export const updateItemFieldsInAllItems = (draft: Draft<BacklogItemsState>, backlogItem: BacklogItemEditableFields) => {
    const item = draft.allItems.filter((item) => idsMatch(item, backlogItem));
    if (item.length === 1) {
        updateBacklogItemFields(item[0], backlogItem);
    }
};

export const updateBacklogItemFields = (backlogItem: BacklogItem, payload: BacklogItemEditableFields) => {
    backlogItem.acceptanceCriteria = payload.acceptanceCriteria;
    backlogItem.notes = payload.notes;
    backlogItem.estimate = payload.estimate;
    backlogItem.externalId = payload.externalId;
    backlogItem.friendlyId = payload.friendlyId;
    backlogItem.reasonPhrase = payload.reasonPhrase;
    backlogItem.rolePhrase = payload.rolePhrase;
    backlogItem.storyPhrase = payload.storyPhrase;
    backlogItem.startedAt = payload.startedAt;
    backlogItem.finishedAt = payload.finishedAt;
    backlogItem.acceptedAt = payload.acceptedAt;
    backlogItem.releasedAt = payload.releasedAt;
};

export const updateItemByInstanceId = (
    draft: Draft<BacklogItemsState>,
    instanceId: number,
    updateItem: { (addedItem: SaveableBacklogItem) }
): boolean => {
    let changed = false;
    const idx = draft.addedItems.findIndex((item) => item.instanceId === instanceId);
    if (idx >= 0) {
        const item = draft.addedItems[idx];
        const itemBefore = JSON.stringify(item);
        updateItem(item);
        const itemAfter = JSON.stringify(item);
        if (itemAfter !== itemBefore) {
            changed = true;
        }
    }
    return changed;
};

export const updateItemById = (
    draft: Draft<BacklogItemsState>,
    itemId: string,
    updateItem: { (item: EditableBacklogItem) }
): boolean => {
    let changed = false;
    const idx = draft.addedItems.findIndex((item) => item.id === itemId);
    if (idx >= 0) {
        const item = draft.addedItems[idx];
        const itemBefore = JSON.stringify(item);
        updateItem(item);
        const itemAfter = JSON.stringify(item);
        if (itemAfter !== itemBefore) {
            changed = true;
        }
    }
    const idx2 = draft.items.findIndex((item) => item.id === itemId);
    if (idx2 >= 0) {
        const item = draft.items[idx2];
        const itemBefore = JSON.stringify(item);
        updateItem(item);
        const itemAfter = JSON.stringify(item);
        if (itemAfter !== itemBefore) {
            changed = true;
        }
    }
    return changed;
};

export const getBacklogItemPartById = (backlogItems: BacklogItemsState, itemId: string): BacklogItemPart | null => {
    const partAndSprint = backlogItems.currentItemPartsAndSprints.find((item) => item.part.id === itemId);
    if (!partAndSprint) {
        return null;
    }
    return partAndSprint.part;
};

export const updateCurrentItemPartById = (
    draft: Draft<BacklogItemsState>,
    itemId: string,
    updateItem: { (item: BacklogItemPartAndSprintWithUiState) }
): void => {
    const idx = draft.currentItemPartsAndSprints.findIndex((item) => item.part.id === itemId);
    if (idx >= 0) {
        updateItem(draft.currentItemPartsAndSprints[idx] as BacklogItemPartAndSprintWithUiState);
    }
};

export const updateBacklogItemFieldsInItemsAndAddedItems = (
    draft: Draft<BacklogItemsState>,
    payload: BacklogItemInstanceEditableFields
): void => {
    draft.addedItems.forEach((addedItem) => {
        if (idsMatch(addedItem, payload)) {
            updateBacklogItemFields(addedItem, payload);
        }
    });
    draft.items.forEach((addedItem) => {
        if (idsMatch(addedItem, payload)) {
            updateBacklogItemFields(addedItem, payload);
        }
    });
    updateItemFieldsInAllItems(draft, payload);
};

export const turnOffEditModeForBacklogItemPart = (draft: Draft<BacklogItemsState>, id: string): void => {
    updateCurrentItemPartById(draft, id, (item) => {
        item.state.editable = false;
    });
    draft.openedDetailMenuBacklogItemPartId = null;
};

export const handleFetchedBacklogItem = (draft: Draft<BacklogItemsState>, payloadBacklogItem: ApiBacklogItem): void => {
    const backlogItem = mapApiItemToBacklogItem(payloadBacklogItem);
    const newItems = [];
    draft.items.forEach((item) => {
        if (item.id === backlogItem.id) {
            item = { ...item, ...backlogItem };
        }
        newItems.push(item);
    });
    draft.items = newItems;
    rebuildAllItems(draft);
};
