// externals
import { Sequelize, Options } from "sequelize";

// libraries
import { getDbConfig } from "@atoll/shared";

const verbose = true;
const dbConfig = getDbConfig(verbose);
if (!dbConfig) {
    console.error("Unable to retrieve database configuration - set ATOLL_DATABASE_URL for local development");
}

const portNumberFromStringOrNumberr = (val: string | number | undefined | null): number | undefined | null => {
    if (val === "") {
        return undefined;
    }
    if (val === 0) {
        return 0;
    }
    if (!val) {
        return val as unknown as number | undefined | null;
    }
    if (typeof val === "string") {
        return parseInt(val);
    }
    return val;
};

const buildOptions = (): Options => {
    const options: Options = {
        host: dbConfig.host,
        port: portNumberFromStringOrNumberr(dbConfig.port),
        dialect: "postgres",
        dialectOptions: {},
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    };
    if (!dbConfig.useSsl) {
        (options.dialectOptions as any).ssl = false;
    } else {
        (options.dialectOptions as any).ssl = {
            require: dbConfig.useSsl,
            rejectUnauthorized: false
        };
    }
    return options;
};

// sslmode=require
export const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, buildOptions());
