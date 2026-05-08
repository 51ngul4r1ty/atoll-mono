// externals
import React, { forwardRef, RefObject, Ref, useState, useEffect } from "react";

// style
import css from "./DropDownList.module.css";

// utils
import { buildClassName } from "../../../utils/classNameBuilder";
import { usePrevious } from "../../common/usePreviousHook";

// components
import { SelectionField } from "../anchors/SelectionField";
import { ListPanel, ListPanelItem } from "../../atoms/panels/ListPanel";

// interfaces/types
import { ComponentWithForwardedRef } from "../../../types/reactHelperTypes";

export type DropDownListRefType = HTMLDivElement;

export type DropDownListType = ComponentWithForwardedRef<DropDownListProps>;

export interface DropDownListItem {
    id: string;
    value: string;
}

export interface DropDownListStateProps {
    className?: string;
    disabled?: boolean;
    labelText: string;
    listItems: DropDownListItem[];
    opened?: boolean;
    selectedId?: string | null;
    selectedValue?: string | null;
}

export interface DropDownListDispatchProps {
    onItemSelect?: { (itemId: string): void };
    onOpenedChange?: { (opened: boolean): void };
}

export type DropDownListProps = DropDownListStateProps & DropDownListDispatchProps;

// NOTE: Keep this private so that it isn't referenced outside this component
interface DropDownListInnerStateProps {
    innerRef: RefObject<DropDownListRefType>;
}

export const InnerDropDownList: React.FC<DropDownListProps & DropDownListInnerStateProps> = (props) => {
    const [opened, setOpened] = useState(props.opened ?? false);

    const prevProps = usePrevious({ opened: props.opened });
    useEffect(() => {
        if (prevProps?.opened !== props.opened) {
            if (opened !== props.opened) {
                setOpened(props.opened ?? false);
            }
        }
    }, [props.opened, opened]);

    const handleTriggerClick = () => {
        if (props.disabled) {
            return;
        }
        const newOpened = !opened;
        setOpened(newOpened);
        if (props.onOpenedChange) {
            props.onOpenedChange(newOpened);
        }
    };

    const handleItemSelect = (itemId: string) => {
        setOpened(false);
        if (props.onOpenedChange) {
            props.onOpenedChange(false);
        }
        if (props.onItemSelect) {
            props.onItemSelect(itemId);
        }
    };

    const listItems: ListPanelItem[] = props.listItems.map((item) => ({
        id: item.id,
        label: item.value
    }));

    const classToUse = buildClassName(css.container, props.className);

    return (
        <div className={classToUse} ref={props.innerRef}>
            <SelectionField
                disabled={props.disabled}
                labelText={props.labelText}
                opened={opened}
                selectedText={props.selectedValue ?? null}
                onTriggerClick={handleTriggerClick}
            />
            {opened && (
                <div className={css.listContainer}>
                    <ListPanel
                        items={listItems}
                        labelText=""
                        selectedItemId={props.selectedId ?? null}
                        disabled={props.disabled}
                        onItemSelect={handleItemSelect}
                    />
                </div>
            )}
        </div>
    );
};

export const DropDownList: DropDownListType = forwardRef((props: DropDownListProps, ref: Ref<DropDownListRefType>) => (
    <InnerDropDownList innerRef={ref as RefObject<DropDownListRefType>} {...props} />
));
