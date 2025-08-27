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
        /**
         * This test is a special case because the end of the list is designated
         * by a null link.  The reorder operation inserts the source item BEFORE
         * the target provided.  So, in order to add to the end of the list the
         * target provided will be null, but that can match any of the
         * "end of list" items because there could be more than one project in
         * the list.  To simulate this properly 3 projects are included.
         */
        it("should handle reorder scenario to end of list", async () => {
            const project0Items = [
                {
                    backlogitemId: null,
                    nextbacklogitemId: "X",
                    projectId: "PROJECT_0"
                },
                {
                    backlogitemId: "X",
                    nextbacklogitemId: "Y",
                    projectId: "PROJECT_0"
                },
                {
                    backlogitemId: "Y",
                    nextbacklogitemId: "Z",
                    projectId: "PROJECT_0"
                },
                {
                    backlogitemId: "Z",
                    nextbacklogitemId: null,
                    projectId: "PROJECT_0"
                }
            ];
            const project2Items = [
                {
                    backlogitemId: null,
                    nextbacklogitemId: "P",
                    projectId: "PROJECT_2"
                },
                {
                    backlogitemId: "P",
                    nextbacklogitemId: "Q",
                    projectId: "PROJECT_2"
                },
                {
                    backlogitemId: "Q",
                    nextbacklogitemId: "R",
                    projectId: "PROJECT_2"
                },
                {
                    backlogitemId: "R",
                    nextbacklogitemId: null,
                    projectId: "PROJECT_2"
                }
            ];
            mockDatabase.addCollection("productbacklogitems", [
                ...project0Items,
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
                },
                ...project2Items
            ]);
            // arrange
            const req: Request = {
                body: {
                    sourceItemId: "B", // source is used to determine project ID
                    targetItemId: null // move to end of list
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
                ...project0Items,
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
                    nextbacklogitemId: "F",
                    projectId: "PROJECT_1"
                },
                {
                    backlogitemId: "F",
                    nextbacklogitemId: "B",
                    projectId: "PROJECT_1"
                },
                {
                    backlogitemId: "B",
                    nextbacklogitemId: null,
                    projectId: "PROJECT_1"
                },
                ...project2Items
            ]);
        });
    });
});
