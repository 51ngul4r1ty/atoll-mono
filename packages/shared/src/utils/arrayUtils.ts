export const objArrayToKeyedObj = <T, K extends keyof T>(val: T[], keyFieldName: K): Record<string, T> => {
    const result: Record<string, T> = {};
    val.forEach((item) => {
        const itemAsRecord = item as Record<K, any>;
        const key = itemAsRecord[keyFieldName];
        result[key] = item;
    });
    return result;
};

export const getUniquePropertyValues = <T, K extends keyof T>(items: T[], key: K): T[K][] => {
    const result = new Set<T[K]>();
    for (const item of items) {
        result.add(item[key]);
    }
    return Array.from(result);
};
