export const getUniquePropertyValues = <T, K extends keyof T>(items: T[], key: K): T[K][] => {
    const result = new Set<T[K]>();
    for (const item of items) {
        result.add(item[key]);
    }
    return Array.from(result);
};
