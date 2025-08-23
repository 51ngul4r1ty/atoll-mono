// externals
import { connect } from "react-redux";
import { Dispatch } from "redux";

// components
import {
    ProductBacklogItemView,
    ProductBacklogItemViewDispatchProps,
    ProductBacklogItemViewStateProps
} from "./ProductBacklogItemView";

// state
import { StateTree } from "../../reducers/rootReducer";

// actions
import { apiGetProductBacklogItems } from "../../actions/apiProductBacklogItems";

// utils
import { buildGroupsByProjectId } from "./productBacklogItemViewUtils";

const mapStateToProps = (state: StateTree): ProductBacklogItemViewStateProps => {
    let groupsByProjectId = {};
    let error = undefined;
    try {
        groupsByProjectId = buildGroupsByProjectId(state);
    } catch (err) {
        error = err;
    }
    const result: ProductBacklogItemViewStateProps = {
        groupsByProjectId,
        error
    };
    return result;
};

const mapDispatchToProps = (dispatch: Dispatch): ProductBacklogItemViewDispatchProps => {
    return {
        onLoad: () => {
            dispatch(apiGetProductBacklogItems());
        }
    };
};

export const ProductBacklogItemViewContainer = connect(mapStateToProps, mapDispatchToProps)(ProductBacklogItemView);
