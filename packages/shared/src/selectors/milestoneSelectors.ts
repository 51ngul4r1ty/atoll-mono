// interfaces/types
import type { MilestoneItem } from "../types/milestoneItemTypes";

// state
import type { StateTree } from "../reducers/rootReducer";

export const getMilestones = (state: StateTree): MilestoneItem[] => state.milestones.items;
