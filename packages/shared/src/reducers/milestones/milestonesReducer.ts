// externals
import { Draft, produce } from "immer";

// consts/enums
import * as ActionTypes from "../../actions/actionTypes";

// interfaces/types
import type { AnyFSA } from "../../types/reactHelperTypes";
import type { MilestonesState } from "./milestonesReducerTypes";
import { ApiGetBffViewsPlanSuccessAction } from "../../actions/apiBffViewsPlan";

export const milestonesReducerInitialState = Object.freeze<MilestonesState>({
    items: []
});

export const milestonesReducer = (state: MilestonesState = milestonesReducerInitialState, action: AnyFSA): MilestonesState => {
    return produce(state, (draft) => {
        const { type } = action;
        switch (type) {
            case ActionTypes.API_GET_BFF_VIEWS_PLAN_SUCCESS: {
                const actionTyped = action as ApiGetBffViewsPlanSuccessAction;
                const { payload } = actionTyped;
                draft.items = payload.response.data.milestones.map((apiMilestone) => ({
                    id: apiMilestone.milestoneId,
                    name: apiMilestone.milestone.name
                }));
            }
        }
    });
};
