// externals
import * as vscode from "vscode";

const outputChannel = vscode.window.createOutputChannel("Atoll");

export enum MessageStyle {
    OutputChannel = 1, // shows as "console log" style message only
    MessageOnly = 2, // shows as "toast" style notification only
    OutputChannelAndMessage = 3 // console log & toast
}

function log(message: string) {
    outputChannel.appendLine(message);
}

function logCommon(level: string, message: string, messageStyle: MessageStyle) {
    if (messageStyle === MessageStyle.OutputChannel || messageStyle === MessageStyle.OutputChannelAndMessage) {
        log(`${level.toUpperCase()} - ${message}`);
    }
    if (messageStyle === MessageStyle.MessageOnly || messageStyle === MessageStyle.OutputChannelAndMessage) {
        switch (level) {
            case "info": {
                vscode.window.showInformationMessage(message);
                break;
            }
            case "warning": {
                vscode.window.showWarningMessage(message);
                break;
            }
            case "error": {
                vscode.window.showErrorMessage(message);
                break;
            }
            case "debug": {
                vscode.window.showInformationMessage(`${message} (debug)`);
                break;
            }
        }
    }
}

export function logDebug(message: string, messageStyle: MessageStyle = MessageStyle.OutputChannel) {
    logCommon("debug", message, messageStyle);
}

export function logInfo(message: string, messageStyle: MessageStyle = MessageStyle.OutputChannel) {
    logCommon("info", message, messageStyle);
}

export function logWarning(message: string, messageStyle: MessageStyle = MessageStyle.OutputChannel) {
    logCommon("warning", message, messageStyle);
}

export function logError(message: string, messageStyle: MessageStyle = MessageStyle.OutputChannel) {
    logCommon("error", message, messageStyle);
}
