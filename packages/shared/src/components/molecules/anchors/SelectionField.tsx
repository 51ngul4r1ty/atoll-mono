// externals
import React, { forwardRef, RefObject, Ref } from "react";

// style
import css from "./SelectionField.module.css";

// utils
import { buildClassName } from "../../../utils/classNameBuilder";

// components
import { VerticalCollapseIcon } from "../../atoms/icons/VerticalCollapseIcon";
import { VerticalExpandIcon } from "../../atoms/icons/VerticalExpandIcon";

// interfaces/types
import { ComponentWithForwardedRef } from "../../../types/reactHelperTypes";

export type SelectionFieldRefType = HTMLDivElement;

export type SelectionFieldType = ComponentWithForwardedRef<SelectionFieldProps>;

export interface SelectionFieldStateProps {
    className?: string;
    disabled?: boolean;
    labelText: string;
    opened?: boolean;
    selectedText?: string | null;
}

export interface SelectionFieldDispatchProps {
    onTriggerClick?: { (): void };
}

export type SelectionFieldProps = SelectionFieldStateProps & SelectionFieldDispatchProps;

// NOTE: Keep this private so that it isn't referenced outside this component
interface SelectionFieldInnerStateProps {
    innerRef: RefObject<SelectionFieldRefType>;
}

export const InnerSelectionField: React.FC<SelectionFieldProps & SelectionFieldInnerStateProps> = (props) => {
    const { opened = false } = props;

    const handleTriggerClick = () => {
        if (props.disabled) {
            return;
        }
        if (props.onTriggerClick) {
            props.onTriggerClick();
        }
    };

    const classToUse = buildClassName(css.field, props.className, props.disabled ? css.disabled : null);

    return (
        <div className={classToUse} ref={props.innerRef}>
            <label>{props.labelText}</label>
            <div className={css.valueRow}>
                <span className={css.valueText}>{props.selectedText ?? ""}</span>
                <button
                    type="button"
                    className={css.trigger}
                    disabled={props.disabled}
                    onClick={handleTriggerClick}
                    aria-label={opened ? "Collapse" : "Expand"}
                >
                    {opened ? <VerticalCollapseIcon /> : <VerticalExpandIcon />}
                </button>
            </div>
        </div>
    );
};

export const SelectionField: SelectionFieldType = forwardRef((props: SelectionFieldProps, ref: Ref<SelectionFieldRefType>) => (
    <InnerSelectionField innerRef={ref as RefObject<SelectionFieldRefType>} {...props} />
));
