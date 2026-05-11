// interfaces/types
import type { BacklogItem, BacklogItemInSprint } from "../../types/backlogItemTypes";
import type { BacklogItemPart } from "../../types/backlogItemPartTypes";
import type { Sprint } from "../sprints/sprintsReducerTypes";
import type { WebsocketPushNotificationData } from "../../types/pushTypes";

// consts/enums
import { PushState, Source } from "../../reducers/enums";

export type SelectedBacklogItems = string[];

export type BacklogItemPartAndSprint = {
    part: BacklogItemPart;
    sprint: Sprint;
};

export type BacklogItemPartUiState = {
    editable: boolean;
};

export type BacklogItemPartAndSprintWithUiState = BacklogItemPartAndSprint & {
    state: BacklogItemPartUiState;
};

export type BacklogItemsState = Readonly<{
    addedItems: SaveableProductBacklogItem[];
    pushedItems: WebsocketPushNotificationData<any>[];
    items: EditableProductBacklogItem[]; // TODO: this type doesn't include milestoneText and milestoneId but it does have the values, need to change type
    allItems: ProductBacklogItemWithSource[];
    selectedItemIds: SelectedBacklogItems;
    currentItem: SaveableBacklogItem;
    currentItemPartsAndSprints: BacklogItemPartAndSprintWithUiState[];
    savedCurrentItem: SaveableBacklogItem;
    openedDetailMenuBacklogItemId: string | null;
    openedDetailMenuBacklogItemPartId: string | null;
    joinUnallocatedPartsInProgress: boolean;
}>;

export interface EditableBacklogItem extends BacklogItem {
    editing?: boolean;
    saving: boolean;
}

export interface EditableProductBacklogItem extends EditableBacklogItem {
    milestoneId?: string;
    milestoneText?: string;
}

export interface SaveableBacklogItem extends EditableBacklogItem {
    saved?: boolean;
}

export interface SaveableProductBacklogItem extends SaveableBacklogItem {
    milestoneId?: string | null;
    milestoneText?: string | null;
}

export interface SaveableBacklogItemInSprint extends BacklogItemInSprint, SaveableBacklogItem {}

export interface ItemWithSource {
    source: Source;
    pushState?: PushState;
}

export interface BacklogItemWithSource extends SaveableBacklogItem, ItemWithSource {}

export interface ProductBacklogItemWithSource extends SaveableProductBacklogItem, ItemWithSource {}

export interface BacklogItemInSprintWithSource extends SaveableBacklogItemInSprint, ItemWithSource {}
