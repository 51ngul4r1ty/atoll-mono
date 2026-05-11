// externals
import { StatusCodes } from "http-status-codes";
import { FindOptions, InstanceDestroyOptions, Transaction } from "sequelize";

// data access
import { MilestoneDataModel } from "../../../dataaccess/models/MilestoneDataModel";

// utils
import { buildOptionsWithTransaction } from "../../utils/sequelizeHelper";
import { buildResponseFromCatchError, buildResponseWithItem } from "../../utils/responseBuilder";
import { mapDbToApiMilestone } from "../../../dataaccess/mappers/dataAccessToApiMappers";

export const deleteMilestone = async (milestoneId: string | null, transaction?: Transaction) => {
    try {
        const findItemOptions: FindOptions = buildOptionsWithTransaction({ where: { id: milestoneId } }, transaction);
        const item = await MilestoneDataModel.findOne(findItemOptions);
        if (!item) {
            return {
                status: StatusCodes.NOT_FOUND,
                message: `Milestone ${milestoneId} was not found`
            };
        }
        const milestone = mapDbToApiMilestone(item);
        const destroyOptions: InstanceDestroyOptions = buildOptionsWithTransaction(undefined, transaction);
        await item.destroy(destroyOptions);
        return buildResponseWithItem(milestone);
    } catch (error) {
        return buildResponseFromCatchError(error);
    }
};
