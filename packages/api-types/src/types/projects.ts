// interfaces/types
import type { ApiResourceItemLink, ServerCollectionResponse } from "./common";

export type ProjectResourceItem = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    links: ApiResourceItemLink[];
};

export type ProjectsServerResponse = ServerCollectionResponse<ProjectResourceItem>;
