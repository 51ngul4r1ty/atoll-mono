export type ApiResourceItemLink = {
    type: string;
    rel: string;
    uri: string;
};

type DataResponseItem<T> = {
    item: T;
};

type DataResponseCollection<T> = {
    items: T[];
};

/**
 * This should only be used when data structure doesn't conform to "item" or "collection" responses.
 * For example, BFF view responses that contain multiple collections.
 */
export type ServerDataResponse<D> = {
    status: number;
    data: D;
};

/**
 * This should be used when only a single item is expected in response.
 */
export type ServerItemResponse<T> = ServerDataResponse<DataResponseItem<T>>;

/**
 * This should be used when only a collection of items is expected in the response.
 */
export type ServerCollectionResponse<T> = ServerDataResponse<DataResponseCollection<T>>;

export type ServerErrorResponse = {
    status: number;
    message: string;
};
