// externals
import * as React from "react";

// style
import css from "./NoContentMessage.module.css";

/* exported interfaces/types */

export type NoContentMessageStateProps = React.PropsWithChildren<Record<never, any>>;

export type NoContentMessageDispatchProps = {};

export type NoContentMessageProps = NoContentMessageStateProps & NoContentMessageDispatchProps;

/* exported components */

export const NoContentMessage: React.FC<NoContentMessageProps> = (props) => {
    return <div className={css.noContentMsg}>{props.children}</div>;
};
