// externals
import * as React from "react";

// style
import css from "./ProductBacklogItemView.module.css";

export enum RankItemType {
    None = 0,
    ListStart = 1, // item ID is null
    Middle = 2,
    ListEnd = 3, // next ID is null
    OrphanedListStart = 4, // item ID is not null
    OrphanedListEnd = 5, // next ID is not null,
    OrphanedListStartEnd = 6, // item ID is not null and next ID is not null
    FinalLinkWithoutEnd = 7
}

export interface ProductBacklogItemItem {
    itemText: string;
    nextText: string;
    itemType: RankItemType;
    linkCount: number;
}

export interface ProductBacklogItemGroup {
    items: ProductBacklogItemItem[];
}

export interface ProductBacklogItemViewStateProps {
    groupsByProjectId: Record<string, ProductBacklogItemGroup[]>;
    error: any;
}

export interface ProductBacklogItemViewDispatchProps {
    onLoad: { () };
}

export type ProductBacklogItemViewProps = ProductBacklogItemViewStateProps & ProductBacklogItemViewDispatchProps;

export const buildTypeText = (itemType: RankItemType) => {
    switch (itemType) {
        case RankItemType.FinalLinkWithoutEnd: {
            return "(next item is missing)";
        }
        case RankItemType.ListStart: {
            return "(start)";
        }
        case RankItemType.Middle: {
            return "";
        }
        case RankItemType.ListEnd: {
            return "(end)";
        }
        case RankItemType.OrphanedListStart: {
            return "(start - orphaned)";
        }
        case RankItemType.OrphanedListEnd: {
            return "(end - orphaned)";
        }
        case RankItemType.OrphanedListStartEnd: {
            return "(start-end - orphaned)";
        }
        default: {
            return "";
        }
    }
};

export const ProductBacklogItemView: React.FC<ProductBacklogItemViewProps> = (props) => {
    React.useEffect(() => {
        if (props.onLoad) {
            props.onLoad();
        }
    }, []);
    let groupIndex = 1;
    const buildGroupItemElts = (items: ProductBacklogItemItem[]) => {
        let itemIndex = 1;
        return items.map((item) => (
            <div key={itemIndex++} className={css.row}>
                <div className={css.prevCell}>{item.itemText}</div>
                <div className={css.nextCell}>{item.nextText}</div>
                <div>{buildTypeText(item.itemType)}</div>
            </div>
        ));
    };
    const projectIds = Object.keys(props.groupsByProjectId);
    const itemElts = projectIds.map((projectId) => {
        const groups = props.groupsByProjectId[projectId];
        const projectItemElts = groups.map((group) => <div key={groupIndex++}>{buildGroupItemElts(group.items)}</div>);
        return (
            <>
                <h2>PROJECT "{projectId}"</h2>
                {projectItemElts}
            </>
        );
    });
    const errorMessage = props.error ? <span>ERRORS ENCOUNTERED: {`${props.error}`}</span> : null;
    return (
        <div className={css.content}>
            <h1>BACKLOG ITEM RANK DEBUG VIEWER</h1>
            {itemElts}
            {errorMessage}
        </div>
    );
};
