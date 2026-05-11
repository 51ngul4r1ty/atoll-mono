/**
 * Purpose: keep everything related to the product backlog item's update in one place.
 * Notes:
 *   This flow includes the following sequence of actions:
 *   1. User clicks "Done" on BacklogItemDetailForm.
 *   2. BACKLOG_ITEM_DONE_CLICK action dispatched.
 *   3. handleProductBacklogItemEditDoneClick called and dispatches
 *      3.1. updateBacklogItem for existing item (dispatches UPDATE_BACKLOG_ITEM).
 *        4.1.1. handleUpdateBacklogItem updates backlog item via apiPutBacklogItem.
 *        5.1.1. dispatches PUT_BACKLOG_ITEM
 *        6.1.1. handleBacklogItemDetailFormApiPutSuccess dispatches PUT_BACKLOG_ITEM_MILESTONES
 *               to update milestone for backlogitem
 *    -- OR --
 *      3.2. saveNewBacklogItem for new item.
 */

// consts/enums
import * as ActionTypes from "../actions/actionTypes";
import { LINK_REL_RELATED_MILESTONES } from "../constants/links";
import { saveNewBacklogItem, updateBacklogItem, UpdateBacklogItemAction } from "../actions/backlogItemActions";
import { ResourceTypes } from "../reducers/apiLinksReducer";

// interfaces/types
import type { StoreTyped } from "../types/reduxHelperTypes";

// utils
import { convertToBacklogItemModel /*, convertToSprintModel */ } from "../utils/apiPayloadHelper";

// selectors
import * as apiSelectors from "../selectors/apiSelectors";
import * as backlogItemSelectors from "../selectors/backlogItemSelectors";

// actions
import {
    apiPutBacklogItem,
    apiPutBacklogItemMilestones,
    ApiPutBacklogItemSuccessAction,
    PutBacklogItemCallReason
} from "../actions/apiBacklogItems";
import { getLinkByRel } from "../utils/apiLinkHelper";

export interface ProductBacklogItemEditDoneClickActionPayload {
    id: string;
    instanceId: number | undefined;
}
export interface ProductBacklogItemEditDoneClickAction {
    type: typeof ActionTypes.BACKLOG_ITEM_EDIT_DONE_CLICK;
    payload: ProductBacklogItemEditDoneClickActionPayload;
}
export const productBacklogItemEditDoneClick = (id: string, instanceId: number | undefined) => ({
    type: ActionTypes.BACKLOG_ITEM_EDIT_DONE_CLICK,
    payload: {
        id,
        instanceId
    }
});

export const handleProductBacklogItemEditDoneClick = (store: StoreTyped, actionTyped: ProductBacklogItemEditDoneClickAction) => {
    if (actionTyped.payload.id) {
        store.dispatch(updateBacklogItem(actionTyped.payload.id));
    } else {
        store.dispatch(saveNewBacklogItem(actionTyped.payload.instanceId));
    }
};

export const handleUpdateBacklogItem = (store: StoreTyped, actionTyped: UpdateBacklogItemAction) => {
    const itemId = actionTyped.payload.id;
    const state = store.getState();

    const backlogItem = backlogItemSelectors.selectBacklogItemById(state, itemId);
    if (backlogItem) {
        const backlogItemModel = convertToBacklogItemModel(backlogItem);
        const payloadOverride = apiSelectors.buildApiPayloadBaseForResource(state, ResourceTypes.BACKLOG_ITEM, "item", itemId);
        const options = { payloadOverride }; // TODO: Add passthroughData if needed for steps??  <-- BUSY HERE
        const apiCallReason = PutBacklogItemCallReason.SaveBacklogItemDetailForm;
        store.dispatch(apiPutBacklogItem(backlogItemModel, options, apiCallReason));
    }
};

export const handleBacklogItemDetailFormApiPutSuccess = (store: StoreTyped, actionTyped: ApiPutBacklogItemSuccessAction) => {
    const state = store.getState();
    const backlogItemMilestonesLink = getLinkByRel(actionTyped.payload.response?.data?.item?.links, LINK_REL_RELATED_MILESTONES);
    const milestonesBaseUrl = backlogItemMilestonesLink.uri;
    const backlogItemId = actionTyped.payload.response.data.item.id;
    const backlogItem = backlogItemSelectors.selectBacklogItemById(state, backlogItemId);
    const milestoneId = backlogItem.milestoneId;

    const options = {
        payloadOverride: {
            endpoint: milestonesBaseUrl
        }
    };
    const milestoneIds = milestoneId ? [milestoneId] : [];
    store.dispatch(
        apiPutBacklogItemMilestones(
            {
                backlogItemId,
                milestoneIds
            },
            options
        )
    );
};
