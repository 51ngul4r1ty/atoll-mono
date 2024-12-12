/**
 * Purpose: Handle messages from client SDK that need to be shown to the user of the VS Code extension.
 */

// utils
import { logDebug, logError, logInfo, logWarning, MessageStyle } from "./logger";

export const handleNotification = async (message: string, level: string) => {
    switch (level) {
        case "debug": {
            logDebug(message, MessageStyle.outputChannel);
            break;
        }
        case "info": {
            logInfo(message, MessageStyle.outputChannelAndMessage);
            break;
        }
        case "warn": {
            logWarning(message, MessageStyle.outputChannelAndMessage);
            break;
        }
        case "error": {
            logError(message, MessageStyle.outputChannelAndMessage);
            break;
        }
        default: {
            throw new Error(`Unexpected level "${level}" with message "${message}"`);
        }
    }
};
