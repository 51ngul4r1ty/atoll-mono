export type CollectionEntry = Record<string, any>;
export class MockDatabase {
    private collections: Record<string, CollectionEntry[]>;
    constructor() {}
    reset() {
        this.collections = {};
    }
    addCollection = (collectionName: string, values: CollectionEntry[]) => {
        this.collections[collectionName] = values;
    };
    getCollectionItem = <T>(collectionName: string, fieldName: string, fieldValue: string): any => {
        const itemValue = this.getCollectionItemValueByValues(collectionName, { [fieldName]: fieldValue });
        return itemValue;
        // const collectionItems: CollectionEntry[] = this.collections[collectionName];
        // const matchingItems = collectionItems.filter((item) => item[fieldName] === fieldValue);
        // return matchingItems[0]?.value;
    };
    getCollectionItemValueByValues = (collectionName: string, values: Record<string, any>): any | undefined => {
        const items: CollectionEntry[] = this.getCollectionItemsByValues(collectionName, values);
        return items[0];
    };
    getCollectionItemsByValues = (collectionName: string, values: Record<string, any>): CollectionEntry[] => {
        const collectionItems: CollectionEntry[] = this.collections[collectionName];
        const matchingItems = collectionItems.filter((item) => {
            const fieldNames = Object.keys(values);
            let matches = fieldNames.length > 0;
            fieldNames.forEach((fieldName: string) => {
                const value = values[fieldName];
                if (item[fieldName] !== value) {
                    matches = false;
                }
            });
            return matches;
        });
        return matchingItems;
    };
    updateItem = (collectionName: string, whereValues: Record<string, any>, updateValues: Record<string, any>) => {
        const items = this.getCollectionItemsByValues(collectionName, whereValues);
        items.forEach((item) => {
            const fieldNames = Object.keys(updateValues);
            fieldNames.forEach((fieldName) => {
                item[fieldName] = updateValues[fieldName];
            });
        });
    };
    getAllCollectionValues = (collectionName: string) => {
        return this.collections[collectionName];
    };
}
