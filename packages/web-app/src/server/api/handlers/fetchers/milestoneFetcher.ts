// externals
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";

// libraries
import { ApiMilestone } from "@atoll/shared";

// data access
import { MilestoneDataModel } from "../../../dataaccess/models/MilestoneDataModel";

// consts/enums
import { MILESTONE_RESOURCE_NAME } from "../../../resourceNames";

// utils
import { buildResponseFromCatchError, buildResponseWithItems } from "../../utils/responseBuilder";
import { buildSelfLink } from "../../../utils/linkBuilder";
import {
    mapDbMilestonesToApiBacklogItemMilestones,
    mapDbToApiBacklogItemMilestone,
    mapDbToApiMilestone
} from "../../../dataaccess/mappers/dataAccessToApiMappers";
import { mapApiBacklogItemMilestoneToApiMilestone } from "../../../dataaccess/mappers/apiToApiMappers";
import { buildOptionsFromParams } from "../../utils/sequelizeHelper";
import { BacklogItemMilestoneDataModel } from "../../../dataaccess/models/BacklogItemMilestoneDataModel";
import { BacklogItemDataModel } from "../../../dataaccess/models/BacklogItemDataModel";

export const buildMilestoneLinks = (milestone: ApiMilestone) => [buildSelfLink(milestone, `/api/v1/${MILESTONE_RESOURCE_NAME}/`)];

export const fetchMilestonesWithBacklogItems = async (projectId: string) => {
    try {
        const dbMilestones = await MilestoneDataModel.findAll({
            where: { projectId },
            include: [
                {
                    model: BacklogItemMilestoneDataModel,
                    required: false, // left outer join
                    include: [
                        {
                            model: BacklogItemDataModel,
                            required: false // left outer join
                        }
                    ]
                }
            ]
        });

        const items = mapDbMilestonesToApiBacklogItemMilestones(dbMilestones);
        return buildResponseWithItems(items);
    } catch (error) {
        return buildResponseFromCatchError(error);
    }
};

export const fetchMilestones = async (projectId: string) => {
    const options = buildOptionsFromParams({ projectId });
    try {
        const dbMilestones = await MilestoneDataModel.findAll({
            ...options,
            order: [["name", "ASC"]]
        });
        const items = dbMilestones.map((item) => {
            const milestone = mapDbToApiMilestone(item);
            const result: ApiMilestone = {
                ...milestone,
                links: buildMilestoneLinks(milestone)
            };
            return result;
        });
        return buildResponseWithItems(items);
    } catch (error) {
        return buildResponseFromCatchError(error);
    }
};

export const fetchMilestonesByBacklogItemId = async (backlogItemId: string) => {
    try {
        const dbMilestones = await BacklogItemMilestoneDataModel.findAll({
            include: [{ model: MilestoneDataModel }, { model: BacklogItemDataModel, where: { id: backlogItemId } }]
        });
        const items = dbMilestones.map((item) => {
            console.log(JSON.stringify(item, null, 2));
            const milestoneWithBacklogItem = mapDbToApiBacklogItemMilestone(item);
            const milestone = mapApiBacklogItemMilestoneToApiMilestone(milestoneWithBacklogItem);
            const result: ApiMilestone = {
                ...milestone,
                links: buildMilestoneLinks(milestone)
            };
            return result;
        });
        return buildResponseWithItems(items);
    } catch (error) {
        return buildResponseFromCatchError(error);
    }
};
