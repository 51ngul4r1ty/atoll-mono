// externals
import React, { forwardRef, RefObject, Ref, useState, useEffect } from "react";

// style
import css from "./ListPanel.module.css";

// utils
import { buildClassName } from "../../../utils/classNameBuilder";
import { usePrevious } from "../../common/usePreviousHook";

// interfaces/types
import { ComponentWithForwardedRef } from "../../../types/reactHelperTypes";

export type ListPanelRefType = HTMLDivElement;

export type ListPanelType = ComponentWithForwardedRef<ListPanelProps>;

export interface ListPanelItem {
    id: string;
    label: string;
}

export interface ListPanelStateProps {
    className?: string;
    disabled?: boolean;
    items: ListPanelItem[];
    labelText: string;
    selectedItemId?: string | null;
}

export interface ListPanelDispatchProps {
    onItemSelect?: { (itemId: string, itemLabel: string): void };
}

export type ListPanelProps = ListPanelStateProps & ListPanelDispatchProps;

// NOTE: Keep this private so that it isn't referenced outside this component
interface ListPanelInnerStateProps {
    innerRef: RefObject<ListPanelRefType>;
}

export const InnerListPanel: React.FC<ListPanelProps & ListPanelInnerStateProps> = (props) => {
    const [selectedItemId, setSelectedItemId] = useState(props.selectedItemId ?? null);

    const prevProps = usePrevious({ selectedItemId: props.selectedItemId });
    useEffect(() => {
        if (prevProps?.selectedItemId !== props.selectedItemId) {
            if (selectedItemId !== props.selectedItemId) {
                setSelectedItemId(props.selectedItemId ?? null);
            }
        }
    }, [props.selectedItemId, selectedItemId]);

    const handleItemClick = (itemId: string, itemLabel: string) => {
        if (props.disabled) {
            return;
        }
        setSelectedItemId(itemId);
        if (props.onItemSelect) {
            props.onItemSelect(itemId, itemLabel);
        }
    };

    const classToUse = buildClassName(css.panel, props.className, props.disabled ? css.disabled : null);

    return (
        <div className={classToUse} ref={props.innerRef}>
            <label>{props.labelText}</label>
            <ul className={css.list}>
                {props.items.map((item) => (
                    <li
                        key={item.id}
                        className={buildClassName(css.item, item.id === selectedItemId ? css.selected : null)}
                        onClick={() => {
                            handleItemClick(item.id, item.label);
                        }}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const ListPanel: ListPanelType = forwardRef((props: ListPanelProps, ref: Ref<ListPanelRefType>) => (
    <InnerListPanel innerRef={ref as RefObject<ListPanelRefType>} {...props} />
));
