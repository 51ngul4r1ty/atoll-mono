// externals
import { Model, DataTypes, Deferrable } from "sequelize";

// data access
import { sequelize } from "../connection";

// other models
import { BacklogItemDataModel } from "./BacklogItemDataModel";
import { MilestoneDataModel } from "./MilestoneDataModel";

export class BacklogItemMilestoneDataModel extends Model {}

BacklogItemMilestoneDataModel.init(
    {
        id: {
            type: DataTypes.STRING(32),
            primaryKey: true
        },
        backlogitemId: {
            type: DataTypes.STRING(32),
            allowNull: false,
            primaryKey: false,
            references: {
                model: "backlogitem",
                key: "id",
                deferrable: Deferrable.INITIALLY_DEFERRED as any
            }
        },
        milestoneId: {
            type: DataTypes.STRING(32),
            allowNull: false,
            primaryKey: false,
            references: {
                model: "milestone",
                key: "id",
                deferrable: Deferrable.INITIALLY_DEFERRED as any
            }
        }
    },
    {
        modelName: "backlogitemmilestone",
        freezeTableName: true,
        paranoid: false,
        timestamps: false,
        version: false,
        sequelize
    }
);

BacklogItemDataModel.hasMany(BacklogItemMilestoneDataModel, { foreignKey: "backlogitemId" });
BacklogItemMilestoneDataModel.belongsTo(BacklogItemDataModel, { foreignKey: "backlogitemId" });

MilestoneDataModel.hasMany(BacklogItemMilestoneDataModel, { foreignKey: "milestoneId" });
BacklogItemMilestoneDataModel.belongsTo(MilestoneDataModel, { foreignKey: "milestoneId" });
