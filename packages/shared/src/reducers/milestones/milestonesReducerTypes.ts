// interfaces/types
import type { MilestoneItem } from "../../types/milestoneItemTypes";

export type MilestonesState = Readonly<{
    items: MilestoneItem[];
}>;
