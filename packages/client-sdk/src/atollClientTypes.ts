export type HostNotificationMessageLevel = "info" | "warn" | "error" | "debug";

export type HostNotificationHandler = (message: string, level: HostNotificationMessageLevel) => Promise<void>;
