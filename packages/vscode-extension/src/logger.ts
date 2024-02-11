// externals
import * as vscode from "vscode";

const atollOutputChannel = vscode.window.createOutputChannel("Atoll");

export enum MessageStyle {
    outputChannel = 1, // shows as "console log" style message only
    messageOnly = 2, // shows as "toast" style notification only
    outputChannelAndMessage = 3 // console log & toast
}

function log(message: string) {
    atollOutputChannel.appendLine(message);
}

function logCommon(level: string, message: string, messageStyle: MessageStyle) {
    if (messageStyle === MessageStyle.outputChannel || messageStyle === MessageStyle.outputChannelAndMessage) {
        log(`${level.toUpperCase()} - ${message}`);
    }
    if (messageStyle === MessageStyle.messageOnly || messageStyle === MessageStyle.outputChannelAndMessage) {
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

export function logDebug(message: string, messageStyle: MessageStyle = MessageStyle.outputChannel) {
    logCommon("debug", message, messageStyle);
}

export function logInfo(message: string, messageStyle: MessageStyle = MessageStyle.outputChannel) {
    logCommon("info", message, messageStyle);
}

export function logWarning(message: string, messageStyle: MessageStyle = MessageStyle.outputChannel) {
    logCommon("warning", message, messageStyle);
}

export function logError(message: string, messageStyle: MessageStyle = MessageStyle.outputChannel) {
    logCommon("error", message, messageStyle);
}
