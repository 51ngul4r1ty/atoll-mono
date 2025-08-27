// test related
import "jest";

// interfaces/types
import type { Request, Response } from "express";
import { Transaction } from "sequelize";

// mock related
import { ProductBacklogItemDataModel } from "../../../dataaccess/models/ProductBacklogItemDataModel";
import { MockDatabase } from "../__common__/mockDatabase";
import { sequelize } from "../../../dataaccess/connection";

// code under test
import { backlogItemsReorderPostHandler } from "../backlogItems";

// test utils
import { sortLinkedListArray } from "../__common__/linkedListArraySorter";

describe("Backlog Items", () => {
    let sendFn: jest.Mock;
    let statusFn: jest.Mock;
    let sequelizeTransactionCommmitMock: jest.Mock;
    let sequelizeTransactionRollbackMock: jest.Mock;
    const mockDatabase: MockDatabase = new MockDatabase();
    beforeEach(() => {
        mockDatabase.reset();
        sendFn = jest.fn(() => null);
        statusFn = jest.fn(() => ({
            send: sendFn
        }));
        sequelizeTransactionCommmitMock = jest.fn(async () => undefined);
        sequelizeTransactionRollbackMock = jest.fn(async () => undefined);
        const sequelizeTransactionSpy = jest.spyOn(sequelize, "transaction");
        const sequelizeTransactionMock: Promise<Transaction> = {
            commit: sequelizeTransactionCommmitMock,
            rollback: sequelizeTransactionRollbackMock
        } as any;
        sequelizeTransactionSpy.mockResolvedValue(sequelizeTransactionMock);
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    describe("backlogitemsReorderPostHandler", () => {
        it("should respond with failed validation if sourceItemId is undefined", async () => {
            // arrange
            const req: Request = {
                body: {
                    sourceItemId: undefined,
                    targetItemId: "F"
                }
            } as any;
            const res: Response = {
                status: statusFn
            } as any;

            // act
            await backlogItemsReorderPostHandler(req, res);

            // assert
            expect(statusFn).toBeCalledWith(400);
            expect(sendFn).toBeCalledWith({
                message: "sourceItemId must have a value",
                status: 400
            });
            expect(sequelizeTransactionCommmitMock).toBeCalledTimes(0);
            expect(sequelizeTransactionRollbackMock).toBeCalledTimes(0);
        });
        it("should respond with failed validation if sourceItemId = targetItemId", async () => {
            // arrange
            const req: Request = {
                body: {
                    sourceItemId: "B",
                    targetItemId: "B"
                }
            } as any;
            const res: Response = {
                status: statusFn
            } as any;

            // act
            await backlogItemsReorderPostHandler(req, res);

            // assert
            expect(statusFn).toBeCalledWith(400);
            expect(sendFn).toBeCalledWith({
                message: "sourceItemId and targetItemId must be different!",
                status: 400
            });
            expect(sequelizeTransactionCommmitMock).toBeCalledTimes(0);
            expect(sequelizeTransactionRollbackMock).toBeCalledTimes(0);
        });
        it("should handle a simple reorder scenario", async () => {
            mockDatabase.addCollection("productbacklogitems", [
                {
                    backlogitemId: null,
                    nextbacklogitemId: "A",
                    projectId: "PROJECT_1"
                },
                {
                    backlogitemId: "A",
                    nextbacklogitemId: "B",
                    projectId: "PROJECT_1"
                },
                {
                    backlogitemId: "B",
                    nextbacklogitemId: "C",
                    projectId: "PROJECT_1"
                },
                {
                    backlogitemId: "C",
                    nextbacklogitemId: "D",
                    projectId: "PROJECT_1"
                },
                {
                    backlogitemId: "D",
                    nextbacklogitemId: "E",
                    projectId: "PROJECT_1"
                },
                {
                    backlogitemId: "E",
                    nextbacklogitemId: "F",
                    projectId: "PROJECT_1"
                },
                {
                    backlogitemId: "F",
                    nextbacklogitemId: null,
                    projectId: "PROJECT_1"
                }
            ]);
            // arrange
            const req: Request = {
                body: {
                    sourceItemId: "B",
                    targetItemId: "F"
                }
            } as any;
            const res: Response = {
                status: statusFn
            } as any;
            const findOneSpy = jest.spyOn(ProductBacklogItemDataModel, "findOne");
            const updateSpy = jest.spyOn(ProductBacklogItemDataModel, "update");
            updateSpy.mockImplementation(() => null);
            findOneSpy.mockImplementation((options) => {
                const item = mockDatabase.getCollectionItemValueByValues("productbacklogitems", options.where);
                return Promise.resolve({
                    dataValues: {
                        ...item
                    },
                    update: (updateValues, options) => {
                        mockDatabase.updateItem("productbacklogitems", item, updateValues);
                    }
                } as any);
            });

            // act
            await backlogItemsReorderPostHandler(req, res);

            // assert
            expect(findOneSpy).toBeCalledTimes(3);
            expect(sequelizeTransactionCommmitMock).toBeCalledTimes(1);
            expect(sequelizeTransactionRollbackMock).toBeCalledTimes(0);
            const allCollectionValuesRaw = mockDatabase.getAllCollectionValues("productbacklogitems");
            const allCollectionValues = sortLinkedListArray(
                allCollectionValuesRaw,
                "backlogitemId",
                "nextbacklogitemId",
                "projectId"
            );
            expect(allCollectionValues).toStrictEqual([
                {
                    backlogitemId: null,
                    nextbacklogitemId: "A",
                    projectId: "PROJECT_1"
                },
                {
                    backlogitemId: "A",
                    nextbacklogitemId: "C",
                    projectId: "PROJECT_1"
                },
                {
                    backlogitemId: "C",
                    nextbacklogitemId: "D",
                    projectId: "PROJECT_1"
                },
                {
                    backlogitemId: "D",
                    nextbacklogitemId: "E",
                    projectId: "PROJECT_1"
                },
                {
                    backlogitemId: "E",
                    nextbacklogitemId: "B",
                    projectId: "PROJECT_1"
                },
                {
                    backlogitemId: "B",
                    nextbacklogitemId: "F",
                    projectId: "PROJECT_1"
                },
                {
                    backlogitemId: "F",
                    nextbacklogitemId: null,
                    projectId: "PROJECT_1"
                }
            ]);
        });
    });
});
