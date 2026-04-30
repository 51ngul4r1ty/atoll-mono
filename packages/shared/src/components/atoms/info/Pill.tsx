// externals
import * as React from "react";

// style
import css from "./Pill.module.css";
import { buildClassName } from "../../../utils/classNameBuilder";

/* exported interfaces/types */

export type PillStateProps = React.PropsWithChildren<{ className?: string }>;

export type PillDispatchProps = {};

export type PillProps = PillStateProps & PillDispatchProps;

/* exported components */

export const Pill: React.FC<PillProps> = (props) => {
    if (typeof props.children !== "string" && typeof props.children !== "number") {
        return <div className={css.invalidPillContent}>(invalid)</div>;
    }

    return <div className={buildClassName(css.pill, props.className)}>{props.children}</div>;
};
