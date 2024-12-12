// interfaces/types
import type { ServerItemResponse } from "./common";

export type AuthItem = {
    authToken: string;
    refreshToken: string;
};

export type AuthServerResponse = ServerItemResponse<AuthItem>;
