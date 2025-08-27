export const sortLinkedListArray = (collection: any[], idFieldName: string, nextIdFieldName: string, groupFieldName: string) => {
    const result: any[] = [];
    const groupFieldNames: Record<string, any[]> = {};
    collection.forEach((item) => {
        const groupFieldNameValue = item[groupFieldName];
        let groupFieldCollection = groupFieldNames[groupFieldNameValue];
        if (groupFieldCollection === undefined) {
            groupFieldNames[groupFieldNameValue] = [];
            groupFieldCollection = groupFieldNames[groupFieldNameValue];
        }
        groupFieldCollection.push(item);
    });
    Object.keys(groupFieldNames).forEach((groupFieldName) => {
        const groupFieldCollection = groupFieldNames[groupFieldName];
        const collectionByIdField: Record<string, any[]> = {};
        groupFieldCollection.forEach((item) => {
            collectionByIdField[item[idFieldName]] = item;
        });
        const matchingStartItems = groupFieldCollection.filter((item) => item[idFieldName] === null);
        if (matchingStartItems.length > 1) {
            throw new Error("Unexpected condition- more than one starting item!");
        } else if (matchingStartItems.length === 0) {
            throw new Error("Unexpected condition- no starting items!");
        } else {
            let currentItem = matchingStartItems[0];
            let busy = true;
            let count = 0;
            let maxCount = 1000;
            while (busy) {
                result.push(currentItem);
                const nextItemId = currentItem[nextIdFieldName];
                if (nextItemId === null) {
                    busy = false;
                } else if (count > maxCount) {
                    throw new Error(`Unexpected condition- looped through ${count} items!`);
                } else {
                    currentItem = collectionByIdField[nextItemId];
                }
                count++;
            }
        }
    });
    return result;
};
