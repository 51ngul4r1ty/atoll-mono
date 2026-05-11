/**
 * Purpose: To build standard resource base links used by linkBuilder.
 */

// consts/enums
import { API_CURRENT_VERSION } from "../api/consts";
import { BACKLOG_ITEM_RESOURCE_NAME, PRODUCT_BACKLOG_ITEM_RESOURCE_NAME } from "../resourceNames";

// utils
import { buildBasePath } from "./linkBuilder";

export const buildCurrentVersionProductBacklogItemBasePath = () =>
    buildBasePath(PRODUCT_BACKLOG_ITEM_RESOURCE_NAME, API_CURRENT_VERSION);

export const buildCurrentVersionBacklogItemBasePath = () => buildBasePath(BACKLOG_ITEM_RESOURCE_NAME, API_CURRENT_VERSION);
