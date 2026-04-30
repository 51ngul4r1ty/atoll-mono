// externals
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";

// libraries
import { ApiMilestone } from "@atoll/shared";

// data access
import { MilestoneDataModel } from "../../../dataaccess/models/MilestoneDataModel";

// consts/enums
import { MILESTONE_RESOURCE_NAME } from "../../../resourceNames";

// interfaces/types
import { RestApiCollectionResult, RestApiErrorResult } from "../../utils/responseBuilder";

// utils
import { buildResponseFromCatchError, buildResponseWithItem, buildResponseWithItems } from "../../utils/responseBuilder";
// import { buildSelfLink } from "../../../utils/linkBuilder";
import { mapDbToApiBacklogItemMilestone } from "../../../dataaccess/mappers/dataAccessToApiMappers";
import { BacklogItemDataModel, BacklogItemMilestoneDataModel } from "server/dataaccess";

// This will be added when a milestone endpoint exists
// export const buildMilestoneLinks = (milestone: ApiMilestone) => [buildSelfLink(milestone, `/api/v1/${MILESTONE_RESOURCE_NAME}/`)];

export const fetchMilestonesWithBacklogItems = async (projectId: string) => {
    try {
        const dbMilestones = await BacklogItemMilestoneDataModel.findAll({
            include: [{ model: BacklogItemDataModel }, { model: MilestoneDataModel, where: { projectId } }]
        });
        const items = dbMilestones.map((item) => {
            console.log(JSON.stringify(item, null, 2));
            const milestone = mapDbToApiBacklogItemMilestone(item);
            const result: ApiMilestone = {
                ...milestone,
                links: [] // in future we'll have: buildMilestoneLinks(milestone)
            };
            return result;
        });
        return buildResponseWithItems(items);
    } catch (error) {
        return buildResponseFromCatchError(error);
    }
};
