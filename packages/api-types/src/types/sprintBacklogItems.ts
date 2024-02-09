// interfaces/types
import type { ApiResourceItemLink, ServerCollectionResponse, ServerItemResponse } from "./common";

export type SprintBacklogResourceItem = {
    acceptanceCriteria: string;
    acceptedAt: string | null; // e.g. "2022-03-23T03:32:14.049Z"
    createdAt: string; // e.g. "2020-12-13T00:10:49.589Z"
    displayindex: number;
    estimate: number | null;
    externalId: string | null;
    finishedAt: string | null;
    friendlyId: string; // e.g. "s-70"
    id: string; // this is currently story ID but may change in future
    projectId: string;
    reasonPhrase: string;
    releasedAt: string | null; // e.g. "2022-03-23T03:32:14.049Z"
    rolePhrase: string | null;
    startedAt: string | null; // e.g. "2021-05-05T02:49:39.042Z"
    status: string; // e.g. "P"
    storyPhrase: string;
    type: string; // e.g. "story"
    updatedAt: string; // e.g. "2021-05-05T03:09:21.526Z"
    version: number;
    partPercentage: number | null; // e.g. 100
    partIndex: number;
    totalParts: number;
    backlogItemPartId: string;
    storyEstimate: number;
    storyStartedAt: string; // e.g. "2021-05-05T02:49:39.042Z"
    storyFinishedAt: string; // e.g. "2022-03-23T03:32:14.049Z"
    storyStatus: string; // e.g. "P"
    storyUpdatedAt: string; // e.g. "2022-04-25T12:23:52.444Z"
    storyVersion: number;
    links: ApiResourceItemLink[];
};

export type SprintBacklogItemsServerResponse = ServerCollectionResponse<SprintBacklogResourceItem>;

export type SprintBacklogItemServerResponse = ServerItemResponse<SprintBacklogResourceItem>;
