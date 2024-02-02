// interfaces/types
import type { ApiResourceItemLink, ServerCollectionResponse, ServerItemResponse } from "./common";

export type SprintResourceItem = {
    id: string;
    projectId: string;
    name: string;
    startdate: string; // e.g. "2022-04-27";
    finishdate: string; // e.g. "2022-05-10";
    plannedPoints: number;
    acceptedPoints: number;
    velocityPoints: number;
    usedSplitPoints: number;
    remainingSplitPoints: number;
    totalPoints: number;
    archived: false;
    createdAt: string;
    updatedAt: string;
    version: number;
    description: string;
    links: ApiResourceItemLink[];
};

export type SprintsServerResponse = ServerCollectionResponse<SprintResourceItem>;

export type SprintServerResponse = ServerItemResponse<SprintResourceItem>;
