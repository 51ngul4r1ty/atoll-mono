// externals
import { Model, DataTypes, Deferrable } from "sequelize";

// data access
import { sequelize } from "../connection";

export class MilestoneDataModel extends Model {}

MilestoneDataModel.init(
    {
        id: {
            type: DataTypes.STRING(32),
            primaryKey: true
        },
        projectId: {
            type: DataTypes.STRING(32),
            primaryKey: false,
            references: {
                model: "project",
                key: "id",
                deferrable: Deferrable.INITIALLY_DEFERRED as any
            },
            get: function () {
                return this.getDataValue("projectId");
            }
        },
        name: DataTypes.STRING(50),
        targetdate: DataTypes.DATEONLY,
        archived: {
            type: DataTypes.CHAR(1),
            allowNull: false
        }
    },
    {
        modelName: "milestone",
        freezeTableName: true,
        paranoid: false,
        timestamps: true,
        version: true,
        sequelize
    }
);
