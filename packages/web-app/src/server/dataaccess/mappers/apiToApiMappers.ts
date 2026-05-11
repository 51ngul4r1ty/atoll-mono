// libraries
import type { ApiMilestone, ApiBacklogItemMilestone } from "@atoll/shared";

export const mapApiBacklogItemMilestoneToApiMilestone = (apiBacklogItemMilestone: ApiBacklogItemMilestone) => {
    const milestone = apiBacklogItemMilestone.milestone as ApiMilestone;
    return milestone;
};
