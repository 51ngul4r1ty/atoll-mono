const urlParse = require("url-parse");

let historyInstance: any;

export const storeHistoryInstance = (history: any) => {
    historyInstance = history;
};

export const getHistoryInstance = () => {
    return historyInstance;
};

let assetPortOverride: number = null;

let configCallbacks: ConfigCallbacks = {
    getDocumentLocHref: () => ""
};

export interface ConfigCallbacks {
    getDocumentLocHref: { (): string };
}

export const initConfig = (configCallbacksObj: ConfigCallbacks) => {
    configCallbacks = configCallbacksObj;
};

export const setAssetPortOverride = (port: number | null) => {
    assetPortOverride = port;
};

export const getAssetPortOverride = (): number | null => {
    return assetPortOverride;
};

export const protocolToScheme = (protocol: string) => {
    return protocol.substr(0, protocol.length - 1);
};

export const getApiScheme = () => {
    const appUrl = configCallbacks.getDocumentLocHref();
    const parsed = urlParse(appUrl);
    return protocolToScheme(parsed.protocol);
};

export const getApiHostName = () => {
    const appUrl = configCallbacks.getDocumentLocHref();
    const parsed = urlParse(appUrl);
    return parsed.hostname;
};

export const getApiPort = () => {
    const appUrl = configCallbacks.getDocumentLocHref();
    const parsed = urlParse(appUrl);
    return parsed.port;
};

export const requiresSecureProtocol = () => {
    const appUrl = configCallbacks.getDocumentLocHref();
    const parsed = urlParse(appUrl);
    if (parsed.protocol === "http:" || parsed.port === "80" || parsed.port === "8500") {
        return false;
    } else if (parsed.protocol === "https:" || parsed.port === "443") {
        return true;
    } else {
        // default to secure
        return true;
    }
};

export const getApiBaseUrl = () => {
    return `${getApiScheme()}://${getApiHostName()}:${getApiPort()}/`;
};

export const combineBaseAndRelativeUrl = (protocolHostAndPort: string, path: string) => {
    const pathToAppend = path.startsWith("/") ? path.substr(1) : path;
    return protocolHostAndPort.endsWith("/") ? `${protocolHostAndPort}${pathToAppend}` : `${protocolHostAndPort}${pathToAppend}`;
};

export const remapAssetPath = (url: string, assetPortOverride: number | null) => {
    if (!url) {
        return url;
    }
    const parsedAssetUrl = urlParse(url);
    const parsedAssetUrlPort = parsedAssetUrl.port;
    const portToUse = parsedAssetUrlPort || assetPortOverride;
    const portSuffix = portToUse ? `:${portToUse}` : "";
    const protocolPrefix = parsedAssetUrl.protocol ? `${protocolToScheme(parsedAssetUrl.protocol)}:` : "";
    const apiHostName = getApiHostName();
    const baseUrl = `${protocolPrefix}//${apiHostName}${portSuffix}/`;
    const parsedAssetUrlPathName = parsedAssetUrl.pathname;
    const result = combineBaseAndRelativeUrl(baseUrl, parsedAssetUrlPathName);
    return result;
};

export interface DbConfig {
    database: string;
    username: string;
    password: string;
    host: string;
    port: string;
    useSsl?: boolean;
}

export const parsePostgresUrl = (url: string): DbConfig => {
    if (!url) {
        return null;
    }
    const POSTGRES_PROTOCOL = "postgres://";
    if (!url.startsWith(POSTGRES_PROTOCOL)) {
        return null;
    }
    let rest = url.substr(POSTGRES_PROTOCOL.length);
    let nextToken = ":";
    let idx = rest.indexOf(nextToken);
    const username = rest.substr(0, idx);
    rest = rest.substr(username.length + nextToken.length);
    nextToken = "@";
    idx = rest.indexOf(nextToken);
    const password = rest.substr(0, idx);
    rest = rest.substr(password.length + nextToken.length);
    nextToken = "/";
    idx = rest.indexOf(nextToken);
    const hostAndPort = rest.substr(0, idx);
    const portSepToken = ":";
    const portSepIdx = hostAndPort.indexOf(portSepToken);
    const host = idx < 0 ? hostAndPort : hostAndPort.substr(0, portSepIdx);
    const port = idx < 0 ? "5432" : hostAndPort.substr(portSepIdx + 1);
    const database = rest.substr(hostAndPort.length + nextToken.length);
    return {
        database,
        username,
        password,
        host,
        port
    };
};

export const getDbConfig = (verbose?: boolean): DbConfig => {
    let databaseUrl: string;
    if (process.env.ATOLL_DATABASE_URL) {
        databaseUrl = process.env.ATOLL_DATABASE_URL;
        if (verbose) {
            console.log("Using ATOLL_DATABASE_URL for database connection string");
        }
    } else if (process.env.DATABASE_URL) {
        if (verbose) {
            console.log("Using DATABASE_URL for database connection string");
        }
        databaseUrl = process.env.DATABASE_URL;
    }
    if (verbose) {
        const dbUrlToShow = databaseUrl || "(default)";
        console.log(`  Database connection string: ${dbUrlToShow}`);
    }
    const dbConfigFromUrl = parsePostgresUrl(process.env.ATOLL_DATABASE_URL || process.env.DATABASE_URL);
    const useSsl = process.env.ATOLL_DATABASE_USE_SSL ? process.env.ATOLL_DATABASE_USE_SSL === "true" : true;
    if (verbose) {
        if (useSsl) {
            console.log("  Using SSL");
        } else {
            console.log("  Not using SSL (ATOLL_DATABASE_USE_SSL override)");
        }
    }
    return {
        ...dbConfigFromUrl,
        useSsl
    };
};

export const getAuthKey = (): string | null => {
    return process.env.ATOLL_AUTH_KEY ?? null;
};

export const getAuthTokenExpirationSeconds = () => {
    const expirationEnvVal = process.env.ATOLL_AUTH_EXPIRATION_SECONDS;
    if (expirationEnvVal) {
        return parseInt(expirationEnvVal);
    }
    return 5 * 60; // 5 minutes
};
