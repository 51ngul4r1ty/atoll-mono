module.exports = (env = "production") => {
    if (process.env.SUPPRESS_CONSOLE_LOGGING !== "true") {
        console.log(`Building for environment "${env}"`);
    }
    if (env === "development" || env === "dev") {
        console.log('setting NODE_ENV to "development"');
        process.env.NODE_ENV = "development";
        return [require("./client.dev"), require("./server.dev")];
    }
    console.log('setting NODE_ENV to "production"');
    process.env.NODE_ENV = "production";
    return [require("./client.prod"), require("./server.prod")];
};
