import { PushBacklogItemModel } from "../../../middleware/wsMiddleware";
import { Source } from "../../enums";
import { SaveableBacklogItem } from "../backlogItemsReducerTypes";

export const convertSaved = (saved: boolean | undefined): boolean => {
    if (saved === true) {
        return true;
    } else if (saved === false) {
        return false;
    } else {
        // default to saved if it isn't provided
        return true;
    }
};

export const addSource = (item: SaveableBacklogItem, source: Source) => ({
    ...item,
    source,
    saved: convertSaved(item.saved)
});

export const addSourceToPushedItem = (item: Partial<PushBacklogItemModel>, source: Source) => ({
    ...item,
    source,
    saved: convertSaved(undefined)
});
