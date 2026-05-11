// externals
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op, Transaction } from "sequelize";

// libraries
import { ApiMilestone, logger } from "@atoll/shared";

// data access
import { sequelize } from "../../dataaccess/connection";
import { MilestoneDataModel } from "../../dataaccess/models/MilestoneDataModel";
import { BacklogItemMilestoneDataModel } from "../../dataaccess/models/BacklogItemMilestoneDataModel";
import { BacklogItemDataModel } from "../../dataaccess/models/BacklogItemDataModel";

// consts/enums
import { /* fetchMilestone, */ fetchMilestones, fetchMilestonesByBacklogItemId } from "./fetchers/milestoneFetcher";
import { deleteMilestone } from "./deleters/milestoneDeleter";

// utils
import { getParamsFromRequest } from "../utils/filterHelper";
import { addIdToBody, getSimpleUuid } from "../utils/uuidHelper";
import { respondWithError, respondWithFailedValidation, respondWithNotFound, respondWithObj } from "../utils/responder";
import { mapApiToDbMilestone } from "../../dataaccess/mappers/apiToDataAccessMappers";
import { mapDbToApiBacklogItemMilestone } from "../../dataaccess/mappers/dataAccessToApiMappers";
import { mapApiBacklogItemMilestoneToApiMilestone } from "../../dataaccess/mappers/apiToApiMappers";

export const milestonesGetHandler = async (req: Request, res) => {
    const params = getParamsFromRequest(req);
    const result = await fetchMilestones(params.projectId);
    if (result.status === StatusCodes.OK) {
        res.json(result);
    } else {
        res.status(result.status).json({
            status: result.status,
            message: result.message
        });
        console.log(`Unable to fetch milestones: ${result.message}`);
    }
};

export const milestonePostHandler = async (req: Request, res) => {
    const params = getParamsFromRequest(req);
    const milestoneDataObject = mapApiToDbMilestone({ ...addIdToBody(req.body), projectId: params.projectId });
    try {
        const addedMilestone = await MilestoneDataModel.create(milestoneDataObject);
        res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            data: {
                item: addedMilestone
            }
        });
    } catch (err) {
        respondWithError(res, err);
    }
};

export const milestoneDeleteHandler = async (req: Request, res) => {
    const params = getParamsFromRequest(req);
    const result = await deleteMilestone(params.milestoneId);
    if (result.status === StatusCodes.OK) {
        res.json(result);
    } else {
        res.status(result.status).json({
            status: result.status,
            message: result.message
        });
        console.log(`Unable to delete milestone: ${result.message}`);
    }
};

export const milestonePutHandler = async (req: Request, res) => {
    const functionTag = "milestonePutHandler";
    const logContext = logger.info("starting call", [functionTag]);
    const queryParamItemId = req.params.milestoneId;
    if (!queryParamItemId) {
        respondWithFailedValidation(res, "Item ID is required in URI path for this operation");
        return;
    }
    const bodyItemId = req.body.id;
    if (bodyItemId && queryParamItemId != bodyItemId) {
        respondWithFailedValidation(
            res,
            `Item ID in URI path (${queryParamItemId}) should match Item ID in payload (${bodyItemId})`
        );
        return;
    }
    const newDataItem = mapApiToDbMilestone({ ...req.body, id: queryParamItemId });
    let transaction: Transaction;
    try {
        transaction = await sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE });

        const milestone = await MilestoneDataModel.findOne({
            where: { id: queryParamItemId },
            transaction
        });
        if (!milestone) {
            if (transaction) {
                await transaction.commit();
                transaction = null;
            }
            respondWithNotFound(res, `Unable to find milestone to update with ID ${req.body.id}`);
        } else {
            await milestone.update(newDataItem, { transaction });
            if (transaction) {
                await transaction.commit();
                transaction = null;
            }
            respondWithObj(res, newDataItem);
        }
        logger.info("completed call", [functionTag]);
    } catch (err) {
        const errLogContext = logger.warn(`handling error "${err}"`, [functionTag], logContext);
        respondWithError(res, err);
    }
};

export const backlogItemMilestonesGetHandler = async (req: Request, res) => {
    const params = getParamsFromRequest(req);
    const result = await fetchMilestonesByBacklogItemId(params.backlogItemId);
    if (result.status === StatusCodes.OK) {
        res.json(result);
    } else {
        res.status(result.status).json({
            status: result.status,
            message: result.message
        });
        console.log(`Unable to fetch milestones related to backlog item ID "${params.backlogItemId}": ${result.message}`);
    }
};

export const backlogItemMilestonesPutHandler = async (req: Request, res) => {
    const functionTag = "backlogItemMilestonesPutHandler";
    const logContext = logger.info("starting call", [functionTag]);
    const params = getParamsFromRequest(req);
    if (!params.backlogItemId) {
        respondWithFailedValidation(res, "Backlog Item ID is required in URI path for this operation");
        return;
    }
    let transaction: Transaction;
    try {
        transaction = await sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE });

        const backlogItem = await BacklogItemDataModel.findOne({
            where: { id: params.backlogItemId },
            transaction
        });
        if (!backlogItem) {
            if (transaction) {
                await transaction.commit();
                transaction = null;
            }
            respondWithNotFound(res, `Unable to find backlog item to update with ID ${params.backlogItemId}`);
        } else {
            const dbMilestones = await BacklogItemMilestoneDataModel.findAll({
                include: [{ model: MilestoneDataModel }, { model: BacklogItemDataModel, where: { id: params.backlogItemId } }],
                transaction
            });
            const existingMilestoneIds = dbMilestones.map((item) => {
                //                console.log(JSON.stringify(item, null, 2));
                const milestoneWithBacklogItem = mapDbToApiBacklogItemMilestone(item);
                const milestone = mapApiBacklogItemMilestoneToApiMilestone(milestoneWithBacklogItem);
                return milestone.id;
            });
            const requestedMilestoneIds = req.body.map((milestone) => milestone.milestoneId);
            const requestedMilestoneIdSet = new Set<string>(requestedMilestoneIds);
            const existingMilestoneIdSet = new Set<string>(existingMilestoneIds);
            const milestonesInRequest: string[] = requestedMilestoneIds;
            for (const milestoneId of milestonesInRequest) {
                if (!existingMilestoneIdSet.has(milestoneId)) {
                    await BacklogItemMilestoneDataModel.create(
                        {
                            id: getSimpleUuid(),
                            backlogitemId: params.backlogItemId,
                            milestoneId: milestoneId
                        },
                        {
                            transaction
                        }
                    );
                }
            }
            for (const milestoneId of existingMilestoneIds) {
                if (!requestedMilestoneIdSet.has(milestoneId)) {
                    await BacklogItemMilestoneDataModel.destroy({
                        where: {
                            backlogitemId: params.backlogItemId,
                            milestoneId: milestoneId
                        },
                        transaction
                    });
                }
            }
            if (transaction) {
                await transaction.commit();
                transaction = null;
            }
            const newDataItem = requestedMilestoneIds.map((milestoneId: string) => ({ milestoneId }));
            respondWithObj(res, newDataItem);
            logger.info("completed call", [functionTag]);
        }
    } catch (err) {
        const errLogContext = logger.warn(`handling error "${err}"`, [functionTag], logContext);
        respondWithError(res, err);
    }
};
